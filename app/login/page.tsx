"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setSubmitting(false);
    if (error) {
      setError(error.message);
      return;
    }
    router.push("/");
  }

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-4"
      >
        <h1 className="text-center text-foreground">
          Log in
        </h1>
        <input
          type="email"
          required
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input px-3 py-2 placeholder:text-text-soft"
        />
        <input
          type="password"
          required
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input px-3 py-2 placeholder:text-text-soft"
        />
        <Link
          href="/auth/forgot-password"
          className="-mt-2 self-start btn-tertiary px-3 py-2 text-sm text-link"
        >
          Forgot your password?
        </Link>
        {error && <p className="text-sm text-danger">{error}</p>}
        <button
          type="submit"
          disabled={submitting}
          className="btn-primary px-5 py-2.5 disabled:opacity-50"
        >
          {submitting ? "Logging in…" : "Log in"}
        </button>
        <p className="text-center text-sm text-text-muted">
          Don&apos;t have an account?{" "}
          <Link href="/signup" className="text-link">
            Create one
          </Link>
        </p>
      </form>
    </main>
  );
}
