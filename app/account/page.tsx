"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { User } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

function formatDate(value: string | undefined) {
  if (!value) return "Not available";
  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export default function AccountPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    let mounted = true;
    const supabase = createClient();

    supabase.auth.getUser().then(({ data, error: userError }) => {
      if (!mounted) return;
      if (userError || !data.user) {
        router.replace("/login");
        return;
      }
      setUser(data.user);
    });

    return () => {
      mounted = false;
    };
  }, [router]);

  async function handlePasswordUpdate(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);
    setError(null);

    if (password.length < 6) {
      setError("Your password must be at least 6 characters.");
      return;
    }
    if (password !== confirmation) {
      setError("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    const { error: updateError } = await createClient().auth.updateUser({
      password,
    });
    setSubmitting(false);

    if (updateError) {
      setError(updateError.message);
      return;
    }

    setPassword("");
    setConfirmation("");
    setMessage("Your password has been updated.");
  }

  async function handleSignOut() {
    const { error: signoutError } = await createClient().auth.signOut();
    if (signoutError) {
      setError(signoutError.message);
      return;
    }
    router.replace("/login");
  }

  async function handleDelete() {
    if (
      !window.confirm(
        "Delete your account permanently? This action cannot be undone."
      )
    ) {
      return;
    }

    setDeleting(true);
    setError(null);
    const response = await fetch("/api/account/delete", { method: "DELETE" });
    const result = (await response.json().catch(() => null)) as {
      error?: string;
    } | null;

    if (!response.ok) {
      setDeleting(false);
      setError(result?.error ?? "Unable to delete your account.");
      return;
    }

    await createClient().auth.signOut();
    router.replace("/signup");
  }

  if (!user) {
    return (
      <main className="flex flex-1 items-center justify-center px-6">
        <p className="text-text-muted">Loading your account…</p>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col items-center px-6 py-12">
      <div className="flex w-full max-w-lg flex-col gap-8">
        <div>
          <Link href="/" className="text-sm text-link">
            Back to app
          </Link>
          <h1 className="mt-4 text-2xl font-semibold text-foreground">
            Your account
          </h1>
          <p className="mt-2 text-text-muted">
            These details come from your Supabase account.
          </p>
        </div>

        <section className="flex flex-col gap-4 rounded-md border border-border bg-surface p-5">
          <h2 className="text-lg font-semibold text-foreground">
            Account details
          </h2>
          <dl className="flex flex-col gap-3 text-sm">
            <div>
              <dt className="font-medium text-text-muted">Email</dt>
              <dd className="mt-1 text-foreground">{user.email}</dd>
            </div>
            <div>
              <dt className="font-medium text-text-muted">Created</dt>
              <dd className="mt-1 text-foreground">
                {formatDate(user.created_at)}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-text-muted">Last sign in</dt>
              <dd className="mt-1 text-foreground">
                {formatDate(user.last_sign_in_at)}
              </dd>
            </div>
          </dl>
        </section>

        <form
          onSubmit={handlePasswordUpdate}
          className="flex flex-col gap-4 rounded-md border border-border bg-surface p-5"
        >
          <h2 className="text-lg font-semibold text-foreground">
            Change password
          </h2>
          <input
            type="password"
            required
            minLength={6}
            placeholder="New password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="rounded-md border border-border bg-surface px-3 py-2 text-foreground placeholder:text-text-soft"
          />
          <input
            type="password"
            required
            minLength={6}
            placeholder="Confirm new password"
            value={confirmation}
            onChange={(event) => setConfirmation(event.target.value)}
            className="rounded-md border border-border bg-surface px-3 py-2 text-foreground placeholder:text-text-soft"
          />
          <button
            type="submit"
            disabled={submitting}
            className="btn-primary px-5 py-2.5 disabled:opacity-50"
          >
            {submitting ? "Updating…" : "Update password"}
          </button>
        </form>

        {message && <p className="text-sm text-success">{message}</p>}
        {error && <p className="text-sm text-danger">{error}</p>}

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleSignOut}
            className="btn-secondary px-5 py-2.5"
          >
            Log out
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={deleting}
            className="btn-tertiary px-5 py-2.5 text-danger disabled:opacity-50"
          >
            {deleting ? "Deleting…" : "Delete account"}
          </button>
        </div>
      </div>
    </main>
  );
}
