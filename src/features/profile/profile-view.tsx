"use client";

import { LawyerProfile } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { Button } from "@/components/ui/button";
import { downloadText } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useMemo, useState } from "react";
import { messageService } from "@/services/message-service";
import { useRouter } from "next/navigation";
import { Globe2, Link as LinkIcon, MapPin, Phone, ShieldCheck } from "lucide-react";

type Props = {
  profile: LawyerProfile;
};

export const ProfileView = ({ profile }: Props) => {
  const { success } = useToast();
  const [requested, setRequested] = useState(false);
  const router = useRouter();
  const timeline = useMemo(
    () => [
      {
        title: profile.matters[0] || "Flagship matter",
        detail: "Lead counsel · Cross-border execution",
      },
      {
        title: profile.recognitions[0] || "Recognition",
        detail: "Industry accolade · Thought leadership",
      },
      {
        title: profile.education[0] || "Education",
        detail: "Foundation & specialization",
      },
    ],
    [profile]
  );

  const download = () => {
    downloadText(
      `${profile.name}-lexlink.txt`,
      `${profile.name} • ${profile.headline}\nLocation: ${profile.location}\nSpecialties: ${profile.specialties.join(", ")}\nExperience: ${profile.experience}\nLanguages: ${profile.languages.join(", ")}`
    );
    success("Profile downloaded.");
  };

  const bookConsult = () => {
    const convo = messageService.startConversation(profile.id, "Consultation request");
    messageService.send(
      convo.id,
      "Can we schedule a consult next week? Sharing availability now."
    );
    router.push("/messages");
    success("Consultation thread opened in Messages.");
  };

  const requestIntro = () => {
    setRequested(true);
    const convo = messageService.startConversation(profile.id, "Intro call");
    messageService.send(convo.id, "Requesting intro call to explore a matter.");
    router.push("/messages");
    success("Intro call thread opened.");
  };

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-3xl border border-[color:var(--border-subtle)] bg-gradient-to-br from-[color:var(--brand-primary)]/30 via-[color:var(--electric-cyan)]/20 to-[color:var(--surface-primary)] p-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_10%,rgba(255,255,255,0.3),transparent_30%),radial-gradient(circle_at_90%_10%,rgba(255,255,255,0.2),transparent_30%)]" />
        <div className="relative flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-3xl border border-white/50 bg-white/60 backdrop-blur" />
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/80">Profile</p>
              <h1 className="text-2xl font-semibold text-white">{profile.name}</h1>
              <p className="text-white/80">{profile.headline}</p>
              <div className="flex flex-wrap gap-2 text-xs text-white/80">
                <Pill className="bg-white/20 text-white">Bar {profile.barId}</Pill>
                <Pill className="bg-white/20 text-white">{profile.experience}</Pill>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button onClick={download}>Download profile</Button>
            <Button variant="outline" onClick={bookConsult}>
              Book consultation
            </Button>
            <Button variant="outline" disabled={requested} onClick={requestIntro}>
              {requested ? "Intro requested" : "Request intro call"}
            </Button>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="space-y-2 md:col-span-2">
          <h2 className="text-lg font-semibold text-[color:var(--ink-primary)]">
            Practice snapshot
          </h2>
          <div className="flex flex-wrap gap-2">
            {profile.specialties.map((s) => (
              <Pill key={s}>{s}</Pill>
            ))}
          </div>
          <p className="text-sm text-[color:var(--ink-muted)]">
            Availability: {profile.availability} · Languages: {profile.languages.join(", ")}
          </p>
          <p className="text-sm text-[color:var(--ink-muted)]">
            Clients: {profile.clients.join(", ")}
          </p>
          <p className="text-sm text-[color:var(--ink-muted)]">
            Engagements: {profile.engagement.join(", ")}
          </p>
        </Card>
        <Card className="space-y-2">
          <h3 className="text-sm font-semibold text-[color:var(--ink-primary)]">
            Contact & links
          </h3>
          <div className="space-y-2 text-sm text-[color:var(--ink-muted)]">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              {profile.location}
            </div>
            <div className="flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Office hours: {profile.availability}
            </div>
            <div className="flex items-center gap-2">
              <Globe2 className="h-4 w-4" />
              Languages: {profile.languages.join(", ")}
            </div>
            <div className="flex items-center gap-2">
              <LinkIcon className="h-4 w-4" />
              LinkedIn / Calendly (mock)
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="space-y-2">
          <h3 className="text-sm font-semibold text-[color:var(--ink-primary)]">
            Recognition & memberships
          </h3>
          <ul className="list-disc space-y-1 pl-4 text-sm text-[color:var(--ink-muted)]">
            {profile.recognitions.map((r) => (
              <li key={r}>{r}</li>
            ))}
            {profile.memberships.map((m) => (
              <li key={m}>{m}</li>
            ))}
          </ul>
        </Card>
        <Card className="space-y-2">
          <h3 className="text-sm font-semibold text-[color:var(--ink-primary)]">
            Signature matters
          </h3>
          <div className="flex flex-wrap gap-2">
            {profile.matters.map((m) => (
              <Pill key={m}>{m}</Pill>
            ))}
          </div>
        </Card>
      </div>

      <Card className="space-y-3">
        <h3 className="text-sm font-semibold text-[color:var(--ink-primary)]">
          Experience timeline & publications
        </h3>
        <div className="grid gap-3 md:grid-cols-3">
          {timeline.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)]/60 p-3"
            >
              <div className="flex items-center gap-2 text-xs text-[color:var(--ink-muted)]">
                <ShieldCheck className="h-4 w-4" />
                Milestone
              </div>
              <p className="text-sm font-semibold text-[color:var(--ink-primary)]">
                {item.title}
              </p>
              <p className="text-xs text-[color:var(--ink-muted)]">{item.detail}</p>
            </div>
          ))}
        </div>
        <p className="text-sm text-[color:var(--ink-muted)]">
          Education: {profile.education.join(", ")}
        </p>
        <div className="space-y-1 text-sm text-[color:var(--ink-muted)]">
          {profile.publications.map((p) => (
            <a key={p.title} href={p.link} className="underline">
              {p.title}
            </a>
          ))}
        </div>
        {profile.proBono?.length ? (
          <p className="text-sm text-[color:var(--ink-muted)]">
            Pro bono: {profile.proBono.join(", ")}
          </p>
        ) : null}
      </Card>
    </div>
  );
};
