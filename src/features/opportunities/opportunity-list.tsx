"use client";

import { useAppStore } from "@/stores/app-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { copyToClipboard } from "@/lib/utils";

export const OpportunityList = () => {
  const opportunities = useAppStore((s) => s.opportunities);
  const submitOpportunity = useAppStore((s) => s.submitOpportunity);
  const { success } = useToast();

  const submit = (id: string) => {
    submitOpportunity(id);
    success("Capability statement submitted.");
  };

  const share = (heading: string) => {
    copyToClipboard(`Opportunity: ${heading} via LexLink`);
    success("Brief copied…");
  };

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {opportunities.map((opp) => (
        <Card key={opp.id} className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-[color:var(--ink-primary)]">
              {opp.heading}
            </h3>
            <span className="rounded-full bg-[color:var(--brand-primary)]/15 px-3 py-1 text-xs text-[color:var(--brand-primary)]">
              {opp.budget}
            </span>
          </div>
          <p className="text-sm text-[color:var(--ink-muted)]">{opp.due}</p>
          <div className="flex flex-wrap gap-2">
            <Button
              variant="primary"
              size="sm"
              disabled={opp.submitted}
              onClick={() => submit(opp.id)}
            >
              {opp.submitted ? "Submitted" : "Submit capability statement"}
            </Button>
            <Button variant="outline" size="sm" onClick={() => share(opp.heading)}>
              Share with partner
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
