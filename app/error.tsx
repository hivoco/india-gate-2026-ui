"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "./components/ui/button";
import QuatrefoilPattern from "./components/QuatrefoilPattern";

// route level error boundary. catches render errors in a segment and gives the
// user a retry via reset(). must be a client component. does not catch errors
// in the root layout, global-error.tsx handles those.
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // log the error so it shows up in the console for debugging
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6 py-20">
      <QuatrefoilPattern
        image="/quatrefoil-pattern.png"
        className="opacity-[0.06]"
      />

      <div className="custom-container flex flex-col items-center text-center">
        <h1 className="font-display text-2xl text-primary sm:text-3xl">
          something went off the boil
        </h1>

        <p className="mt-3 max-w-md text-sm text-black/70 sm:text-base">
          we hit an unexpected error while loading this page. give it another
          try in a moment.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button size="lg" onClick={reset}>
            try again
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/">back to home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
