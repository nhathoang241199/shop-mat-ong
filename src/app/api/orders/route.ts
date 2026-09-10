import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { calcShipping, generateOrderCode, generatePaymentRef } from "@/lib/constants";

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      customerName?: string;
      phone?: string;
      address?: string;
      payment?: string;
      items?: { productId: string; qty: number }[];
    };

    const customerName = String(body.customerName ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const address = String(body.address ?? "").trim();
    const payment = body.payment === "sepay" ? "sepay" : "cod";
    const items = Array.isArray(body.items) ? body.items : [];

    if (!customerName || !phone || !address) {
      return NextResponse.json({ error: "Thiếu thông tin giao hàng" }, { status: 400 });
    }
    if (items.length === 0) {
      return NextResponse.json({ error: "Giỏ hàng trống" }, { status: 400 });
    }

    const productIds = items.map((i) => i.productId);
    const products = await prisma.product.findMany({
      where: { id: { in: productIds }, active: true },
    });
    if (products.length !== new Set(productIds).size) {
      return NextResponse.json({ error: "Sản phẩm không hợp lệ" }, { status: 400 });
    }

    const byId = new Map(products.map((p) => [p.id, p]));
    const lineItems = items.map((item) => {
      const product = byId.get(item.productId)!;
      const qty = Math.max(1, Math.min(99, Math.round(Number(item.qty) || 1)));
      return {
        productId: product.id,
        name: product.name,
        price: product.price,
        qty,
      };
    });

    const subtotal = lineItems.reduce((sum, item) => sum + item.price * item.qty, 0);
    const shipping = calcShipping(subtotal);
    const total = subtotal + shipping;
    const code = generateOrderCode();
    const paymentRef = payment === "sepay" ? generatePaymentRef() : null;

    const order = await prisma.order.create({
      data: {
        code,
        customerName,
        phone,
        address,
        payment,
        status: "pending",
        subtotal,
        shipping,
        total,
        paymentRef,
        items: { create: lineItems },
      },
    });

    return NextResponse.json({
      id: order.id,
      code: order.code,
      payment: order.payment,
      paymentRef: order.paymentRef,
      total: order.total,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Không tạo được đơn hàng" }, { status: 500 });
  }
}
