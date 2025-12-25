'use client';

import { AppShell } from "@/components/shell/app-shell";
import { OpportunityList } from "@/features/opportunities/opportunity-list";

export default function OpportunitiesPage() {
  return (
    <AppShell>
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
            Opportunities
          </p>
          <h1 className="text-2xl font-semibold text-[color:var(--ink-primary)]">
            Curated briefs and budgets
          </h1>
        </div>
        <OpportunityList />
      </div>
    </AppShell>
  );
}
