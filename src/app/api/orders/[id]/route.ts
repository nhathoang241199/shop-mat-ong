import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { buildSepayQrUrl, buildTransferContent, getSepayConfig } from "@/lib/sepay";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const order = await prisma.order.findUnique({
    where: { id },
    include: { items: true },
  });
  if (!order) {
    return NextResponse.json({ error: "Không tìm thấy đơn" }, { status: 404 });
  }

  let qrUrl: string | null = null;
  let transferContent: string | null = null;
  let bank: ReturnType<typeof getSepayConfig> | null = null;
  if (order.payment === "sepay" && order.paymentRef && order.status === "pending") {
    try {
      bank = getSepayConfig();
      transferContent = buildTransferContent(order.paymentRef);
      qrUrl = buildSepayQrUrl(order.total, order.paymentRef);
    } catch {
      /* config missing */
    }
  }

  return NextResponse.json({
    id: order.id,
    code: order.code,
    status: order.status,
    payment: order.payment,
    total: order.total,
    paymentRef: order.paymentRef,
    qrUrl,
    transferContent,
    bank,
    items: order.items,
  });
}
