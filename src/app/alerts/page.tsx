'use client';

import { AppShell } from "@/components/shell/app-shell";
import { AlertsPanel } from "@/features/alerts/alerts-panel";

export default function AlertsPage() {
  return (
    <AppShell>
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
            Alerts
          </p>
          <h1 className="text-2xl font-semibold text-[color:var(--ink-primary)]">
            Compliance, case, and network alerts
          </h1>
        </div>
        <AlertsPanel />
      </div>
    </AppShell>
  );
}
