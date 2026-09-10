import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  adminCookieOptions,
  checkAdminPassword,
  clearAdminCookieOptions,
  createAdminToken,
  isAdminAuthenticated,
} from "@/lib/admin-auth";

export async function GET() {
  return NextResponse.json({ ok: await isAdminAuthenticated() });
}

export async function POST(req: Request) {
  const body = (await req.json()) as { password?: string; action?: string };
  if (body.action === "logout") {
    const jar = await cookies();
    jar.set(clearAdminCookieOptions());
    return NextResponse.json({ ok: true });
  }

  if (!checkAdminPassword(String(body.password ?? ""))) {
    return NextResponse.json({ error: "Sai mật khẩu" }, { status: 401 });
  }

  const jar = await cookies();
  jar.set(adminCookieOptions(createAdminToken()));
  return NextResponse.json({ ok: true });
}
