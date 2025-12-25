'use client';

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[color:var(--bg-gradient)] px-4 text-center">
      <div className="rounded-3xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-primary)] p-8 shadow-2xl">
        <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
          404
        </p>
        <h1 className="text-3xl font-semibold text-[color:var(--ink-primary)]">
          Page not found
        </h1>
        <p className="text-sm text-[color:var(--ink-muted)]">
          The route you’re looking for doesn’t exist. Return to the LexLink home.
        </p>
        <Link href="/">
          <Button className="mt-4">Back to home</Button>
        </Link>
      </div>
    </div>
  );
}
