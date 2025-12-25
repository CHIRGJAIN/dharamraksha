"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export const SettingsForm = () => {
  const [saved, setSaved] = useState(false);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <Card>
      <form className="space-y-3" onSubmit={onSubmit}>
        <div>
          <label className="text-xs text-[color:var(--ink-muted)]">Display name</label>
          <Input defaultValue="Avery Singh" required />
        </div>
        <div>
          <label className="text-xs text-[color:var(--ink-muted)]">Practice focus</label>
          <Input defaultValue="Cross-border transactions" required />
        </div>
        <div>
          <label className="text-xs text-[color:var(--ink-muted)]">Jurisdiction</label>
          <Input defaultValue="IN / SG" required />
        </div>
        <div>
          <label className="text-xs text-[color:var(--ink-muted)]">Fee range</label>
          <Input defaultValue="$300-450/hr" required />
        </div>
        <p className="text-xs text-[color:var(--ink-muted)]">
          Workspace ID: LXLNK-4482 · Region: APAC
        </p>
        <Button type="submit">Save preferences</Button>
        {saved && (
          <div className="rounded-2xl border border-[color:var(--brand-primary)] bg-[color:var(--brand-primary)]/10 px-3 py-2 text-sm text-[color:var(--ink-primary)]">
            Preferences saved
          </div>
        )}
      </form>
    </Card>
  );
};
