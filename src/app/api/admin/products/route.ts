import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function GET() {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const products = await prisma.product.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ products });
}

export async function POST(req: Request) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await req.json()) as {
    name?: string;
    price?: number;
    unit?: string;
    category?: string;
    image?: string;
    tag?: string;
    desc?: string;
    active?: boolean;
  };

  const name = String(body.name ?? "").trim();
  const price = Math.round(Number(body.price) || 0);
  const unit = String(body.unit ?? "").trim();
  const category = String(body.category ?? "Mật ong").trim();
  const image = String(body.image ?? "").trim();
  const desc = String(body.desc ?? "").trim();
  if (!name || price <= 0 || !unit || !image || !desc) {
    return NextResponse.json({ error: "Thiếu thông tin sản phẩm" }, { status: 400 });
  }

  const product = await prisma.product.create({
    data: {
      name,
      price,
      unit,
      category,
      image,
      tag: body.tag?.trim() || null,
      desc,
      active: body.active !== false,
    },
  });
  return NextResponse.json({ product });
}
