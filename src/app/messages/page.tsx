'use client';

import { AppShell } from "@/components/shell/app-shell";
import { MessagesWorkspace } from "@/features/messaging/messages-workspace";

export default function MessagesPage() {
  return (
    <AppShell>
      <div className="space-y-4">
        <div>
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
            Messages
          </p>
          <h1 className="text-2xl font-semibold text-[color:var(--ink-primary)]">
            Secure collaboration threads
          </h1>
        </div>
        <MessagesWorkspace />
      </div>
    </AppShell>
  );
}
