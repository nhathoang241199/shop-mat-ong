"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function SuccessContent() {
  const params = useSearchParams();
  const code = params.get("code");

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 text-center"
      style={{ background: "#fdf8f0" }}
    >
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-8"
        style={{ background: "#fff3d6", border: "2px solid #c47c1a" }}
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#c47c1a" strokeWidth="2.5">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <p className="text-xs tracking-[0.2em] uppercase mb-3 font-semibold" style={{ color: "#c47c1a" }}>
        Đặt hàng thành công
      </p>
      <h2
        style={{
          fontFamily: "Fraunces, serif",
          fontSize: "clamp(1.8rem, 5vw, 2.8rem)",
          fontWeight: 300,
          color: "#2c1f0e",
          lineHeight: 1.15,
        }}
      >
        Cảm ơn bạn
        <br />
        đã tin tưởng
        <br />
        <em>Mật Ong Phan Thiết!</em>
      </h2>
      {code ? (
        <p className="mt-4 text-sm font-mono font-semibold" style={{ color: "#7a5c38" }}>
          Mã đơn: {code}
        </p>
      ) : null}
      <p className="mt-5 max-w-xs text-sm leading-relaxed" style={{ color: "#9a7d5a" }}>
        Chúng tôi sẽ đóng gói và gửi hàng trong vòng 24 giờ. Bạn sẽ nhận được SMS xác nhận đơn hàng.
      </p>
      <Link
        href="/"
        className="mt-10 px-8 py-3 text-sm font-semibold tracking-wider transition-opacity hover:opacity-80"
        style={{ background: "#c47c1a", color: "#fff", borderRadius: 6 }}
      >
        Tiếp tục mua sắm
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center" style={{ background: "#fdf8f0" }}>
          Đang tải...
        </div>
      }
    >
      <SuccessContent />
    </Suspense>
  );
}
