"use client";

import { useEffect, useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { feedService } from "@/services/feed-service";
import { useToast } from "@/hooks/use-toast";
import { Attachment } from "@/lib/types";

type Props = {
  registerFocus?: (focus: () => void) => void;
};

const attachmentOptions: Attachment[] = [
  { id: "att-brief", label: "Attach research brief" },
  { id: "att-room", label: "Link data room" },
  { id: "att-ruling", label: "Share ruling excerpt" },
];

export const Composer = ({ registerFocus }: Props) => {
  const [body, setBody] = useState("");
  const [selected, setSelected] = useState<string[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { success } = useToast();

  useEffect(() => {
    if (registerFocus) {
      registerFocus(() => textareaRef.current?.focus());
    }
  }, [registerFocus]);

  const toggleAttachment = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const publish = () => {
    if (!body.trim()) return;
    const attachments = attachmentOptions.filter((a) => selected.includes(a.id));
    feedService.publish(body.trim(), attachments);
    setBody("");
    setSelected([]);
    success("Update published to your network.");
  };

  return (
    <div className="rounded-3xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-primary)] p-5 shadow-xl">
      <p className="text-sm font-semibold text-[color:var(--ink-primary)]">
        Share an update with your legal network
      </p>
      <Textarea
        ref={textareaRef}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Summarize a ruling, share a room link, or request counsel..."
        className="mt-3 min-h-[120px]"
      />
      <div className="mt-3 flex flex-wrap gap-2">
        {attachmentOptions.map((att) => (
          <button
            key={att.id}
            onClick={() => toggleAttachment(att.id)}
            className="rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)] px-3 py-1 text-xs text-[color:var(--ink-muted)] transition hover:border-[color:var(--brand-primary)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[color:var(--brand-primary)]"
          >
            {att.label}
          </button>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-[color:var(--ink-muted)]">
        <span>Tip: keep it actionable, add one attachment.</span>
        <span>{body.length}/500</span>
      </div>
      <div className="mt-3 flex justify-end">
        <Button onClick={publish}>Publish update</Button>
      </div>
    </div>
  );
};
