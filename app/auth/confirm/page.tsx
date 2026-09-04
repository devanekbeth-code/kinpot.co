"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

type Status = "verifying" | "success" | "error";

function ConfirmContent() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<Status>("verifying");

  useEffect(() => {
    const tokenHash = searchParams.get("token_hash");
    const type = searchParams.get("type") as EmailOtpType | null;

    if (!tokenHash || !type) {
      setStatus("error");
      return;
    }

    const supabase = createClient();
    supabase.auth
      .verifyOtp({ token_hash: tokenHash, type })
      .then(({ error }) => setStatus(error ? "error" : "success"));
  }, [searchParams]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      {status === "verifying" && (
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Confirming your email…
        </p>
      )}
      {status === "success" && (
        <>
          <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
            Your email is confirmed
          </h1>
          <p className="max-w-md text-zinc-600 dark:text-zinc-400">
            You&apos;ve successfully confirmed your email address.
          </p>
          <Link
            href="/login"
            className="mt-2 rounded-full bg-black px-5 py-2.5 text-white dark:bg-white dark:text-black"
          >
            Log in
          </Link>
        </>
      )}
      {status === "error" && (
        <>
          <h1 className="text-2xl font-semibold text-black dark:text-zinc-50">
            We couldn&apos;t confirm your email
          </h1>
          <p className="max-w-md text-zinc-600 dark:text-zinc-400">
            This confirmation link is invalid or has expired. Please request a
            new one.
          </p>
        </>
      )}
    </main>
  );
}

export default function ConfirmPage() {
  return (
    <Suspense>
      <ConfirmContent />
    </Suspense>
  );
}
