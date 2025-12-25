import { Card } from "@/components/ui/card";
import { ArrowUpRight, Activity } from "lucide-react";

export const Insights = () => (
  <div className="grid gap-4 md:grid-cols-2">
    <Card className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[color:var(--ink-primary)]">
          Engagement pulse
        </p>
        <ArrowUpRight className="h-4 w-4 text-[color:var(--ink-muted)]" />
      </div>
      <p className="text-3xl font-semibold text-[color:var(--ink-primary)]">+38%</p>
      <p className="text-sm text-[color:var(--ink-muted)]">
        Week-over-week increase on briefs, consultations, and message replies.
      </p>
    </Card>
    <Card className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-[color:var(--ink-primary)]">
          Network quality
        </p>
        <Activity className="h-4 w-4 text-[color:var(--ink-muted)]" />
      </div>
      <p className="text-3xl font-semibold text-[color:var(--ink-primary)]">92</p>
      <p className="text-sm text-[color:var(--ink-muted)]">
        Focused connections responding within 6 hours—keep the streak.
      </p>
    </Card>
  </div>
);
