import { timingSafeEqual, createHash } from "crypto";

export type SepayWebhookPayload = {
  id?: string | number;
  transactionId?: string | number;
  transaction_id?: string | number;
  code?: string | null;
  content?: string | null;
  description?: string | null;
  referenceCode?: string | null;
  reference_code?: string | null;
  transferType?: string | null;
  transfer_type?: string | null;
  transferAmount?: string | number | null;
  transfer_amount?: string | number | null;
  amount?: string | number | null;
};

function safeEqual(a: string, b: string) {
  const ah = createHash("sha256").update(a).digest();
  const bh = createHash("sha256").update(b).digest();
  return timingSafeEqual(ah, bh);
}

export function getSepayConfig() {
  const bin = process.env.SEPAY_BANK_BIN?.trim();
  const accountNumber = process.env.SEPAY_BANK_ACCOUNT?.trim();
  const accountName = process.env.SEPAY_ACCOUNT_NAME?.trim() ?? "";
  const bankName = process.env.SEPAY_BANK_NAME?.trim() || "Ngân hàng";
  if (!bin || !accountNumber) throw new Error("Chưa cấu hình tài khoản SePay");
  return { bin, accountNumber, accountName, bankName };
}

export function buildTransferContent(paymentRef: string) {
  const prefix = process.env.SEPAY_TRANSFER_PREFIX?.trim() || "SEVQR";
  return `${prefix} ${paymentRef}`;
}

export function buildSepayQrUrl(amount: number, paymentRef: string) {
  const config = getSepayConfig();
  const params = new URLSearchParams({
    amount: String(amount),
    addInfo: buildTransferContent(paymentRef),
  });
  if (config.accountName) params.set("accountName", config.accountName);
  return `https://img.vietqr.io/image/${config.bin}-${config.accountNumber}-compact2.png?${params.toString()}`;
}

export function verifySepayWebhook(authorization: string) {
  const expected = process.env.SEPAY_WEBHOOK_API_KEY?.trim() ?? "";
  if (!expected) return false;
  const header = authorization.trim();
  return (
    safeEqual(header, expected) ||
    safeEqual(header, `Apikey ${expected}`) ||
    safeEqual(header, `Bearer ${expected}`) ||
    safeEqual(header.replace(/^Apikey\s+/i, "").trim(), expected) ||
    safeEqual(header.replace(/^Bearer\s+/i, "").trim(), expected)
  );
}

export function parseAmount(value: string | number | null | undefined) {
  const amount = typeof value === "number" ? value : Number(String(value ?? "").replace(/,/g, ""));
  return Number.isFinite(amount) ? Math.round(amount) : null;
}

export function compactRef(value: string) {
  return value.replace(/[^A-Z0-9]/gi, "").toUpperCase();
}

const REF_RE = /\bSMO-\d{8}-[A-Z0-9]{4}\b/i;

export function extractPaymentRef(payload: SepayWebhookPayload) {
  const fields = [
    payload.code,
    payload.content,
    payload.description,
    payload.referenceCode,
    payload.reference_code,
  ]
    .map((v) => v?.trim())
    .filter((v): v is string => Boolean(v));

  for (const field of fields) {
    const match = field.match(REF_RE);
    if (match) return match[0].toUpperCase();
  }
  return null;
}

export function webhookTxnId(payload: SepayWebhookPayload) {
  return String(payload.transaction_id ?? payload.transactionId ?? payload.id ?? "");
}
