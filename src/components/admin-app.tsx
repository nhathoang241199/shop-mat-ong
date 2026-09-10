"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/logo";
import { formatVnd, STATUS_LABELS, type OrderStatus } from "@/lib/constants";

type Product = {
  id: string;
  name: string;
  price: number;
  unit: string;
  category: string;
  image: string;
  tag: string | null;
  desc: string;
  active: boolean;
};

type OrderItem = { id: string; name: string; price: number; qty: number };
type Order = {
  id: string;
  code: string;
  customerName: string;
  phone: string;
  address: string;
  payment: string;
  status: OrderStatus;
  total: number;
  createdAt: string;
  items: OrderItem[];
};

type Tab = "dashboard" | "orders" | "products";

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  pending: { bg: "#fff8ed", color: "#c47c1a" },
  paid: { bg: "#ecfdf5", color: "#059669" },
  confirmed: { bg: "#eff6ff", color: "#2563eb" },
  shipping: { bg: "#f0fdf4", color: "#16a34a" },
  delivered: { bg: "#f0fdf4", color: "#15803d" },
  cancelled: { bg: "#fef2f2", color: "#dc2626" },
};

const NEXT_STATUS: Partial<Record<OrderStatus, OrderStatus>> = {
  pending: "confirmed",
  paid: "confirmed",
  confirmed: "shipping",
  shipping: "delivered",
};

const EMPTY_PRODUCT = {
  name: "",
  price: 0,
  unit: "",
  category: "Mật ong",
  image: "",
  tag: "",
  desc: "",
};

