
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminResetPasswordPage() {
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [recoveryAvailable, setRecoveryAvailable] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const supabase = createClient();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (
        event === "PASSWORD_RECOVERY" ||
        event === "SIGNED_IN"
      ) {
        setRecoveryAvailable(Boolean(session));
        setCheckingSession(false);
      }
    });

    supabase.auth.getSession().then(({ data, error }) => {
      if (error) {
        setRecoveryAvailable(false);
      } else {
        setRecoveryAvailable(Boolean(data.session));
      }

      setCheckingSession(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  async function handleResetPassword(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("The passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { data, error: updateError } =
        await supabase.auth.updateUser({
          password,
        });

      if (updateError) {
        throw updateError;
      }

      if (!data.user) {
        throw new Error("Password update could not be confirmed.");
      }

      setSuccess(
        "Your password has been updated. Redirecting you to admin login..."
      );

      await supabase.auth.signOut();

      router.replace("/admin/login?password-reset=success");
      router.refresh();
    } catch (err) {
      console.error("Password update error:", err);

      setError(
        err.message ||
          "Unable to update your password. Please request a new reset link."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFF8ED] px-5">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-black">
            TrackAllInOne
          </h1>

          <p className="mt-2 text-gray-500">
            Reset Administrator Password
          </p>
        </div>

        {checkingSession ? (
          <p className="text-center text-sm text-gray-600">
            Verifying your password reset link...
          </p>
        ) : !recoveryAvailable ? (
          <div>
            <p className="rounded-lg bg-red-50 p-4 text-sm leading-6 text-red-700">
              This password reset link is invalid, expired, or
              has already been used. Please request a new link.
            </p>

            <button
              type="button"
              onClick={() => router.replace("/admin/login")}
              className="mt-5 w-full rounded-lg bg-[#8B0000] px-4 py-3 font-semibold text-white transition hover:bg-[#680000]"
            >
              Back to Admin Login
            </button>
          </div>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-5">
            <p className="text-sm leading-6 text-gray-600">
              Enter your new administrator password below.
              Use at least 8 characters.
            </p>

            <div>
              <label
                htmlFor="new-password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                New Password
              </label>

              <input
                id="new-password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:border-red-800 focus:ring-2 focus:ring-red-100"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label
                htmlFor="confirm-password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Confirm New Password
              </label>

              <input
                id="confirm-password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
                value={confirmPassword}
                onChange={(event) =>
                  setConfirmPassword(event.target.value)
                }
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:border-red-800 focus:ring-2 focus:ring-red-100"
                placeholder="Confirm new password"
              />
            </div>

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            {success && (
              <p
                role="status"
                className="rounded-lg bg-green-50 p-3 text-sm text-green-800"
              >
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#8B0000] px-4 py-3 font-semibold text-white transition hover:bg-[#680000] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Updating Password..." : "Update Password"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
