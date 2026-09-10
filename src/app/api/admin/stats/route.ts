import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const [orders, products, revenue] = await Promise.all([
    prisma.order.count(),
    prisma.product.count({ where: { active: true } }),
    prisma.order.aggregate({
      where: { status: { in: ["paid", "confirmed", "shipping", "delivered"] } },
      _sum: { total: true },
    }),
  ]);
  const pending = await prisma.order.count({ where: { status: "pending" } });
  return NextResponse.json({
    orders,
    products,
    pending,
    revenue: revenue._sum.total ?? 0,
  });
}
