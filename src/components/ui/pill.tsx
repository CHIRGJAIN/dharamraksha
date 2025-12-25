import { ReactNode, HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type Props = HTMLAttributes<HTMLSpanElement> & {
  children: ReactNode;
  className?: string;
  active?: boolean;
};

export const Pill = ({ children, className, active, ...rest }: Props) => (
  <span
    className={cn(
      "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
      active
        ? "border-[color:var(--brand-primary)] bg-[color:var(--surface-muted)] text-[color:var(--ink-primary)]"
        : "border-[color:var(--border-subtle)] bg-[color:var(--surface-primary)] text-[color:var(--ink-muted)] hover:border-[color:var(--brand-primary)]/60",
      className
    )}
    role="button"
    tabIndex={0}
    {...rest}
  >
    {children}
  </span>
);
