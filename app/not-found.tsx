import Link from "next/link";

export default function NotFound() {
  return (
    <section className="min-h-screen bg-dark flex items-center justify-center px-6">
      <div className="text-center">
        <p className="font-display font-bold text-[12rem] leading-none text-dark-200 select-none">
          404
        </p>
        <h1 className="font-display font-bold text-4xl text-white mb-4 -mt-8">
          Page not found
        </h1>
        <p className="text-neutral-muted mb-10">
          This page doesn&apos;t exist, but great work does.
        </p>
        <Link
          href="/"
          className="px-7 py-3.5 rounded-full bg-brand text-white text-sm font-medium hover:bg-brand-dark transition-colors"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}
