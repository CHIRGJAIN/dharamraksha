"use client";

import { useAppStore } from "@/stores/app-store";
import { FeedCard } from "./feed-card";

export const FeedList = () => {
  const feed = useAppStore((s) => s.feed);

  return (
    <div className="space-y-4">
      {feed.map((post) => (
        <FeedCard key={post.id} post={post} />
      ))}
    </div>
  );
};
