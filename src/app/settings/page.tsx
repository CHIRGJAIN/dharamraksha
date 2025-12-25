'use client';

import { AppShell } from "@/components/shell/app-shell";
import { SettingsForm } from "@/features/settings/settings-form";

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
            Settings
          </p>
          <h1 className="text-2xl font-semibold text-[color:var(--ink-primary)]">
            Workspace preferences
          </h1>
        </div>
        <SettingsForm />
      </div>
    </AppShell>
  );
}
