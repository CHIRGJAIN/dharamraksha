import { networkProfiles } from "@/data/mock-data";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { networkService } from "@/services/network-service";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export const NetworkGrid = () => {
  const router = useRouter();
  const { success } = useToast();

  const connect = (id: string) => {
    const convo = networkService.initiateCollaboration(id);
    router.push("/messages");
    success("Collaboration thread initiated in Messages.");
    return convo;
  };

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
      {networkProfiles.map((lawyer) => (
        <Card
          key={lawyer.id}
          className="flex min-h-[420px] flex-col justify-between rounded-[28px] bg-gradient-to-b from-[color:var(--surface-primary)]/95 via-[color:var(--surface-primary)]/90 to-[color:var(--surface-muted)]/80 p-5 shadow-2xl"
        >
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="h-16 w-10 rounded-full bg-gradient-to-b from-[color:var(--brand-primary)]/18 to-[color:var(--electric-cyan)]/14 border border-[color:var(--border-subtle)] shadow-inner" />
              <div>
                <p className="text-lg font-semibold text-[color:var(--ink-primary)] leading-tight">
                  {lawyer.name}
                </p>
                <p className="text-sm text-[color:var(--ink-muted)] leading-tight">
                  {lawyer.headline}
                </p>
                <div className="mt-1 flex items-center gap-1 text-sm text-[color:var(--ink-muted)]">
                  <MapPin className="h-4 w-4" />
                  {lawyer.location}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {lawyer.specialties.slice(0, 4).map((spec) => (
                <Pill key={spec} className="bg-[color:var(--surface-muted)]">
                  {spec}
                </Pill>
              ))}
            </div>

            <p className="text-sm text-[color:var(--ink-muted)]">
              Bar ID: {lawyer.barId} · {lawyer.availability}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 pt-2">
            <Link href={`/profile/${lawyer.id}`}>
              <Button variant="outline" size="sm">
                View profile
              </Button>
            </Link>
            <Button variant="primary" size="sm" onClick={() => connect(lawyer.id)}>
              Connect
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
};
