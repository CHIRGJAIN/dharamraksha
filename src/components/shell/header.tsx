"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BriefcaseBusiness,
  Home,
  MessageSquare,
  Moon,
  Search,
  Sun,
  UserRound,
  Users,
} from "lucide-react";
import { useThemeMode } from "@/hooks/use-theme";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/network", label: "Network", icon: Users },
  { href: "/firms", label: "Firms", icon: BriefcaseBusiness },
  { href: "/messages", label: "Messages", icon: MessageSquare, badge: "3" },
  { href: "/opportunities", label: "Opportunities", icon: BriefcaseBusiness },
  { href: "/alerts", label: "Alerts", icon: Bell, badge: "2" },
  { href: "/profile/me", label: "Profile", icon: UserRound },
];

export const Header = () => {
  const pathname = usePathname();
  const { theme, toggleTheme } = useThemeMode();

  return (
    <header className="sticky top-0 z-30 border-b border-[color:var(--border-subtle)]/60 backdrop-blur-xl bg-[color:var(--bg-primary)]/60">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="relative h-10 w-10">
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-[color:var(--brand-primary)] to-[color:var(--brand-primary-dark)] blur-[2px]" />
            <div className="absolute inset-[3px] rounded-xl bg-[color:var(--surface-primary)] border border-[color:var(--border-subtle)] shadow-lg animate-pulse" />
            <div className="absolute inset-[6px] rounded-lg border border-[color:var(--electric-cyan)]/40 rotate-6" />
          </div>
          <div className="leading-tight">
            <div className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
              LexLink
            </div>
            <div className="text-sm font-semibold text-[color:var(--ink-primary)]">
              Legal Collaboration Network
            </div>
          </div>
        </div>

        <div className="hidden flex-1 items-center gap-3 sm:flex">
          <div className="relative w-full max-w-xl">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--ink-muted)]" />
            <input
              className="w-full rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)]/80 px-10 py-2 text-sm text-[color:var(--ink-primary)] outline-none focus:border-[color:var(--brand-primary)] focus:ring-2 focus:ring-[color:var(--brand-primary)]/40"
              placeholder="Search matters, people, opportunities..."
            />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="flex items-center gap-2 rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)] px-3 py-2 text-sm text-[color:var(--ink-primary)] transition hover:-translate-y-0.5 hover:shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-primary)]"
          >
            {theme === "light" ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
            <span className="hidden sm:inline">{theme === "light" ? "Light" : "Dark"}</span>
          </button>
        </div>
      </div>

      <nav className="mx-auto flex max-w-6xl items-center gap-2 overflow-x-auto px-4 pb-3 sm:pb-4">
        {navItems.map((item) => {
          const active =
            pathname === item.href ||
            (item.href !== "/" && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition-colors",
                active
                  ? "border-[color:var(--brand-primary)] bg-[color:var(--surface-muted)] text-[color:var(--ink-primary)] shadow"
                  : "border-[color:var(--border-subtle)] bg-[color:var(--surface-primary)]/70 text-[color:var(--ink-muted)] hover:border-[color:var(--brand-primary)]/60"
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="hidden sm:inline">{item.label}</span>
              {item.badge ? (
                <span className="rounded-full bg-[color:var(--brand-primary)] px-2 py-0.5 text-xs text-white">
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>
    </header>
  );
};
