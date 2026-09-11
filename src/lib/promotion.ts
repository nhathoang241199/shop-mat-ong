export const OCTOBER_PROMOTION = {
  name: "Khuyến mãi tháng 10",
  discountPercent: 15,
  start: "2026-10-01T00:00:00+07:00",
  end: "2026-10-31T23:59:59+07:00",
} as const;

export type Promotion = Pick<typeof OCTOBER_PROMOTION, "name" | "discountPercent">;

export function getPromotion(now = new Date()): Promotion | null {
  const start = new Date(OCTOBER_PROMOTION.start).getTime();
  const end = new Date(OCTOBER_PROMOTION.end).getTime();
  const time = now.getTime();
  return time >= start && time <= end
    ? { name: OCTOBER_PROMOTION.name, discountPercent: OCTOBER_PROMOTION.discountPercent }
    : null;
}

export function discountedPrice(price: number, discountPercent: number): number {
  return Math.round(price * (100 - discountPercent) / 100);
}

export function effectivePrice(price: number, now = new Date()): number {
  const promotion = getPromotion(now);
  return promotion ? discountedPrice(price, promotion.discountPercent) : price;
}
