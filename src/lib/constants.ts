export const CATEGORIES = ["Tất cả", "Mật ong", "Sản phẩm ong", "Nông sản"] as const;

export const FREE_SHIPPING_THRESHOLD = 500_000;
export const SHIPPING_FEE = 35_000;

/** Contact links — cập nhật ID/SĐT thật khi có. */
export const CONTACT = {
  hotlineDisplay: "0901 234 567",
  hotlineDigits: "0901234567",
  email: "matongphanthiet@gmail.com",
  /** Facebook Page username hoặc ID cho m.me */
  messenger: "matongphanthiet",
  zalo: "0901234567",
} as const;

export function messengerUrl() {
  return `https://m.me/${CONTACT.messenger}`;
}

export function zaloUrl() {
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
