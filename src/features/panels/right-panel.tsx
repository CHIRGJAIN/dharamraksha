import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { events, news } from "@/data/mock-data";
import { ArrowRight } from "lucide-react";

export const RightPanel = () => {
  return (
    <div className="space-y-3">
      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
            News pulse
          </p>
          <Button variant="ghost" size="sm">
            View all <ArrowRight className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="space-y-2">
          {news.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)]/60 p-3"
            >
              <div className="flex items-center justify-between text-xs text-[color:var(--ink-muted)]">
                <span>{item.source}</span>
                <span>{item.time}</span>
              </div>
              <p className="text-sm font-semibold text-[color:var(--ink-primary)]">
                {item.title}
              </p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
            Upcoming rooms
          </p>
          <span className="rounded-full bg-[color:var(--brand-primary)]/15 px-3 py-1 text-xs text-[color:var(--brand-primary)]">
            Live
          </span>
        </div>
        <div className="space-y-2">
          {events.map((event) => (
            <div
              key={event.id}
              className="flex items-center justify-between rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)]/60 p-3"
            >
              <div>
                <p className="text-xs text-[color:var(--ink-muted)]">{event.date}</p>
                <p className="text-sm font-semibold text-[color:var(--ink-primary)]">
                  {event.title}
                </p>
              </div>
              <div className="text-xs text-[color:var(--ink-muted)]">{event.time}</div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
