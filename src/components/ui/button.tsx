import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  pill?: boolean;
};

const sizes = {
  sm: "px-3 py-1.5 text-xs",
  md: "px-4 py-2 text-sm",
  lg: "px-5 py-3 text-base",
};

export const Button = forwardRef<HTMLButtonElement, Props>(
  ({ variant = "primary", size = "md", pill = true, className, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center gap-2 transition-transform duration-150 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-primary)]",
        pill ? "rounded-full" : "rounded-2xl",
        sizes[size],
        variant === "primary" &&
          "bg-gradient-to-r from-[color:var(--brand-primary)] to-[color:var(--brand-primary-dark)] text-white shadow-lg hover:-translate-y-[1px]",
        variant === "outline" &&
          "border border-[color:var(--border-subtle)] bg-[color:var(--surface-primary)] text-[color:var(--ink-primary)] hover:border-[color:var(--brand-primary)]/60",
        variant === "ghost" &&
          "text-[color:var(--ink-primary)] hover:bg-[color:var(--surface-muted)]/80",
        className
      )}
      {...props}
    />
  )
);

Button.displayName = "Button";
