import Link from "next/link";

export default function SamplePage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex w-full max-w-3xl flex-col items-center gap-6 py-32 px-16 bg-white dark:bg-black">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
          Sample Page
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          これはサンプルページです。ホームに戻るには下のリンクをクリックしてください。
        </p>
        <Link
          href="/"
          className="mt-4 inline-block rounded-full border border-solid border-black/[.08] px-5 py-2 text-sm font-medium hover:bg-black/[.04] dark:border-white/[.145]"
        >
          Back to Home
        </Link>
      </main>
    </div>
  );
}