export function AdminApp({ initiallyAuthed }: { initiallyAuthed: boolean }) {
  const [authed, setAuthed] = useState(initiallyAuthed);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [tab, setTab] = useState<Tab>("dashboard");
  const [stats, setStats] = useState({ orders: 0, products: 0, pending: 0, revenue: 0 });
  const [orders, setOrders] = useState<Order[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orderFilter, setOrderFilter] = useState<OrderStatus | "all">("all");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState(EMPTY_PRODUCT);

  const loadAll = useCallback(async () => {
    const [s, o, p] = await Promise.all([
      fetch("/api/admin/stats").then((r) => r.json()),
      fetch("/api/admin/orders").then((r) => r.json()),
      fetch("/api/admin/products").then((r) => r.json()),
    ]);
    if (s.orders !== undefined) setStats(s);
    if (Array.isArray(o.orders)) setOrders(o.orders);
    if (Array.isArray(p.products)) setProducts(p.products);
  }, []);

  useEffect(() => {
    if (authed) void loadAll();
  }, [authed, loadAll]);

  async function login(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (!res.ok) {
      setLoginError("Sai mật khẩu");
      return;
    }
    setAuthed(true);
  }

  async function logout() {
    await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "logout" }),
    });
    setAuthed(false);
  }

  async function updateOrderStatus(id: string, status: OrderStatus) {
    const res = await fetch("/api/admin/orders", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    const json = await res.json();
    if (json.order) {
      setOrders((prev) => prev.map((o) => (o.id === id ? json.order : o)));
      setSelectedOrder((prev) => (prev?.id === id ? json.order : prev));
      void loadAll();
    }
  }

  async function saveProduct() {
    const payload = {
      ...productForm,
      price: Number(productForm.price) || 0,
      tag: productForm.tag || null,
    };
    if (editProduct) {
      await fetch(`/api/admin/products/${editProduct.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      await fetch("/api/admin/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }
    setShowProductModal(false);
    setEditProduct(null);
    setProductForm(EMPTY_PRODUCT);
    void loadAll();
  }

  async function deleteProduct(id: string) {
    if (!confirm("Xoá sản phẩm này?")) return;
    await fetch(`/api/admin/products/${id}`, { method: "DELETE" });
    void loadAll();
  }

  const filteredOrders = useMemo(
    () => (orderFilter === "all" ? orders : orders.filter((o) => o.status === orderFilter)),
    [orders, orderFilter],
  );

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4" style={{ background: "#fdf8f0" }}>
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-2xl p-6 space-y-4"
          style={{ background: "#fff", border: "1px solid #e8d9c0" }}
        >
          <Logo />
          <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: "#c47c1a" }}>
            Đăng nhập quản trị
          </p>
          <input
            type="password"
            required
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 text-sm outline-none rounded-md"
            style={{ border: "1.5px solid #e8d9c0", color: "#2c1f0e" }}
          />
          {loginError ? <p className="text-sm text-red-600">{loginError}</p> : null}
          <button
            type="submit"
            className="w-full py-3 text-sm font-semibold"
            style={{ background: "#c47c1a", color: "#fff", borderRadius: 6 }}
          >
            Đăng nhập
          </button>
          <Link href="/" className="block text-center text-xs" style={{ color: "#9a7d5a" }}>
            ← Về cửa hàng
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "#fdf8f0" }}>
      <header className="border-b px-4 py-3" style={{ background: "#fff", borderColor: "#e8d9c0" }}>
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Logo />
            <nav className="hidden sm:flex gap-1">
              {(
                [
                  ["dashboard", "Tổng quan"],
                  ["orders", "Đơn hàng"],
                  ["products", "Sản phẩm"],
                ] as const
              ).map(([key, label]) => (
                <button
                  key={key}
                  type="button"
                  onClick={() => setTab(key)}
                  className="px-3 py-2 text-xs font-semibold tracking-wider uppercase border-b-2"
                  style={{
                    borderColor: tab === key ? "#c47c1a" : "transparent",
                    color: tab === key ? "#c47c1a" : "#9a7d5a",
                  }}
                >
                  {label}
                </button>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-3">
            {tab === "products" ? (
              <button
                type="button"
                onClick={() => {
                  setEditProduct(null);
                  setProductForm(EMPTY_PRODUCT);
                  setShowProductModal(true);
                }}
                className="px-3 py-2 text-xs font-bold"
                style={{ background: "#c47c1a", color: "#fff", borderRadius: 6 }}
              >
                Thêm sản phẩm
              </button>
            ) : null}
            <button type="button" onClick={() => void logout()} className="text-xs" style={{ color: "#9a7d5a" }}>
              Đăng xuất
            </button>
          </div>
        </div>
        <div className="sm:hidden max-w-6xl mx-auto flex gap-2 mt-2 overflow-x-auto">
          {(
            [
              ["dashboard", "Tổng quan"],
              ["orders", "Đơn hàng"],
              ["products", "Sản phẩm"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setTab(key)}
              className="shrink-0 px-3 py-1.5 text-xs font-semibold rounded-full"
              style={{
                background: tab === key ? "#fff8ed" : "#fff",
                color: tab === key ? "#c47c1a" : "#7a5c38",
                border: "1px solid #e8d9c0",
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {tab === "dashboard" ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Doanh thu", value: formatVnd(stats.revenue) },
              { label: "Tổng đơn", value: String(stats.orders) },
              { label: "Chờ xử lý", value: String(stats.pending) },
              { label: "Sản phẩm", value: String(stats.products) },
            ].map((card) => (
              <div key={card.label} className="rounded-2xl p-5" style={{ background: "#fff", border: "1px solid #e8d9c0" }}>
                <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: "#9a7d5a" }}>
                  {card.label}
                </p>
                <p className="mt-2 text-2xl font-bold" style={{ color: "#2c1f0e" }}>
                  {card.value}
                </p>
              </div>
            ))}
          </div>
        ) : null}

        {tab === "orders" ? (
          <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {(["all", "pending", "paid", "confirmed", "shipping", "delivered", "cancelled"] as const).map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setOrderFilter(s)}
                  className="px-3 py-1.5 text-xs font-semibold rounded-full"
                  style={{
                    background: orderFilter === s ? "#c47c1a" : "#fff",
                    color: orderFilter === s ? "#fff" : "#7a5c38",
                    border: "1px solid #e8d9c0",
                  }}
                >
                  {s === "all" ? "Tất cả" : STATUS_LABELS[s]}
                </button>
              ))}
            </div>
            <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid #e8d9c0" }}>
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[700px]">
                  <thead>
                    <tr style={{ background: "#fff8ed", color: "#7a5c38" }}>
                      <th className="text-left px-4 py-3 font-semibold">Mã</th>
                      <th className="text-left px-4 py-3 font-semibold">Khách</th>
                      <th className="text-left px-4 py-3 font-semibold">Thanh toán</th>
                      <th className="text-left px-4 py-3 font-semibold">Trạng thái</th>
                      <th className="text-right px-4 py-3 font-semibold">Tổng</th>
                      <th className="px-4 py-3" />
                    </tr>
                  </thead>
                  <tbody>
                    {filteredOrders.map((o) => {
                      const style = STATUS_STYLE[o.status] ?? STATUS_STYLE.pending;
                      return (
                        <tr key={o.id} className="border-t" style={{ borderColor: "#f0e8d8" }}>
                          <td className="px-4 py-3 font-mono text-xs">{o.code}</td>
                          <td className="px-4 py-3">
                            <div className="font-semibold">{o.customerName}</div>
                            <div className="text-xs" style={{ color: "#9a7d5a" }}>
                              {o.phone}
                            </div>
                          </td>
                          <td className="px-4 py-3 uppercase text-xs">{o.payment}</td>
                          <td className="px-4 py-3">
                            <span
                              className="inline-flex px-2 py-1 rounded-full text-xs font-semibold"
                              style={{ background: style.bg, color: style.color }}
                            >
                              {STATUS_LABELS[o.status] ?? o.status}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right font-bold" style={{ color: "#c47c1a" }}>
                            {formatVnd(o.total)}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedOrder(o)}
                              className="text-xs font-semibold"
                              style={{ color: "#c47c1a" }}
                            >
                              Chi tiết
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {filteredOrders.length === 0 ? (
                <p className="text-sm text-center py-10" style={{ color: "#c8b89a" }}>
                  Không có đơn hàng nào
                </p>
              ) : null}
            </div>
          </div>
        ) : null}

        {tab === "products" ? (
          <div className="rounded-2xl overflow-hidden" style={{ background: "#fff", border: "1px solid #e8d9c0" }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm min-w-[640px]">
                <thead>
                  <tr style={{ background: "#fff8ed", color: "#7a5c38" }}>
                    <th className="text-left px-4 py-3">Sản phẩm</th>
                    <th className="text-left px-4 py-3">Danh mục</th>
                    <th className="text-right px-4 py-3">Giá</th>
                    <th className="text-left px-4 py-3">Trạng thái</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-t" style={{ borderColor: "#f0e8d8" }}>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={p.image} alt="" className="w-10 h-12 object-cover rounded-md" />
                          <div>
                            <div className="font-semibold">{p.name}</div>
                            <div className="text-xs" style={{ color: "#9a7d5a" }}>
                              {p.unit}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">{p.category}</td>
                      <td className="px-4 py-3 text-right font-bold" style={{ color: "#c47c1a" }}>
                        {formatVnd(p.price)}
                      </td>
                      <td className="px-4 py-3 text-xs">{p.active ? "Đang bán" : "Ẩn"}</td>
                      <td className="px-4 py-3 text-right space-x-3">
                        <button
                          type="button"
                          className="text-xs font-semibold"
                          style={{ color: "#c47c1a" }}
                          onClick={() => {
                            setEditProduct(p);
                            setProductForm({
                              name: p.name,
                              price: p.price,
                              unit: p.unit,
                              category: p.category,
                              image: p.image,
                              tag: p.tag ?? "",
                              desc: p.desc,
                            });
                            setShowProductModal(true);
                          }}
                        >
                          Sửa
                        </button>
                        <button
                          type="button"
                          className="text-xs font-semibold text-red-600"
                          onClick={() => void deleteProduct(p.id)}
                        >
                          Xoá
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : null}
      </main>

      {selectedOrder ? (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0" style={{ background: "rgba(44,31,14,0.45)" }} onClick={() => setSelectedOrder(null)} />
          <aside className="relative w-full max-w-md h-full overflow-y-auto p-5" style={{ background: "#fdf8f0" }}>
            <p className="text-xs font-semibold tracking-wider uppercase" style={{ color: "#c47c1a" }}>
              Chi tiết đơn hàng
            </p>
            <h3 className="mt-2 font-mono text-lg font-bold">{selectedOrder.code}</h3>
            <div className="mt-4 space-y-2 text-sm" style={{ color: "#2c1f0e" }}>
              <p>
                <strong>{selectedOrder.customerName}</strong> · {selectedOrder.phone}
              </p>
              <p style={{ color: "#7a5c38" }}>{selectedOrder.address}</p>
              <p>Thanh toán: {selectedOrder.payment.toUpperCase()}</p>
            </div>
            <div className="mt-4 space-y-2">
              {selectedOrder.items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>
                    {item.name} × {item.qty}
                  </span>
                  <span style={{ color: "#c47c1a" }}>{formatVnd(item.price * item.qty)}</span>
                </div>
              ))}
              <div className="flex justify-between font-bold border-t pt-2" style={{ borderColor: "#e8d9c0" }}>
                <span>Tổng</span>
                <span style={{ color: "#c47c1a" }}>{formatVnd(selectedOrder.total)}</span>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {NEXT_STATUS[selectedOrder.status] ? (
                <button
                  type="button"
                  className="px-4 py-2 text-xs font-bold"
                  style={{ background: "#c47c1a", color: "#fff", borderRadius: 6 }}
                  onClick={() =>
                    void updateOrderStatus(selectedOrder.id, NEXT_STATUS[selectedOrder.status]!)
                  }
                >
                  Chuyển → {STATUS_LABELS[NEXT_STATUS[selectedOrder.status]!]}
                </button>
              ) : null}
              {selectedOrder.status !== "cancelled" && selectedOrder.status !== "delivered" ? (
                <button
                  type="button"
                  className="px-4 py-2 text-xs font-bold rounded-md"
                  style={{ border: "1px solid #dc2626", color: "#dc2626" }}
                  onClick={() => void updateOrderStatus(selectedOrder.id, "cancelled")}
                >
                  Huỷ đơn
                </button>
              ) : null}
            </div>
          </aside>
        </div>
      ) : null}

      {showProductModal ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0" style={{ background: "rgba(44,31,14,0.45)" }} onClick={() => setShowProductModal(false)} />
          <div className="relative w-full max-w-lg rounded-2xl p-5 space-y-3" style={{ background: "#fff", border: "1px solid #e8d9c0" }}>
            <h3 className="text-base font-bold" style={{ color: "#2c1f0e" }}>
              {editProduct ? "Chỉnh sửa sản phẩm" : "Thêm sản phẩm mới"}
            </h3>
            {(
              [
                ["name", "Tên sản phẩm"],
                ["unit", "Đơn vị"],
                ["category", "Danh mục"],
                ["image", "URL ảnh"],
                ["tag", "Tag (tuỳ chọn)"],
                ["desc", "Mô tả"],
              ] as const
            ).map(([key, label]) => (
              <div key={key}>
                <label className="text-xs font-semibold" style={{ color: "#9a7d5a" }}>
                  {label}
                </label>
                {key === "desc" ? (
                  <textarea
                    rows={3}
                    value={productForm[key]}
                    onChange={(e) => setProductForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 text-sm rounded-md outline-none"
                    style={{ border: "1.5px solid #e8d9c0" }}
                  />
                ) : (
                  <input
                    value={productForm[key]}
                    onChange={(e) => setProductForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="w-full mt-1 px-3 py-2 text-sm rounded-md outline-none"
                    style={{ border: "1.5px solid #e8d9c0" }}
                  />
                )}
              </div>
            ))}
            <div>
              <label className="text-xs font-semibold" style={{ color: "#9a7d5a" }}>
                Giá (VND)
              </label>
              <input
                type="number"
                value={productForm.price || ""}
                onChange={(e) => setProductForm((f) => ({ ...f, price: Number(e.target.value) || 0 }))}
                className="w-full mt-1 px-3 py-2 text-sm rounded-md outline-none"
                style={{ border: "1.5px solid #e8d9c0" }}
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button type="button" className="px-4 py-2 text-xs" onClick={() => setShowProductModal(false)}>
                Huỷ
              </button>
              <button
                type="button"
                onClick={() => void saveProduct()}
                className="px-4 py-2 text-xs font-bold"
                style={{ background: "#c47c1a", color: "#fff", borderRadius: 6 }}
              >
                Lưu
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
