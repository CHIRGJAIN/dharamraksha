"use client";

import { useAppStore } from "@/stores/app-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { useToast } from "@/hooks/use-toast";

export const AlertsPanel = () => {
  const alerts = useAppStore((s) => s.alerts);
  const markAlertDone = useAppStore((s) => s.markAlertDone);
  const { success } = useToast();

  const clear = (id: string) => {
    markAlertDone(id);
    success("Alert cleared. Logged in your activity timeline.");
  };

  if (!alerts.length) {
    return (
      <Card className="text-center text-sm text-[color:var(--ink-muted)]">
        All clear—no active alerts.
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {alerts.map((alert) => (
        <Card key={alert.id} className="space-y-2">
          <div className="flex items-center justify-between">
            <Pill>{alert.type}</Pill>
            <Button variant="outline" size="sm" onClick={() => clear(alert.id)}>
              Mark done
            </Button>
          </div>
          <h3 className="text-lg font-semibold text-[color:var(--ink-primary)]">
            {alert.title}
          </h3>
          <p className="text-sm text-[color:var(--ink-muted)]">{alert.detail}</p>
        </Card>
      ))}
    </div>
  );
};
