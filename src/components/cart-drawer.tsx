"use client";

import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart-context";
import { formatVnd, FREE_SHIPPING_THRESHOLD } from "@/lib/constants";

export function CartDrawer() {
  const router = useRouter();
  const { cart, cartOpen, setCartOpen, updateQty, removeItem, totalItems, subtotal, shipping, total } =
    useCart();

  if (!cartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div
        className="absolute inset-0"
        style={{ background: "rgba(44,31,14,0.45)" }}
        onClick={() => setCartOpen(false)}
      />
      <aside className="relative w-full max-w-sm flex flex-col shadow-2xl" style={{ background: "#fdf8f0" }}>
        <div
          className="flex items-center justify-between px-5 py-4 border-b"
          style={{ borderColor: "#e8d9c0", background: "#fff" }}
        >
          <span style={{ fontFamily: "Fraunces, serif", fontSize: "1.05rem", fontWeight: 400, color: "#2c1f0e" }}>
            Giỏ hàng {totalItems > 0 ? <span style={{ color: "#c47c1a" }}>({totalItems})</span> : null}
          </span>
          <button
            type="button"
            onClick={() => setCartOpen(false)}
            className="transition-opacity hover:opacity-50"
            style={{ color: "#9a7d5a" }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-48 text-center gap-3">
              <p className="text-sm" style={{ color: "#9a7d5a" }}>
                Giỏ hàng đang trống
              </p>
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="text-xs font-semibold underline"
                style={{ color: "#c47c1a" }}
              >
                Chọn sản phẩm ngay
              </button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex gap-3 py-2">
                <div
                  className="w-16 shrink-0 rounded-lg overflow-hidden"
                  style={{ background: "#f5ede0", aspectRatio: "4/5" }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold leading-snug" style={{ color: "#2c1f0e" }}>
                      {item.name}
                    </p>
                    <button
                      type="button"
                      onClick={() => removeItem(item.id)}
                      className="shrink-0 transition-opacity hover:opacity-50"
                      style={{ color: "#c8b89a" }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-xs mt-0.5" style={{ color: "#9a7d5a" }}>
                    {item.unit}
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, -1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{ border: "1.5px solid #e8d9c0", color: "#7a5c38" }}
                      >
                        −
                      </button>
                      <span className="text-sm font-semibold w-5 text-center" style={{ color: "#2c1f0e" }}>
                        {item.qty}
                      </span>
                      <button
                        type="button"
                        onClick={() => updateQty(item.id, 1)}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold"
                        style={{ border: "1.5px solid #e8d9c0", color: "#7a5c38" }}
                      >
                        +
                      </button>
                    </div>
                    <span className="text-sm font-bold" style={{ color: "#c47c1a" }}>
                      {formatVnd(item.price * item.qty)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 ? (
          <div className="border-t px-5 py-5 space-y-3" style={{ borderColor: "#e8d9c0", background: "#fff" }}>
            <div className="flex justify-between text-sm" style={{ color: "#9a7d5a" }}>
              <span>Tạm tính</span>
              <span>{formatVnd(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm" style={{ color: "#9a7d5a" }}>
              <span>Vận chuyển</span>
              <span>
                {shipping === 0 ? (
                  <span style={{ color: "#c47c1a", fontWeight: 700 }}>Miễn phí</span>
                ) : (
                  formatVnd(shipping)
                )}
              </span>
            </div>
            {shipping > 0 ? (
              <p className="text-xs px-3 py-2 rounded-lg" style={{ background: "#fff8ed", color: "#7a5c38" }}>
                Mua thêm {formatVnd(FREE_SHIPPING_THRESHOLD - subtotal)} để được miễn phí vận chuyển
              </p>
            ) : null}
            <div
              className="flex justify-between font-bold pt-2 border-t"
              style={{ borderColor: "#f0e8d8", color: "#2c1f0e" }}
            >
              <span>Tổng cộng</span>
              <span style={{ color: "#c47c1a", fontSize: "1.05rem" }}>{formatVnd(total)}</span>
            </div>
            <button
              type="button"
              onClick={() => {
                setCartOpen(false);
                router.push("/checkout");
              }}
              className="w-full py-3.5 text-sm font-bold tracking-wider transition-opacity hover:opacity-85"
              style={{ background: "#c47c1a", color: "#fff", borderRadius: 6 }}
            >
              Thanh toán ngay →
            </button>
            <button
              type="button"
              onClick={() => setCartOpen(false)}
              className="w-full py-2 text-xs font-semibold tracking-wider"
              style={{ color: "#9a7d5a" }}
            >
              Tiếp tục mua sắm
            </button>
          </div>
        ) : null}
      </aside>
    </div>
  );
}
