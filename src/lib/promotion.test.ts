import assert from "node:assert/strict";
import test from "node:test";
import { getPromotion, discountedPrice } from "./promotion";

test("15% promotion is active throughout October 2026", () => {
  assert.deepEqual(getPromotion(new Date("2026-10-01T00:00:00+07:00")), {
    name: "Khuyến mãi tháng 10",
    discountPercent: 15,
  });
  assert.deepEqual(getPromotion(new Date("2026-10-31T23:59:59+07:00")), {
    name: "Khuyến mãi tháng 10",
    discountPercent: 15,
  });
});

test("promotion is inactive outside October 2026", () => {
  assert.equal(getPromotion(new Date("2026-09-30T23:59:59+07:00")), null);
  assert.equal(getPromotion(new Date("2026-11-01T00:00:00+07:00")), null);
});

test("discounted price rounds to whole VND", () => {
  assert.equal(discountedPrice(100_000, 15), 85_000);
  assert.equal(discountedPrice(99_999, 15), 84_999);
});
