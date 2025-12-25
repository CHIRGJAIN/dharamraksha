"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { Button } from "@/components/ui/button";
import { firmService } from "@/services/firm-service";
import { useToast } from "@/hooks/use-toast";
import { useAppStore } from "@/stores/app-store";

type Filter = {
  state?: string;
  court?: string;
};

export const FirmGrid = () => {
  const firms = useAppStore((s) => s.firms);
  const [filter, setFilter] = useState<Filter>({});
  const { success } = useToast();

  const filtered = useMemo(() => {
    return firms.filter((f) => {
      const byState = filter.state ? f.state === filter.state : true;
      const byCourt = filter.court ? f.courts.includes(filter.court) : true;
      return byState && byCourt;
    });
  }, [firms, filter]);

  const uniqueStates = Array.from(new Set(firms.map((f) => f.state)));
  const uniqueCourts = Array.from(new Set(firms.flatMap((f) => f.courts)));

  const request = (id: string) => {
    const firm = firmService.requestJoin(id);
    success(`Request sent to ${firm.name}. Awaiting approval.`);
  };

  const simulateApprove = (id: string) => {
    const firm = firmService.approveJoin(id);
    success(`Approval received. Joined ${firm.name}.`);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-3 md:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm text-[color:var(--ink-muted)]">
          State
          <select
            className="rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-primary)] px-3 py-2 text-[color:var(--ink-primary)] shadow-inner focus:border-[color:var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-primary)]/30"
            value={filter.state || ""}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, state: e.target.value || undefined }))
            }
          >
            <option value="">All states</option>
            {uniqueStates.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 text-sm text-[color:var(--ink-muted)]">
          Court
          <select
            className="rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-primary)] px-3 py-2 text-[color:var(--ink-primary)] shadow-inner focus:border-[color:var(--brand-primary)] focus:outline-none focus:ring-2 focus:ring-[color:var(--brand-primary)]/30"
            value={filter.court || ""}
            onChange={(e) =>
              setFilter((prev) => ({ ...prev, court: e.target.value || undefined }))
            }
          >
            <option value="">All courts</option>
            {uniqueCourts.map((court) => (
              <option key={court} value={court}>
                {court}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {filtered.map((firm) => (
          <Card
            key={firm.id}
            className="flex min-h-[360px] flex-col justify-between space-y-3 p-4"
          >
            <div className="space-y-3 flex-1 pr-1">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.25em] text-[color:var(--ink-muted)]">
                    {firm.district}, {firm.state}
                  </p>
                  <h3 className="text-lg font-semibold text-[color:var(--ink-primary)] leading-tight">
                    {firm.name}
                  </h3>
                  <p className="text-sm text-[color:var(--ink-muted)]">{firm.size}</p>
                </div>
                <Pill>{firm.practiceAreas[0]}</Pill>
              </div>
              <div className="flex flex-wrap gap-2">
                {firm.practiceAreas.map((area) => (
                  <Pill key={area}>{area}</Pill>
                ))}
              </div>
              <div className="space-y-1 text-sm text-[color:var(--ink-muted)]">
                <div className="font-semibold text-[color:var(--ink-primary)]">Courts</div>
                <div className="text-xs">{firm.courts.join(" • ")}</div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 pt-1">
              <Button
                size="sm"
                variant="primary"
                disabled={firm.joinStatus === "pending" || firm.joinStatus === "approved"}
                onClick={() => request(firm.id)}
              >
                {firm.joinStatus === "pending"
                  ? "Pending approval"
                  : firm.joinStatus === "approved"
                  ? "Joined"
                  : "Request to join"}
              </Button>
              {firm.joinStatus === "pending" && (
                <Button size="sm" variant="outline" onClick={() => simulateApprove(firm.id)}>
                  Simulate accept
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
