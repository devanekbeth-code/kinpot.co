import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-background-circle font-sans">
      <header className="flex items-center justify-between px-6 py-5 sm:px-10">
        <Link href="/" className="flex items-center gap-2" aria-label="KINPOT home">
          <Image
            src="/kinpot-mark.svg"
            alt=""
            width={32}
            height={32}
            priority
          />
          <span className="font-display tracking-[0.16em] text-brand">
            KINPOT
          </span>
        </Link>
        <nav aria-label="Account navigation" className="flex items-center gap-4 text-sm">
          <Link href="/login" className="btn-tertiary px-3 py-2">
            Log in
          </Link>
          <Link href="/signup" className="btn-primary px-4 py-2">
            Sign up
          </Link>
        </nav>
      </header>
      <main className="flex flex-1 flex-col items-center justify-center gap-6 px-6 pb-20 text-center">
        <h1 className="max-w-2xl text-text-muted">
          Money conversations made easy.
        </h1>
      </main>
    </div>
  );
}
