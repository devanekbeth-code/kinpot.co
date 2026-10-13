"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function SignupPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (password !== confirmation) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    const { data, error: signupError } = await createClient().auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/confirm`,
      },
    });
    setSubmitting(false);

    if (signupError) {
      setError(signupError.message);
      return;
    }

    if (data.session) {
      router.push("/account");
      return;
    }

    setCreated(true);
  }

  if (created) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-2xl font-semibold text-foreground">
          Check your email
        </h1>
        <p className="max-w-md text-text-muted">
          We sent a confirmation link to {email}. Confirm your email address to
          finish creating your account.
        </p>
        <Link href="/login" className="btn-primary mt-2 px-5 py-2.5">
          Go to log in
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
          <h1 className="text-2xl font-semibold text-foreground">
            Create your account
          </h1>
          <p className="mt-2 text-text-muted">
            Use your email address to get started.
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
        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
          Password
          <input
            type="password"
            required
            minLength={6}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="form-input px-3 py-2 placeholder:text-text-soft"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium text-foreground">
          Confirm password
          <input
            type="password"
            required
            minLength={6}
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            className="form-input px-3 py-2 placeholder:text-text-soft"
          />
        </label>
        {error && <p className="text-sm text-danger">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary px-5 py-2.5 disabled:opacity-50"
        >
          {submitting ? "Creating account…" : "Create account"}
        </button>
        <p className="text-center text-sm text-text-muted">
          Already have an account?{" "}
          <Link href="/login" className="text-link">
            Log in
          </Link>
        </p>
      </form>
    </main>
  );
}
