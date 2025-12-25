"use client";

import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Sparkles, PenLine } from "lucide-react";
import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LegalCore = dynamic(
  () => import("@/components/three/legal-core").then((m) => m.LegalCore),
  { ssr: false, loading: () => <div className="h-[320px] w-full rounded-3xl bg-[color:var(--surface-muted)]" /> }
);

type Props = {
  onDraftFocus?: () => void;
};

export const Hero = ({ onDraftFocus }: Props) => {
  const router = useRouter();
  const { success } = useToast();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.to(".lexlink-glow", {
        y: 6,
        duration: 6,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
      gsap.to(".hero-parallax", {
        yPercent: -8,
        ease: "none",
        scrollTrigger: {
          trigger: ".hero-parallax",
          start: "top bottom",
          scrub: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const schedule = () => {
    router.push("/network");
    success("Opening your curated network to schedule a consult.");
  };

  const draft = () => {
    onDraftFocus?.();
    success("Composer focused…");
  };

  return (
    <section className="hero-parallax relative overflow-hidden rounded-3xl border border-[color:var(--border-subtle)] bg-gradient-to-br from-[color:var(--surface-primary)]/90 via-[color:var(--surface-muted)]/70 to-[color:var(--surface-primary)] p-6 shadow-2xl">
      <div className="absolute inset-0 lexlink-glow">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.3),transparent_40%),radial-gradient(circle_at_80%_0%,rgba(227,106,46,0.35),transparent_35%)]" />
      </div>
      <div className="relative grid gap-6 lg:grid-cols-2 items-center">
        <div className="space-y-4">
          <p className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)] px-3 py-1 text-xs text-[color:var(--ink-muted)]">
            <Sparkles className="h-4 w-4" />
            Premium legal network, GAF-grade UI
          </p>
          <h1 className="text-3xl font-semibold leading-tight text-[color:var(--ink-primary)] sm:text-4xl">
            LexLink is your legal collaboration cockpit—network, messaging, briefs, and alerts in one futuristic workspace.
          </h1>
          <p className="text-base text-[color:var(--ink-muted)]">
            Orchestrate opportunities, publish insights, and align global teams with glassmorphic UI, neon glows, and 3D legal AI core.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button onClick={schedule} size="lg">
              Schedule consult
            </Button>
            <Button variant="outline" size="lg" onClick={draft}>
              <PenLine className="h-4 w-4" /> Draft new note
            </Button>
          </div>
        </div>
        <div className="rounded-3xl bg-[color:var(--surface-muted)]/60 p-4">
          <LegalCore />
        </div>
      </div>
    </section>
  );
};
