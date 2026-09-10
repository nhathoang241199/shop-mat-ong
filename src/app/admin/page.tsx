import { isAdminAuthenticated } from "@/lib/admin-auth";
import { AdminApp } from "@/components/admin-app";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const authed = await isAdminAuthenticated();
  return <AdminApp initiallyAuthed={authed} />;
}
