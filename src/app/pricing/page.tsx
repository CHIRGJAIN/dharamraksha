'use client';

import { AppShell } from "@/components/shell/app-shell";
import { Pricing } from "@/features/gaf/pricing";

export default function PricingPage() {
  return (
    <AppShell>
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
            Pricing
          </p>
          <h1 className="text-2xl font-semibold text-[color:var(--ink-primary)]">
            Choose your LexLink workspace
          </h1>
        </div>
        <Pricing />
      </div>
    </AppShell>
  );
}
