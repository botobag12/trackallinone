
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [forgotPassword, setForgotPassword] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const supabase = createClient();

      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });

      if (loginError) {
        setError("Invalid email or password.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch (err) {
      console.error("Admin login error:", err);
      setError("Unable to log in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleForgotPassword(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (!email.trim()) {
      setError("Please enter your admin email address.");
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(
          email.trim(),
          {
            redirectTo: `${window.location.origin}/admin/reset-password`,
          }
        );

      if (resetError) {
        throw resetError;
      }

      setSuccess(
        "If an account exists for this email, a password reset link has been sent. Please check your inbox and spam folder."
      );
    } catch (err) {
      console.error("Password recovery error:", err);
      setError(
        "Unable to send the password reset email. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  function showLogin() {
    setForgotPassword(false);
    setError("");
    setSuccess("");
    setPassword("");
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FFF8ED] px-5">
      <div className="w-full max-w-md rounded-2xl border border-gray-100 bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-black">
            TrackAllInOne
          </h1>

          <p className="mt-2 text-gray-500">
            {forgotPassword
              ? "Reset Administrator Password"
              : "Administrator Login"}
          </p>
        </div>

        {forgotPassword ? (
          <form
            onSubmit={handleForgotPassword}
            className="space-y-5"
          >
            <p className="text-sm leading-6 text-gray-600">
              Enter your registered admin email address. We'll
              send you a link to reset your password.
            </p>

            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Admin Email
              </label>

              <input
                id="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:border-red-800 focus:ring-2 focus:ring-red-100"
                placeholder="Enter your admin email"
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
                className="rounded-lg bg-green-50 p-3 text-sm leading-6 text-green-800"
              >
                {success}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#8B0000] px-4 py-3 font-semibold text-white transition hover:bg-[#680000] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Sending..." : "Send Reset Link"}
            </button>

            <button
              type="button"
              onClick={showLogin}
              className="w-full text-sm font-semibold text-[#8B0000] hover:underline"
            >
              Back to Admin Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Admin Email
              </label>

              <input
                id="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:border-red-800 focus:ring-2 focus:ring-red-100"
                placeholder="Enter your admin email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Password
              </label>

              <input
                id="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-3 text-black outline-none focus:border-red-800 focus:ring-2 focus:ring-red-100"
                placeholder="Enter your password"
              />
            </div>

            <div className="flex justify-end">
  <button
    type="button"
    onClick={() => {
      setForgotPassword(true);
      setError("");
      setSuccess("");
    }}
    className="inline-block cursor-pointer rounded-md bg-red-50 px-3 py-2 text-sm font-bold text-[#8B0000] hover:bg-red-100"
  >
    Forgot Password?
  </button>
</div>

            {error && (
              <p
                role="alert"
                className="rounded-lg bg-red-50 p-3 text-sm text-red-700"
              >
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#8B0000] px-4 py-3 font-semibold text-white transition hover:bg-[#680000] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-xs text-gray-400">
          Restricted access · Authorized administrators only
        </p>
      </div>
    </main>
  );
}
