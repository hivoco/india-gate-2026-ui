import Link from "next/link";
import { Button } from "./components/ui/button";
import QuatrefoilPattern from "./components/QuatrefoilPattern";

// app router 404. renders for any unknown route or a notFound() call.
export default function NotFound() {
  return (
    <main className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-6 py-20">
      <QuatrefoilPattern
        image="/quatrefoil-pattern.png"
        className="opacity-[0.06]"
      />

      <div className="custom-container flex flex-col items-center text-center">
        <p className="font-display text-7xl text-secondary sm:text-8xl">404</p>

        <h1 className="mt-4 font-display text-2xl text-primary sm:text-3xl">
          this page slipped out of the pot
        </h1>

        <p className="mt-3 max-w-md text-sm text-black/70 sm:text-base">
          the page you are looking for has moved or never existed. let us get
          you back to something delicious.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/">back to home</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/products/classic">explore the classic range</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
