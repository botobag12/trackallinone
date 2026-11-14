
import { createClient } from "@/lib/supabase/server";

export async function getAdminUser() {
  try {
    const supabase = await createClient();

    // Verify the user's session with Supabase.
    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error || !user) {
      return null;
    }

    // Read the authorized admin email.
    const adminEmail = process.env.ADMIN_EMAIL
      ?.trim()
      .toLowerCase();

    if (!adminEmail) {
      console.error("ADMIN_EMAIL is not configured.");
      return null;
    }

    // Allow only the configured administrator.
    if (user.email?.trim().toLowerCase() !== adminEmail) {
      return null;
    }

    return user;
  } catch (error) {
    console.error("Admin authorization error:", error.message);
    return null;
  }
}
