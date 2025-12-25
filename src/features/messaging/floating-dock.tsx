"use client";

import { useMemo, useState } from "react";
import { useAppStore } from "@/stores/app-store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { messageService } from "@/services/message-service";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import {
  ArrowDownWideNarrow,
  MessageCircle,
  MessageSquarePlus,
  Minimize2,
  PanelRightOpen,
  Search,
} from "lucide-react";

export const FloatingDock = () => {
  const conversations = useAppStore((s) => s.conversations);
  const messages = useAppStore((s) => s.messages);
  const [collapsed, setCollapsed] = useState(false);
  const [focusTab, setFocusTab] = useState<"focused" | "other">("focused");
  const [activeId, setActiveId] = useState(conversations[0]?.id);
  const [draft, setDraft] = useState("");
  const router = useRouter();
  const { info } = useToast();

  const filtered = conversations.filter((c) => c.focus === focusTab);
  const activeConversation =
    conversations.find((c) => c.id === activeId) || filtered[0] || conversations[0];
  const thread = useMemo(
    () => messages.filter((m) => m.conversationId === activeConversation?.id),
    [messages, activeConversation?.id]
  );

  if (!activeConversation) return null;

  const send = () => {
    if (!draft.trim()) return;
    messageService.send(activeConversation.id, draft.trim());
    setDraft("");
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 w-full max-w-sm drop-shadow-2xl">
      <Card className="glass-panel overflow-hidden rounded-3xl border border-[color:var(--border-subtle)] bg-[color:var(--surface-primary)]/90">
        <div className="flex items-center justify-between border-b border-[color:var(--border-subtle)] px-4 py-3">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
              Messages
            </p>
            <p className="text-sm font-semibold text-[color:var(--ink-primary)]">
              Floating dock
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => info("All marked read")}
              aria-label="Mark all read"
            >
              <ArrowDownWideNarrow className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => info("Compose new message")}
              aria-label="New message"
            >
              <MessageSquarePlus className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/messages")}
              aria-label="Open messages"
            >
              <PanelRightOpen className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setCollapsed((c) => !c)}
              aria-label="Collapse dock"
            >
              {collapsed ? (
                <MessageCircle className="h-4 w-4" />
              ) : (
                <Minimize2 className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>

        {!collapsed && (
          <div className="grid grid-cols-[140px,1fr]">
            <div className="border-r border-[color:var(--border-subtle)] p-3 space-y-2">
              <div className="flex items-center gap-2 rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)] p-1 text-[11px]">
                {(["focused", "other"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setFocusTab(tab)}
                    className={`flex-1 rounded-full px-2 py-1 ${
                      focusTab === tab
                        ? "bg-[color:var(--surface-primary)] text-[color:var(--ink-primary)]"
                        : "text-[color:var(--ink-muted)]"
                    }`}
                  >
                    {tab === "focused" ? "Focused" : "Other"}
                  </button>
                ))}
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[color:var(--ink-muted)]" />
                <input
                  className="w-full rounded-full border border-[color:var(--border-subtle)] bg-[color:var(--surface-muted)] px-8 py-1.5 text-xs text-[color:var(--ink-primary)] outline-none"
                  placeholder="Search"
                />
              </div>
              <div className="max-h-60 space-y-1 overflow-auto">
                {(filtered.length ? filtered : conversations).map((convo) => (
                  <button
                    key={convo.id}
                    onClick={() => setActiveId(convo.id)}
                    className={`w-full rounded-2xl px-3 py-2 text-left text-xs transition ${
                      convo.id === activeId
                        ? "bg-[color:var(--surface-muted)] text-[color:var(--ink-primary)]"
                        : "text-[color:var(--ink-muted)] hover:bg-[color:var(--surface-muted)]/70"
                    }`}
                  >
                    <div className="font-semibold text-[color:var(--ink-primary)]">
                      {convo.title}
                    </div>
                    <div>{convo.lastMessageAt}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between p-3">
              <div className="mb-2 text-xs uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
                Thread
              </div>
              <div className="hide-scrollbar flex-1 space-y-2 overflow-auto pr-1">
                {thread.map((msg) => (
                  <div
                    key={msg.id}
                    className={`w-fit max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                      msg.senderId === "me"
                        ? "ml-auto bg-[color:var(--brand-primary)] text-white"
                        : "bg-[color:var(--surface-muted)] text-[color:var(--ink-primary)]"
                    }`}
                  >
                    {msg.body}
                    <div className="text-[10px] opacity-70">{msg.createdAt}</div>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center gap-2">
                <Input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Message..."
                  className="text-sm"
                />
                <Button size="sm" onClick={send}>
                  Send
                </Button>
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[color:var(--ink-muted)]">
                Focused · Secure
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
