'use client';

import { AppShell } from "@/components/shell/app-shell";
import { FeaturesGrid } from "@/features/gaf/features-grid";

export default function FeaturesPage() {
  return (
    <AppShell>
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
            Product
          </p>
          <h1 className="text-2xl font-semibold text-[color:var(--ink-primary)]">
            GAF-grade capabilities
          </h1>
        </div>
        <FeaturesGrid />
      </div>
    </AppShell>
  );
}
