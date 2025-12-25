'use client';

import { useState } from "react";
import { AppShell } from "@/components/shell/app-shell";
import { LeftPanel } from "@/features/panels/left-panel";
import { RightPanel } from "@/features/panels/right-panel";
import { Hero } from "@/features/home/hero";
import { Insights } from "@/features/home/insights";
import { Composer } from "@/features/feed/composer";
import { FeedList } from "@/features/feed/feed-list";

export default function Home() {
  const [focusComposer, setFocusComposer] = useState<(() => void) | null>(null);

  return (
    <AppShell left={<LeftPanel />} right={<RightPanel />}>
      <div className="space-y-4">
        <Hero onDraftFocus={() => focusComposer?.()} />
        <Insights />
        <Composer registerFocus={(fn) => setFocusComposer(() => fn)} />
        <FeedList />
      </div>
    </AppShell>
  );
}
