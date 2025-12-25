"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

const items = [
  {
    id: "f1",
    title: "Legal AI Core",
    summary: "3D halo diamond powering case intelligence and drafts.",
  },
  {
    id: "f2",
    title: "Network Graph",
    summary: "Map trusted peers with availability and conflict checks.",
  },
  {
    id: "f3",
    title: "Opportunities Hub",
    summary: "Curated matters routed with capability signals.",
  },
  {
    id: "f4",
    title: "Secure Rooms",
    summary: "Data rooms with governance guardrails and watermarking.",
  },
];

export const FeaturesGrid = () => {
  const [active, setActive] = useState<typeof items[0] | null>(null);

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2">
        {items.map((item) => (
          <Card key={item.id} className="space-y-2">
            <h3 className="text-lg font-semibold text-[color:var(--ink-primary)]">
              {item.title}
            </h3>
            <p className="text-sm text-[color:var(--ink-muted)]">{item.summary}</p>
            <Button variant="outline" size="sm" onClick={() => setActive(item)}>
              Expand
            </Button>
          </Card>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-lg rounded-3xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-primary)] p-6 shadow-2xl"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
                    Feature
                  </p>
                  <h3 className="text-xl font-semibold text-[color:var(--ink-primary)]">
                    {active.title}
                  </h3>
                </div>
                <button
                  aria-label="Close modal"
                  className="rounded-full border border-[color:var(--border-subtle)] p-2 hover:border-[color:var(--brand-primary)]"
                  onClick={() => setActive(null)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-3 text-sm text-[color:var(--ink-muted)]">
                {active.summary} Expandable cards animate into modals with layered glows
                and full detail views, keeping the GAF-grade glass aesthetic.
              </p>
              <div className="mt-4 flex gap-2">
                <Button>Try it</Button>
                <Button variant="outline" onClick={() => setActive(null)}>
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
