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
          <span className="font-bold tracking-[0.16em] text-brand">KINPOT</span>
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
        <div className="flex items-center gap-3">
          <Image
            src="/kinpot-mark.svg"
            alt=""
            width={56}
            height={56}
            priority
          />
          <span className="text-4xl font-bold tracking-[0.2em] text-brand">
            KINPOT
          </span>
        </div>
        <p className="max-w-md text-lg text-text-muted">
          Money conversations made easy.
        </p>
        <p className="text-sm font-medium uppercase tracking-widest text-text-soft">
          Coming soon
        </p>
      </main>
    </div>
  );
}
