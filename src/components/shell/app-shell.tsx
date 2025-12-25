"use client";

import { ReactNode } from "react";
import { Header } from "./header";
import { FloatingDock } from "@/features/messaging/floating-dock";

type Props = {
  left?: ReactNode;
  right?: ReactNode;
  children: ReactNode;
};

export const AppShell = ({ left, right, children }: Props) => {
  return (
    <div className="min-h-screen bg-[color:var(--bg-gradient)]">
      <Header />
      <div className="mx-auto flex max-w-6xl gap-6 px-4 pb-20 pt-6">
        {left ? (
          <aside className="hidden lg:block lg:w-[260px]">
            <div className="sticky top-24 space-y-4">{left}</div>
          </aside>
        ) : null}

        <main className="flex-1 min-w-0">{children}</main>

        {right ? (
          <aside className="hidden xl:block xl:w-[300px]">
            <div className="sticky top-24 space-y-4">{right}</div>
          </aside>
        ) : null}
      </div>
      <FloatingDock />
    </div>
  );
};
