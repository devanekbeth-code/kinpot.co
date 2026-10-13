"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import type { EmailOtpType } from "@supabase/supabase-js";
import { createClient } from "@/lib/supabase/client";

type Status = "verifying" | "success" | "error";

function ConfirmContent() {
  const searchParams = useSearchParams();
  const tokenHash = searchParams.get("token_hash");
  const type = searchParams.get("type") as EmailOtpType | null;
  const [status, setStatus] = useState<Status>(
    tokenHash && type ? "verifying" : "error"
  );

  useEffect(() => {
    if (!tokenHash || !type) {
      return;
    }

    const supabase = createClient();
    supabase.auth
      .verifyOtp({ token_hash: tokenHash, type })
      .then(({ error }) => setStatus(error ? "error" : "success"));
  }, [tokenHash, type]);

  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
      {status === "verifying" && (
        <p className="text-lg text-text-muted">
          Confirming your email…
        </p>
      )}
      {status === "success" && (
        <>
          <h1 className="text-foreground">
            Your email is confirmed
          </h1>
          <p className="max-w-md text-text-muted">
            You&apos;ve successfully confirmed your email address.
          </p>
          <div className="mt-2 flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="btn-primary px-5 py-2.5"
            >
              Go to app
            </Link>
            <a
              href="kinpot://"
              className="btn-secondary px-5 py-2.5"
            >
              Open Kinpot app
            </a>
          </div>
        </>
      )}
      {status === "error" && (
        <>
          <h1 className="text-foreground">
            We couldn&apos;t confirm your email
          </h1>
          <p className="max-w-md text-text-muted">
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
