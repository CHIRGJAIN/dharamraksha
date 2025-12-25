import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
  padding?: string;
};

export const Card = ({ children, className, padding = "p-4" }: CardProps) => (
  <div
    className={cn(
      "glass-panel tilt-hover rounded-3xl border border-[color:var(--border-subtle)] bg-gradient-to-br from-[color:var(--surface-primary)]/92 to-[color:var(--surface-muted)]/80",
      padding,
      className
    )}
  >
    {children}
  </div>
);
