'use client';

import { AppShell } from "@/components/shell/app-shell";
import { LeftPanel } from "@/features/panels/left-panel";
import { RightPanel } from "@/features/panels/right-panel";
import { FirmGrid } from "@/features/network/firm-grid";

export default function FirmsPage() {
  return (
    <AppShell left={<LeftPanel />} right={<RightPanel />}>
      <div className="space-y-6">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
            Firms
          </p>
          <h1 className="text-2xl font-semibold text-[color:var(--ink-primary)]">
            Join region-specific firms and chambers
          </h1>
          <p className="text-sm text-[color:var(--ink-muted)]">
            Explore firms by state, district, and court. Request membership; once approved you gain access to collaboration and routing inside that firm.
          </p>
        </div>
        <FirmGrid />
      </div>
    </AppShell>
  );
}
