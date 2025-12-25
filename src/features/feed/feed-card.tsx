"use client";

import { useMemo, useState } from "react";
import { Post } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Pill } from "@/components/ui/pill";
import { feedService } from "@/services/feed-service";
import { networkProfiles, currentUser } from "@/data/mock-data";
import { copyToClipboard, cn } from "@/lib/utils";
import { messageService } from "@/services/message-service";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { Bookmark, MessageCircle, Share2, ThumbsUp } from "lucide-react";

type Props = {
  post: Post;
};

export const FeedCard = ({ post }: Props) => {
  const authors = useMemo(
    () => [...networkProfiles, { id: currentUser.id, name: currentUser.name, headline: currentUser.headline, location: currentUser.location, avatar: currentUser.avatar, specialties: [], barId: "", availability: "", experience: "", languages: [], clients: [], engagement: [], recognitions: [], memberships: [], matters: [], education: [], publications: [] }],
    []
  );
  const author = authors.find((a) => a.id === post.authorId)!;
  const router = useRouter();
  const { success } = useToast();
  const [commentDraft, setCommentDraft] = useState("");

  const onLike = () => feedService.toggleLike(post.id);
  const onSave = () => feedService.toggleSave(post.id);
  const onComment = () => {
    if (!commentDraft.trim()) return;
    const stamp = feedService.comment(post.id, commentDraft.trim());
    setCommentDraft("");
    success(`Comment added at ${stamp}`);
  };

  const onShare = () => {
    copyToClipboard(`${post.title} • LexLink • #${post.id}`);
  };

  const onMessage = () => {
    const convo = messageService.startConversation(
      author.id,
      "Follow-up on your LexLink post"
    );
    messageService.send(
      convo.id,
      "Saw your update—can we explore this together next week?"
    );
    router.push("/messages");
    success("Conversation opened in Messages.");
  };

  return (
    <div className="rounded-3xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-primary)] p-5 shadow-lg space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)]" />
          <div>
            <p className="text-sm font-semibold text-[color:var(--ink-primary)]">
              {author?.name}
            </p>
            <p className="text-xs text-[color:var(--ink-muted)]">{author?.headline}</p>
            <p className="text-xs text-[color:var(--ink-muted)]">{post.createdAt}</p>
          </div>
        </div>
        <Pill>{post.category}</Pill>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-[color:var(--ink-primary)]">
          {post.title}
        </h3>
        <p className="text-sm text-[color:var(--ink-muted)]">{post.summary}</p>
      </div>

      <div className="flex flex-wrap gap-2">
        {post.tags.map((tag) => (
          <Pill key={tag}>{tag}</Pill>
        ))}
      </div>

      {post.attachments?.length ? (
        <div className="flex flex-wrap gap-2 text-xs text-[color:var(--ink-muted)]">
          {post.attachments.map((att) => (
            <span
              key={att.id}
              className="rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)] px-3 py-1"
            >
              {att.label}
            </span>
          ))}
        </div>
      ) : null}

      <div className="flex items-center gap-3 text-sm text-[color:var(--ink-muted)]">
        <button
          onClick={onLike}
          className={cn(
            "flex items-center gap-2 rounded-full border px-3 py-1.5 transition",
            post.liked
              ? "border-[color:var(--brand-primary)] text-[color:var(--brand-primary)] bg-[color:var(--surface-muted)]"
              : "border-[color:var(--border-subtle)] hover:border-[color:var(--brand-primary)]/50"
          )}
        >
          <ThumbsUp className="h-4 w-4" /> {post.likes}
        </button>
        <span className="flex items-center gap-1 rounded-full border border-[color:var(--border-subtle)] px-3 py-1.5">
          <MessageCircle className="h-4 w-4" /> {post.comments.length} comments
        </span>
        <button
          onClick={onSave}
          className={cn(
            "flex items-center gap-2 rounded-full border px-3 py-1.5 transition",
            post.saved
              ? "border-[color:var(--brand-primary)] text-[color:var(--brand-primary)]"
              : "border-[color:var(--border-subtle)] hover:border-[color:var(--brand-primary)]/50"
          )}
        >
          <Bookmark className="h-4 w-4" /> Save
        </button>
        <button
          onClick={onShare}
          className="flex items-center gap-2 rounded-full border border-[color:var(--border-subtle)] px-3 py-1.5 hover:border-[color:var(--brand-primary)]/50"
        >
          <Share2 className="h-4 w-4" /> Share
        </button>
        <Button variant="outline" size="sm" onClick={onMessage}>
          Message author
        </Button>
      </div>

      <div className="space-y-2 rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)]/60 p-3">
        {post.comments.length === 0 ? (
          <p className="text-sm text-[color:var(--ink-muted)]">
            Be the first to comment with a quick note.
          </p>
        ) : (
          post.comments.map((c) => (
            <div key={c.id} className="text-sm text-[color:var(--ink-muted)]">
              <span className="font-semibold text-[color:var(--ink-primary)]">
                {authors.find((a) => a.id === c.authorId)?.name || "Legal peer"}
              </span>{" "}
              {c.body} <span className="text-xs">{c.createdAt}</span>
            </div>
          ))
        )}
        <div className="flex items-end gap-2">
          <Textarea
            value={commentDraft}
            onChange={(e) => setCommentDraft(e.target.value)}
            placeholder="Add a quick comment..."
            className="min-h-[60px]"
          />
          <Button variant="primary" size="sm" onClick={onComment}>
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
