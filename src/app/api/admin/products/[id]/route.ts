import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { isAdminAuthenticated } from "@/lib/admin-auth";

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  const body = (await req.json()) as Record<string, unknown>;

  const product = await prisma.product.update({
    where: { id },
    data: {
      name: body.name !== undefined ? String(body.name).trim() : undefined,
      price: body.price !== undefined ? Math.round(Number(body.price) || 0) : undefined,
      unit: body.unit !== undefined ? String(body.unit).trim() : undefined,
      category: body.category !== undefined ? String(body.category).trim() : undefined,
      image: body.image !== undefined ? String(body.image).trim() : undefined,
      tag: body.tag !== undefined ? (String(body.tag).trim() || null) : undefined,
      desc: body.desc !== undefined ? String(body.desc).trim() : undefined,
      active: body.active !== undefined ? Boolean(body.active) : undefined,
    },
  });
  return NextResponse.json({ product });
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  if (!(await isAdminAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await params;
  await prisma.product.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
