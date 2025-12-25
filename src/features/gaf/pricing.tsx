"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const tiers = [
  { id: "starter", name: "Starter", price: 49, features: ["Network access", "Composer", "Alerts"] },
  { id: "pro", name: "Professional", price: 129, features: ["Full messaging", "Opportunities", "Rooms"], popular: true },
  { id: "enterprise", name: "Enterprise", price: 249, features: ["SSO", "API access", "Dedicated CSM"] },
];

export const Pricing = () => {
  const [yearly, setYearly] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm text-[color:var(--ink-muted)]">Monthly</span>
        <button
          onClick={() => setYearly((y) => !y)}
          className="relative h-9 w-16 rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)]"
        >
          <motion.div
            className="absolute top-1 h-7 w-7 rounded-full bg-gradient-to-r from-[color:var(--brand-primary)] to-[color:var(--brand-primary-dark)] shadow-lg"
            animate={{ x: yearly ? 36 : 2 }}
            transition={{ type: "spring", stiffness: 300, damping: 24 }}
          />
        </button>
        <span className="text-sm text-[color:var(--ink-muted)]">Yearly (-15%)</span>
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {tiers.map((tier) => (
          <Card
            key={tier.id}
            className={`relative space-y-3 ${tier.popular ? "glow-border" : ""}`}
          >
            {tier.popular && (
              <span className="absolute right-4 top-4 rounded-full bg-[color:var(--electric-cyan)]/20 px-3 py-1 text-xs text-[color:var(--electric-cyan)]">
                Popular
              </span>
            )}
            <h3 className="text-lg font-semibold text-[color:var(--ink-primary)]">
              {tier.name}
            </h3>
            <p className="text-3xl font-semibold text-[color:var(--ink-primary)]">
              ${yearly ? Math.round(tier.price * 12 * 0.85) : tier.price}
              <span className="text-sm text-[color:var(--ink-muted)]">
                /{yearly ? "yr" : "mo"}
              </span>
            </p>
            <ul className="space-y-1 text-sm text-[color:var(--ink-muted)]">
              {tier.features.map((f) => (
                <li key={f}>• {f}</li>
              ))}
            </ul>
            <Button variant={tier.popular ? "primary" : "outline"}>Choose {tier.name}</Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
