'use client';

import { AppShell } from "@/components/shell/app-shell";
import { LeftPanel } from "@/features/panels/left-panel";
import { RightPanel } from "@/features/panels/right-panel";
import { NetworkGrid } from "@/features/network/network-grid";
import { FirmGrid } from "@/features/network/firm-grid";

export default function NetworkPage() {
  return (
    <AppShell left={<LeftPanel />} right={<RightPanel />}>
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
              Network
            </p>
            <h1 className="text-2xl font-semibold text-[color:var(--ink-primary)]">
              Curated legal experts
            </h1>
          </div>
        </div>
        <NetworkGrid />

        <div className="space-y-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
              Firms by state · district · court
            </p>
            <h2 className="text-xl font-semibold text-[color:var(--ink-primary)]">
              Join region-specific chambers and panels
            </h2>
            <p className="text-sm text-[color:var(--ink-muted)]">
              Request to join a firm; once accepted, membership unlocks collaboration and routing.
            </p>
          </div>
          <FirmGrid />
        </div>
      </div>
    </AppShell>
  );
}
