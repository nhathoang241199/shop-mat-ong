"use client";

import { useState } from "react";
import { formatVnd } from "@/lib/constants";
import type { CartProduct } from "@/components/cart-context";

export function ProductCard({
  product,
  onAdd,
  inCart,
}: {
  product: CartProduct;
  onAdd: () => void;
  inCart: boolean;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-2xl overflow-hidden flex flex-col transition-shadow"
      style={{
        background: "#fff",
        border: "1px solid #e8d9c0",
        boxShadow: hovered ? "0 8px 32px rgba(196,124,26,0.12)" : "0 1px 4px rgba(44,31,14,0.06)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative overflow-hidden" style={{ aspectRatio: "4/5", background: "#f5ede0" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? "scale(1.06)" : "scale(1)" }}
        />
        {product.tag ? (
          <span
            className="absolute top-3 left-3 px-2.5 py-1 text-xs font-bold rounded-full"
            style={{ background: "#c47c1a", color: "#fff" }}
          >
            {product.tag}
          </span>
        ) : null}
      </div>
      <div className="p-4 flex flex-col flex-1">
        <p className="text-xs font-semibold tracking-wider uppercase mb-1" style={{ color: "#9a7d5a" }}>
          {product.category}
        </p>
        <p className="text-sm font-bold leading-snug mb-1" style={{ color: "#2c1f0e" }}>
          {product.name}
        </p>
        <p className="text-xs leading-relaxed flex-1" style={{ color: "#9a7d5a" }}>
          {product.desc}
        </p>
        <div className="flex items-center justify-between mt-4">
          <div>
            <p className="text-base font-bold" style={{ color: "#c47c1a" }}>
              {formatVnd(product.price)}
            </p>
            <p className="text-xs" style={{ color: "#c8b89a" }}>
              / {product.unit}
            </p>
          </div>
          <button
            type="button"
            onClick={onAdd}
            className="px-4 py-2 text-xs font-bold tracking-wide transition-all"
            style={{
              background: inCart ? "#fff8ed" : "#c47c1a",
              color: inCart ? "#c47c1a" : "#fff",
              border: `1.5px solid ${inCart ? "#c47c1a" : "transparent"}`,
              borderRadius: 20,
            }}
          >
            {inCart ? "✓ Đã thêm" : "+ Thêm vào giỏ"}
          </button>
        </div>
      </div>
    </div>
  );
}
