"use client";

import { useMemo, useState } from "react";
import { useAppStore } from "@/stores/app-store";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { messageService } from "@/services/message-service";
import { useToast } from "@/hooks/use-toast";
import { FileUp, PhoneCall, Search } from "lucide-react";

export const MessagesWorkspace = () => {
  const conversations = useAppStore((s) => s.conversations);
  const messages = useAppStore((s) => s.messages);
  const [activeId, setActiveId] = useState(conversations[0]?.id);
  const [draft, setDraft] = useState("");
  const { success } = useToast();

  const activeConversation = conversations.find((c) => c.id === activeId);
  const thread = useMemo(
    () => messages.filter((m) => m.conversationId === activeId),
    [messages, activeId]
  );

  if (!activeConversation) return null;

  const send = () => {
    if (!draft.trim()) return;
    messageService.send(activeConversation.id, draft.trim());
    setDraft("");
  };

  const shareDeck = () => {
    const filename = window.prompt("Select deck filename", "LexLink-brief.pdf");
    if (!filename) return;
    messageService.send(
      activeConversation.id,
      `Shared deck: ${filename}`
    );
    success("Shared deck into the thread.");
  };

  const scheduleCall = () => {
    const time = window.prompt("Pick a time (yyyy-mm-ddThh:mm)", "");
    if (!time) return;
    const agenda = window.prompt("Agenda (optional)", "Discovery + scope alignment");
    messageService.send(
      activeConversation.id,
      `Scheduled call: ${time}${agenda ? ` • ${agenda}` : ""}`
    );
    success("Call scheduled and added to the thread.");
  };

  return (
    <div className="rounded-3xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-primary)] p-4 shadow-2xl">
      <div className="grid gap-4 lg:grid-cols-[280px,1fr]">
        <div className="space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[color:var(--ink-muted)]" />
            <Textarea
              className="w-full rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)] px-9 py-2 text-sm text-[color:var(--ink-primary)] outline-none"
              placeholder="Search conversations"
              rows={1}
            />
          </div>
          <div className="space-y-2">
            {conversations.map((convo) => (
              <button
                key={convo.id}
                onClick={() => setActiveId(convo.id)}
                className={`w-full rounded-2xl border px-3 py-2 text-left transition ${
                  convo.id === activeId
                    ? "border-[color:var(--brand-primary)] bg-[color:var(--surface-muted)]"
                    : "border-[color:var(--border-subtle)] bg-[color:var(--surface-primary)] hover:border-[color:var(--brand-primary)]/50"
                }`}
              >
                <div className="text-sm font-semibold text-[color:var(--ink-primary)]">
                  {convo.title}
                </div>
                <div className="text-xs text-[color:var(--ink-muted)]">
                  {convo.lastMessageAt} · {convo.focus}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)]/60 p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-[color:var(--ink-primary)]">
                {activeConversation.title}
              </p>
              <p className="text-xs text-[color:var(--ink-muted)]">
                Secure thread · {thread.length} messages
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={shareDeck}>
                <FileUp className="h-4 w-4" /> Share deck
              </Button>
              <Button variant="outline" size="sm" onClick={scheduleCall}>
                <PhoneCall className="h-4 w-4" /> Schedule call
              </Button>
            </div>
          </div>

          <div className="mt-3 flex-1 space-y-2 overflow-auto rounded-2xl bg-[color:var(--surface-primary)] p-3 hide-scrollbar">
            {thread.map((msg) => (
              <div
                key={msg.id}
                className={`w-fit max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                  msg.senderId === "me"
                    ? "ml-auto bg-[color:var(--brand-primary)] text-white"
                    : msg.system
                    ? "bg-[color:var(--electric-cyan)]/20 text-[color:var(--ink-primary)]"
                    : "bg-[color:var(--surface-muted)] text-[color:var(--ink-primary)]"
                }`}
              >
                {msg.body}
                <div className="text-[10px] opacity-70">{msg.createdAt}</div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center gap-3">
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Type a secure message..."
              className="min-h-[68px]"
            />
            <Button onClick={send}>Send</Button>
          </div>
        </div>
      </div>
    </div>
  );
};
