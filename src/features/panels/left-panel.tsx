import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { currentUser, networkProfiles } from "@/data/mock-data";
import { Button } from "@/components/ui/button";
import { MapPin, Sparkles, BarChart2, Clock } from "lucide-react";

export const LeftPanel = () => {
  const featured = networkProfiles[0];
  return (
    <div className="space-y-3">
      <Card className="space-y-4">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[color:var(--brand-primary)]/60 via-[color:var(--electric-cyan)]/40 to-[color:var(--surface-muted)] p-4">
          <div className="absolute inset-0 opacity-50 blur-3xl bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.3),transparent_40%)]" />
          <div className="relative flex items-center gap-3">
            <div className="h-14 w-14 rounded-2xl border border-white/30 bg-white/40 backdrop-blur text-lg font-semibold text-[color:var(--ink-primary)] flex items-center justify-center">
              LL
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/80">
                Profile
              </p>
              <p className="text-lg font-semibold text-white">{currentUser.name}</p>
              <p className="text-sm text-white/80">{currentUser.headline}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {["Briefings", "Visibility", "Alerts"].map((label) => (
            <Pill key={label} className="bg-[color:var(--surface-muted)]">
              <Sparkles className="h-3.5 w-3.5" />
              {label}
            </Pill>
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2 rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)]/60 p-3 text-xs text-[color:var(--ink-muted)]">
          <div>
            <div className="text-[color:var(--ink-primary)] font-semibold">12</div>
            briefings
          </div>
          <div>
            <div className="text-[color:var(--ink-primary)] font-semibold">4.2k</div>
            views
          </div>
          <div>
            <div className="text-[color:var(--ink-primary)] font-semibold">7</div>
            alerts
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <BarChart2 className="h-4 w-4" /> Open analytics
          </Button>
          <Button variant="outline" size="sm">
            <Clock className="h-4 w-4" /> Availability
          </Button>
        </div>
      </Card>

      <Card className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
              Featured
            </p>
            <p className="text-sm font-semibold text-[color:var(--ink-primary)]">
              {featured.name}
            </p>
          </div>
          <span className="rounded-full bg-[color:var(--brand-primary)]/15 px-3 py-1 text-xs text-[color:var(--brand-primary)]">
            Signal
          </span>
        </div>
        <p className="text-sm text-[color:var(--ink-muted)]">{featured.headline}</p>
        <div className="flex items-center gap-2 text-xs text-[color:var(--ink-muted)]">
          <MapPin className="h-3.5 w-3.5" />
          {featured.location}
        </div>
        <div className="flex flex-wrap gap-2">
          {featured.specialties.slice(0, 4).map((item) => (
            <Pill key={item}>{item}</Pill>
          ))}
        </div>
      </Card>
    </div>
  );
};
