import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { ORDER_STATUSES, type OrderStatus } from "@/lib/constants";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const orders = await prisma.order.findMany({
    include: { items: true },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json({ orders });
}

export async function PATCH(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as { id?: string; status?: string };
  const id = String(body.id ?? "");
  const status = String(body.status ?? "") as OrderStatus;
  if (!id || !ORDER_STATUSES.includes(status)) {
    return NextResponse.json({ error: "Invalid" }, { status: 400 });
  }
  const order = await prisma.order.update({
    where: { id },
    data: { status },
    include: { items: true },
  });
  return NextResponse.json({ order });
}
