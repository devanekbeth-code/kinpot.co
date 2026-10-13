import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-background font-sans">
      <main className="flex flex-col items-center gap-6 px-6 text-center">
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
