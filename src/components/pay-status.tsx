"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { formatVnd } from "@/lib/constants";

type PayData = {
  id: string;
  code: string;
  status: string;
  total: number;
  qrUrl: string | null;
  transferContent: string | null;
  bank: { bankName: string; accountNumber: string; accountName: string } | null;
};

export function PayStatus({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [data, setData] = useState<PayData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        const json = await res.json();
        if (!res.ok) throw new Error(json.error || "Lỗi tải đơn");
        if (!active) return;
        setData(json);
        if (json.status === "paid" || json.status === "confirmed") {
          router.replace(`/success?code=${encodeURIComponent(json.code)}`);
        }
      } catch (err) {
        if (active) setError(err instanceof Error ? err.message : "Lỗi");
      }
    };
    void load();
    const poll = window.setInterval(load, 3000);
    return () => {
      active = false;
      window.clearInterval(poll);
    };
  }, [orderId, router]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#fdf8f0" }}>
        <p style={{ color: "#dc2626" }}>{error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "#fdf8f0" }}>
        <p style={{ color: "#9a7d5a" }}>Đang tải...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 py-10" style={{ background: "#fdf8f0" }}>
      <div className="max-w-md mx-auto text-center space-y-5">
        <Logo />
        <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: "#c47c1a" }}>
          Thanh toán SePay
        </p>
        <h1
          style={{
            fontFamily: "Fraunces, serif",
            fontSize: "1.8rem",
            fontWeight: 300,
            color: "#2c1f0e",
          }}
        >
          Quét QR để thanh toán
        </h1>
        <p className="text-sm" style={{ color: "#9a7d5a" }}>
          Đơn <span className="font-mono font-semibold">{data.code}</span> · {formatVnd(data.total)}
        </p>
        {data.qrUrl ? (
          <div className="inline-block p-3 rounded-2xl" style={{ background: "#fff", border: "1px solid #e8d9c0" }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={data.qrUrl} alt="QR SePay" className="w-64 h-64 mx-auto" />
          </div>
        ) : (
          <p className="text-sm text-red-600">Chưa cấu hình SePay (.env)</p>
        )}
        {data.bank ? (
          <div className="text-sm space-y-1" style={{ color: "#2c1f0e" }}>
            <p>{data.bank.bankName}</p>
            <p className="font-mono font-bold">{data.bank.accountNumber}</p>
            {data.bank.accountName ? <p>{data.bank.accountName}</p> : null}
            {data.transferContent ? (
              <p className="font-mono font-bold" style={{ color: "#c47c1a" }}>
                Nội dung: {data.transferContent}
              </p>
            ) : null}
          </div>
        ) : null}
        <p className="text-xs" style={{ color: "#9a7d5a" }}>
          Giữ nguyên nội dung chuyển khoản. Trang sẽ tự cập nhật khi SePay xác nhận.
        </p>
        <Link href="/" className="inline-block text-xs font-semibold" style={{ color: "#9a7d5a" }}>
          ← Về cửa hàng
        </Link>
      </div>
    </div>
  );
}
