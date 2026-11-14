
import { redirect } from "next/navigation";
import { getAdminUser } from "@/lib/supabase/admin-auth";
import AdminDashboard from "@/components/admin/AdminDashboard";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Admin Dashboard | TrackAllInOne",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage() {
  const admin = await getAdminUser();

  if (!admin) {
    redirect("/admin/login");
  }

  return <AdminDashboard adminEmail={admin.email} />;
}
