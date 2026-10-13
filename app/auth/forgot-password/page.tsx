"use client";

import { useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    const { error: resetError } = await createClient().auth.resetPasswordForEmail(
      email,
      { redirectTo: `${window.location.origin}/auth/reset-password` }
    );
    setSubmitting(false);

    if (resetError) {
      setError(resetError.message);
      return;
    }

    setSent(true);
  }

  if (sent) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-foreground">
          Check your email
        </h1>
        <p className="max-w-md text-text-muted">
          If an account exists for that email, we&apos;ve sent a password reset
          link.
        </p>
        <Link
          href="/login"
          className="btn-primary mt-2 px-5 py-2.5"
        >
          Back to log in
        </Link>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-4"
      >
        <div className="text-center">
          <h1 className="text-foreground">
            Forgot your password?
          </h1>
          <p className="mt-2 text-text-muted">
            Enter your email and we&apos;ll send you a reset link.
          </p>
        </div>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
          Email
          <input
            type="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="form-input px-3 py-2 placeholder:text-text-soft"
          />
        </label>
        {error && <p className="text-sm text-danger">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary px-5 py-2.5 disabled:opacity-50"
        >
          {submitting ? "Sending…" : "Send reset link"}
        </button>
        <Link href="/login" className="btn-tertiary text-center text-sm">
          Back to log in
        </Link>
      </form>
    </main>
  );
}
