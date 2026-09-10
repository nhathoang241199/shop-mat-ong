"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/logo";
import { useCart } from "@/components/cart-context";
import { formatVnd } from "@/lib/constants";

function Section({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <section>
      <p className="text-xs font-semibold tracking-[0.18em] uppercase mb-4" style={{ color: "#c47c1a" }}>
        {label}
      </p>
      {children}
    </section>
  );
}

function Field({
  label,
  children,
  span2,
}: {
  label: string;
  children: React.ReactNode;
  span2?: boolean;
}) {
  return (
    <div className={span2 ? "sm:col-span-2" : ""}>
      <label className="block text-xs font-semibold mb-1.5" style={{ color: "#9a7d5a" }}>
        {label}
      </label>
      {children}
    </div>
  );
}

export function CheckoutPage() {
  const router = useRouter();
  const { cart, totalItems, subtotal, shipping, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "cod" as "cod" | "sepay",
  });

  if (cart.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6" style={{ background: "#fdf8f0" }}>
        <p className="text-sm mb-4" style={{ color: "#9a7d5a" }}>
          Giỏ hàng trống
        </p>
        <Link href="/" className="text-sm font-semibold" style={{ color: "#c47c1a" }}>
          Quay lại cửa hàng
        </Link>
      </div>
    );
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerName: form.name,
          phone: form.phone,
          address: form.address,
          payment: form.payment,
          items: cart.map((item) => ({ productId: item.id, qty: item.qty })),
        }),
      });
      const json = (await res.json()) as { error?: string; id?: string; code?: string; payment?: string };
      if (!res.ok || !json.id) throw new Error(json.error || "Không tạo được đơn hàng");
      clearCart();
      if (json.payment === "sepay") {
        router.push(`/pay/${json.id}`);
      } else {
        router.push(`/success?code=${encodeURIComponent(json.code || json.id)}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Lỗi đặt hàng");
    } finally {
      setLoading(false);
    }
  }

  const inputStyle = {
    background: "#fff",
    border: "1.5px solid #e8d9c0",
    borderRadius: 6,
    color: "#2c1f0e",
  } as const;

  return (
    <div className="min-h-screen" style={{ background: "#fdf8f0" }}>
      <header
        className="border-b px-6 py-4 flex items-center justify-between"
        style={{ background: "#fff", borderColor: "#e8d9c0" }}
      >
        <Link
          href="/"
          className="flex items-center gap-2 text-xs font-semibold tracking-wider uppercase"
          style={{ color: "#9a7d5a" }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 5l-7 7 7 7" />
          </svg>
          Quay lại
        </Link>
        <Logo />
        <div style={{ width: 80 }} />
      </header>

      <div className="max-w-5xl mx-auto px-4 py-10 grid gap-8 lg:grid-cols-[1fr_360px]">
        <form onSubmit={handleSubmit} className="space-y-8">
          <Section label="Thông tin giao hàng">
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label="Họ và tên">
                <input
                  required
                  placeholder="Nguyễn Thị Lan"
                  value={form.name}
                  onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={inputStyle}
                />
              </Field>
              <Field label="Số điện thoại">
                <input
                  required
                  type="tel"
                  placeholder="0327 739 763"
                  value={form.phone}
                  onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={inputStyle}
                />
              </Field>
              <Field label="Địa chỉ nhận hàng" span2>
                <input
                  required
                  placeholder="Số nhà, tên đường, phường/xã, quận/huyện, tỉnh/thành"
                  value={form.address}
                  onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                  className="w-full px-4 py-3 text-sm outline-none"
                  style={inputStyle}
                />
              </Field>
            </div>
          </Section>

          <Section label="Phương thức thanh toán">
            <div className="space-y-2">
              {[
                { value: "cod" as const, label: "Thanh toán khi nhận hàng (COD)" },
                { value: "sepay" as const, label: "Chuyển khoản online (SePay QR)" },
              ].map(({ value, label }) => (
                <label
                  key={value}
                  className="flex items-center gap-3 px-4 py-3.5 cursor-pointer"
                  style={{
                    background: form.payment === value ? "#fff8ed" : "#fff",
                    border: `1.5px solid ${form.payment === value ? "#c47c1a" : "#e8d9c0"}`,
                    borderRadius: 6,
                  }}
                >
                  <input
                    type="radio"
                    name="payment"
                    value={value}
                    checked={form.payment === value}
                    onChange={() => setForm((f) => ({ ...f, payment: value }))}
                    className="accent-amber-600"
                  />
                  <span className="text-sm font-medium" style={{ color: "#2c1f0e" }}>
                    {label}
                  </span>
                </label>
              ))}
            </div>
          </Section>

          {error ? (
            <p className="text-sm" style={{ color: "#dc2626" }}>
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 text-sm font-semibold tracking-wider transition-opacity hover:opacity-85 disabled:opacity-60"
            style={{ background: "#c47c1a", color: "#fff", borderRadius: 6 }}
          >
            {loading ? "Đang xử lý..." : `Đặt hàng ngay — ${formatVnd(total)}`}
          </button>
        </form>

        <aside className="space-y-4">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#9a7d5a" }}>
            Đơn hàng ({totalItems} sản phẩm)
          </p>
          <div className="rounded-xl p-4 space-y-3" style={{ background: "#fff", border: "1px solid #e8d9c0" }}>
            {cart.map((item) => (
              <div key={item.id} className="flex gap-3 items-center">
                <div className="w-14 h-16 shrink-0 rounded-lg overflow-hidden" style={{ background: "#f5ede0" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold leading-tight truncate" style={{ color: "#2c1f0e" }}>
                    {item.name}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "#9a7d5a" }}>
                    {item.unit} × {item.qty}
                  </p>
                </div>
                <span className="text-sm font-bold shrink-0" style={{ color: "#c47c1a" }}>
                  {formatVnd(item.price * item.qty)}
                </span>
              </div>
            ))}
            <div className="border-t pt-3 space-y-1.5 mt-2" style={{ borderColor: "#f0e8d8" }}>
              <div className="flex justify-between text-sm" style={{ color: "#9a7d5a" }}>
                <span>Tạm tính</span>
                <span>{formatVnd(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm" style={{ color: "#9a7d5a" }}>
                <span>Vận chuyển</span>
                <span>
                  {shipping === 0 ? (
                    <span style={{ color: "#c47c1a", fontWeight: 600 }}>Miễn phí</span>
                  ) : (
                    formatVnd(shipping)
                  )}
                </span>
              </div>
              <div
                className="flex justify-between font-bold pt-1.5 border-t text-sm"
                style={{ borderColor: "#f0e8d8", color: "#2c1f0e" }}
              >
                <span>Tổng cộng</span>
                <span style={{ color: "#c47c1a", fontSize: "1rem" }}>{formatVnd(total)}</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
