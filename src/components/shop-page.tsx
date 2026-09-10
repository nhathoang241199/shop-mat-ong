"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { ProductCard } from "@/components/product-card";
import { CartDrawer } from "@/components/cart-drawer";
import { ContactFloatButtons } from "@/components/contact-float-buttons";
import { useCart, type CartProduct } from "@/components/cart-context";
import { CATEGORIES, CONTACT } from "@/lib/constants";

export function ShopPage({ products }: { products: CartProduct[] }) {
  const { cart, addToCart, totalItems, setCartOpen } = useCart();
  const [activeCategory, setActiveCategory] = useState("Tất cả");

  const filtered = useMemo(
    () =>
      activeCategory === "Tất cả"
        ? products
        : products.filter((p) => p.category === activeCategory),
    [activeCategory, products],
  );

  return (
    <div className="min-h-screen" style={{ background: "#fdf8f0" }}>
      <header
        className="sticky top-0 z-40 border-b"
        style={{
          background: "rgba(253,248,240,0.95)",
          backdropFilter: "blur(12px)",
          borderColor: "#e8d9c0",
        }}
      >
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <Logo />
          <nav className="hidden sm:flex gap-5 items-center">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setActiveCategory(c)}
                className="text-xs font-semibold tracking-wider uppercase transition-colors"
                style={{ color: activeCategory === c ? "#c47c1a" : "#9a7d5a" }}
              >
                {c}
              </button>
            ))}
            <Link
              href="/blog"
              className="text-xs font-semibold tracking-wider uppercase transition-colors"
              style={{ color: "#9a7d5a" }}
            >
              Blog
            </Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/blog"
              className="sm:hidden text-xs font-semibold tracking-wider uppercase"
              style={{ color: "#9a7d5a" }}
            >
              Blog
            </Link>
            <button
              type="button"
              onClick={() => setCartOpen(true)}
              className="relative transition-opacity hover:opacity-70"
              style={{ color: "#2c1f0e" }}
              aria-label="Mở giỏ hàng"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {totalItems > 0 ? (
                <span
                  className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                  style={{ background: "#c47c1a", color: "#fff" }}
                >
                  {totalItems}
                </span>
              ) : null}
            </button>
          </div>
        </div>
      </header>

      <section className="relative overflow-hidden" style={{ height: "clamp(240px, 35vw, 420px)" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.unsplash.com/photo-1758522965216-7e283754e784?w=1400&h=500&fit=crop&auto=format"
          alt="Vùng nuôi ong Phan Thiết, Bình Thuận"
          className="w-full h-full object-cover"
        />
        <div
          className="absolute inset-0 flex flex-col items-start justify-end p-8 sm:p-14"
          style={{
            background:
              "linear-gradient(to top, rgba(44,31,14,0.75) 0%, rgba(44,31,14,0.1) 60%, transparent 100%)",
          }}
        >
          <p className="text-xs font-semibold tracking-[0.22em] uppercase mb-3" style={{ color: "#fde5b0" }}>
            100% tự nhiên — Không chất bảo quản
          </p>
          <h1
            style={{
              fontFamily: "Fraunces, serif",
              fontSize: "clamp(1.8rem, 5vw, 3.5rem)",
              fontWeight: 300,
              color: "#fdf8f0",
              lineHeight: 1.1,
              maxWidth: 560,
            }}
          >
            Mật ong Phan Thiết
            <br />
            <em>nguyên chất, đúng vị</em>
            <br />
            thẳng từ tổ ong đến tay bạn
          </h1>
          <button
            type="button"
            onClick={() => document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })}
            className="mt-6 px-7 py-3 text-sm font-semibold transition-opacity hover:opacity-85"
            style={{ background: "#c47c1a", color: "#fff", borderRadius: 6 }}
          >
            Mua ngay
          </button>
        </div>
      </section>

      <div className="border-b" style={{ borderColor: "#e8d9c0", background: "#fff" }}>
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-wrap gap-4 justify-center sm:justify-between">
          {[
            "Hữu cơ, không hóa chất",
            "Miễn ship đơn từ 500.000₫",
            "Cam kết hoàn tiền 100%",
            "Đóng gói kỹ, giao nhanh 1-2 ngày",
          ].map((text) => (
            <div key={text} className="flex items-center gap-2 text-xs font-semibold" style={{ color: "#7a5c38" }}>
              <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "#c47c1a" }} />
              {text}
            </div>
          ))}
        </div>
      </div>

      <div className="sm:hidden flex gap-2 overflow-x-auto px-4 py-3" style={{ borderBottom: "1px solid #e8d9c0" }}>
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActiveCategory(c)}
            className="shrink-0 px-3 py-1.5 text-xs font-semibold tracking-wider uppercase"
            style={{
              background: activeCategory === c ? "#c47c1a" : "#fff",
              color: activeCategory === c ? "#fff" : "#9a7d5a",
              border: `1.5px solid ${activeCategory === c ? "#c47c1a" : "#e8d9c0"}`,
              borderRadius: 20,
            }}
          >
            {c}
          </button>
        ))}
      </div>

      <main id="products" className="max-w-6xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-semibold tracking-[0.15em] uppercase" style={{ color: "#9a7d5a" }}>
            {filtered.length} sản phẩm
          </p>
          <p className="text-xs" style={{ color: "#c47c1a" }}>
            Miễn phí vận chuyển đơn từ 500.000₫
          </p>
        </div>
        <div className="grid gap-5" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))" }}>
          {filtered.map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onAdd={() => addToCart(p)}
              inCart={cart.some((i) => i.id === p.id)}
            />
          ))}
        </div>
      </main>

      <section className="border-t border-b my-4" style={{ borderColor: "#e8d9c0", background: "#fff8ed" }}>
        <div className="max-w-6xl mx-auto px-4 py-12 grid sm:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-3" style={{ color: "#c47c1a" }}>
              Câu chuyện của chúng tôi
            </p>
            <h2
              style={{
                fontFamily: "Fraunces, serif",
                fontSize: "clamp(1.4rem, 3vw, 2rem)",
                fontWeight: 300,
                color: "#2c1f0e",
                lineHeight: 1.3,
              }}
            >
              Hơn 15 năm nuôi ong
              <br />
              <em>tại vùng ven biển Phan Thiết</em>
            </h2>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "#7a5c38" }}>
              Gia đình chúng tôi nuôi ong tại Phan Thiết từ năm 2008, khai thác mật từ rừng tràm và vườn thanh
              long đặc trưng của Bình Thuận. Mật ong không pha trộn, không xử lý nhiệt — giữ nguyên enzyme và
              dưỡng chất tự nhiên.
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ aspectRatio: "16/9", background: "#f5ede0" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1758522965377-d61df18c7914?w=700&h=400&fit=crop&auto=format"
              alt="Người nuôi ong tại Phan Thiết"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="border-t" style={{ borderColor: "#e8d9c0" }}>
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="mb-6">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-2" style={{ color: "#c47c1a" }}>
              Tìm chúng tôi
            </p>
            <h2
              style={{
                fontFamily: "Fraunces, serif",
                fontSize: "clamp(1.3rem, 2.5vw, 1.8rem)",
                fontWeight: 300,
                color: "#2c1f0e",
                lineHeight: 1.3,
              }}
            >
              Cửa hàng tại Phan Thiết
            </h2>
            <p className="mt-2 text-sm" style={{ color: "#9a7d5a" }}>
              123 Nguyễn Tất Thành, Phú Trinh, Phan Thiết, Bình Thuận
            </p>
          </div>
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid #e8d9c0", height: 380 }}>
            <iframe
              title="Vị trí cửa hàng Mật Ong Phan Thiết"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31478.36!2d108.1!3d10.93!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174c5b9a00a7745%3A0xa6a8e7e53df67b30!2sPhan%20Thi%E1%BA%BFt%2C%20B%C3%ACnh%20Thu%E1%BA%ADn!5e0!3m2!1svi!2svn!4v1"
            />
          </div>
          <div className="mt-4 grid sm:grid-cols-3 gap-4">
            {[
              { label: "Giờ mở cửa", value: "Thứ 2 – Thứ 7: 7:00 – 19:00\nChủ nhật: 8:00 – 17:00" },
              { label: "Hotline", value: CONTACT.hotlineDisplay },
              { label: "Email", value: CONTACT.email },
            ].map(({ label, value }) => (
              <div key={label} className="px-4 py-3 rounded-xl" style={{ background: "#fff", border: "1px solid #e8d9c0" }}>
                <p className="text-xs font-semibold tracking-wider uppercase mb-1" style={{ color: "#c47c1a" }}>
                  {label}
                </p>
                <p className="text-sm whitespace-pre-line" style={{ color: "#2c1f0e" }}>
                  {value}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t py-8 px-4 text-center" style={{ borderColor: "#e8d9c0" }}>
        <Logo />
        <p className="mt-3 text-xs" style={{ color: "#9a7d5a" }}>
          Mật ong & Nông sản sạch từ Phan Thiết, Bình Thuận · © 2026
        </p>
        <p className="mt-1 text-xs" style={{ color: "#c8b89a" }}>
          Hotline: {CONTACT.hotlineDisplay} · {CONTACT.email}
        </p>
        <div className="flex items-center justify-center gap-4 mt-4">
          <Link href="/blog" className="text-xs font-semibold transition-opacity hover:opacity-70" style={{ color: "#9a7d5a" }}>
            Blog
          </Link>
          <span style={{ color: "#e8d9c0" }}>·</span>
          <Link href="/admin" className="text-xs transition-opacity hover:opacity-60" style={{ color: "#c8b89a" }}>
            Quản trị
          </Link>
        </div>
      </footer>

      <CartDrawer />
      <ContactFloatButtons />
    </div>
  );
}
