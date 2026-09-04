export default function Home() {
  return (
    <div className="flex flex-1 items-center justify-center bg-white font-sans dark:bg-black">
      <main className="flex flex-col items-center gap-6 px-6 text-center">
        {/* Text-based wordmark placeholder until a real logo asset is provided */}
        <span className="text-4xl font-bold tracking-[0.2em] text-black dark:text-zinc-50">
          KINPOT
        </span>
        <p className="max-w-md text-lg text-zinc-600 dark:text-zinc-400">
          Money conversations made easy.
        </p>
        <p className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-500">
          Coming soon
        </p>
      </main>
    </div>
  );
}
