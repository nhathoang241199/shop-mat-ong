import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  compactRef,
  extractPaymentRef,
  parseAmount,
  type SepayWebhookPayload,
  verifySepayWebhook,
  webhookTxnId,
} from "@/lib/sepay";

export async function POST(req: Request) {
  const auth = req.headers.get("authorization") ?? req.headers.get("Authorization") ?? "";
  if (!verifySepayWebhook(auth)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = (await req.json()) as SepayWebhookPayload;
  const transferType = String(payload.transferType ?? payload.transfer_type ?? "").toLowerCase();
  if (transferType && transferType !== "in" && transferType !== "credit") {
    return NextResponse.json({ ok: true, skipped: "not_inbound" });
  }

  const amount = parseAmount(payload.transferAmount ?? payload.transfer_amount ?? payload.amount);
  const paymentRef = extractPaymentRef(payload);
  const txnId = webhookTxnId(payload);
  if (!amount || !paymentRef || !txnId) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const existing = await prisma.order.findFirst({ where: { sepayTxnId: txnId } });
  if (existing) return NextResponse.json({ ok: true, duplicate: true });

  const candidates = await prisma.order.findMany({
    where: { payment: "sepay", status: "pending", total: amount },
    orderBy: { createdAt: "desc" },
    take: 20,
  });

  const target =
    candidates.find((o) => o.paymentRef && compactRef(o.paymentRef) === compactRef(paymentRef)) ??
    candidates.find((o) => o.paymentRef && compactRef(paymentRef).includes(compactRef(o.paymentRef)));

  if (!target) {
    return NextResponse.json({ ok: true, unmatched: true });
  }

  await prisma.order.update({
    where: { id: target.id },
    data: {
      status: "paid",
      sepayTxnId: txnId,
      paidAt: new Date(),
    },
  });

  return NextResponse.json({ ok: true, orderId: target.id });
}
