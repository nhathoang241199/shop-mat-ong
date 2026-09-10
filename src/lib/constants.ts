export const CATEGORIES = ["Tất cả", "Mật ong", "Sản phẩm ong", "Nông sản"] as const;

export const FREE_SHIPPING_THRESHOLD = 500_000;
export const SHIPPING_FEE = 35_000;

/** Contact links — ưu tiên env, fallback giá trị mẫu. */
export const CONTACT = {
  hotlineDisplay: "0327 739 763",
  hotlineDigits: "0327739763",
  email: "Phuonganh763pt@gmail.com",
  /** Facebook Page username/ID — dùng khi chưa set NEXT_PUBLIC_MESSENGER_URL */
  messenger: "matongphanthiet",
  zalo: "0327739763",
} as const;

/** Link m.me hoặc Facebook Messages — giống pattern thuê máy ảnh Long Khánh. */
export function messengerUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_MESSENGER_URL?.trim();
  if (fromEnv) return fromEnv;
  return `https://m.me/${CONTACT.messenger}`;
}

export function zaloUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_ZALO_URL?.trim();
  if (fromEnv) return fromEnv;
  return `https://zalo.me/${CONTACT.zalo}`;
}

export function formatVnd(n: number) {
  return new Intl.NumberFormat("vi-VN").format(n) + "₫";
}

export function calcShipping(subtotal: number) {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
}

export function generateOrderCode() {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:TZ.]/g, "")
    .slice(0, 14);
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SMO-${stamp.slice(0, 8)}-${rand}`;
}

export function generatePaymentRef() {
  const day = new Date().toISOString().slice(0, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SMO-${day}-${rand}`;
}

export const ORDER_STATUSES = [
  "pending",
  "paid",
  "confirmed",
  "shipping",
  "delivered",
  "cancelled",
] as const;

export type OrderStatus = (typeof ORDER_STATUSES)[number];

export const STATUS_LABELS: Record<OrderStatus, string> = {
  pending: "Chờ xác nhận",
  paid: "Đã thanh toán",
  confirmed: "Đã xác nhận",
  shipping: "Đang giao",
  delivered: "Đã giao",
  cancelled: "Đã huỷ",
};
