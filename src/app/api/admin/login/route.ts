import { NextResponse } from "next/server";
import {
  adminCookieAttrs,
  checkAdminPassword,
  clearAdminCookieAttrs,
  createAdminToken,
  getAdminCookieName,
  isAdminAuthenticated,
} from "@/lib/admin-auth";

export async function GET() {
  return NextResponse.json({ ok: await isAdminAuthenticated() });
}

export async function POST(req: Request) {
  const body = (await req.json()) as { password?: string; action?: string };

  if (body.action === "logout") {
    const res = NextResponse.json({ ok: true });
    res.cookies.set(getAdminCookieName(), "", clearAdminCookieAttrs());
    return res;
  }

  if (!checkAdminPassword(String(body.password ?? ""))) {
    return NextResponse.json({ error: "Sai mật khẩu" }, { status: 401 });
  }

  const token = createAdminToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(getAdminCookieName(), token, adminCookieAttrs());
  return res;
}
