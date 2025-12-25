"use client";

import { create } from "zustand";
import { produce } from "immer";
import {
  Alert,
  Conversation,
  Message,
  Opportunity,
  Post,
  User,
  Firm,
} from "@/lib/types";
import {
  alerts as seedAlerts,
  conversations as seedConversations,
  currentUser,
  messages as seedMessages,
  opportunities as seedOpportunities,
  posts as seedPosts,
  firms as seedFirms,
} from "@/data/mock-data";

type AppState = {
  user: User;
  feed: Post[];
  conversations: Conversation[];
  messages: Message[];
  opportunities: Opportunity[];
  alerts: Alert[];
  firms: Firm[];
  addPost: (post: Post) => void;
  toggleLike: (postId: string) => void;
  toggleSave: (postId: string) => void;
  addComment: (postId: string, comment: Message) => void;
  addConversation: (conversation: Conversation) => void;
  addMessage: (message: Message) => void;
  markAlertDone: (id: string) => void;
  submitOpportunity: (id: string) => void;
  requestJoinFirm: (id: string) => void;
  approveFirmJoin: (id: string) => void;
};

export const useAppStore = create<AppState>((set) => ({
  user: currentUser,
  feed: seedPosts,
  conversations: seedConversations,
  messages: seedMessages,
  opportunities: seedOpportunities,
  alerts: seedAlerts,
  firms: seedFirms,
  addPost: (post) =>
    set(
      produce((state: AppState) => {
        state.feed = [post, ...state.feed];
      })
    ),
  toggleLike: (postId) =>
    set(
      produce((state: AppState) => {
        const post = state.feed.find((p) => p.id === postId);
        if (!post) return;
        const isLiked = Boolean(post.liked);
        post.liked = !isLiked;
        post.likes = Math.max(0, post.likes + (isLiked ? -1 : 1));
      })
    ),
  toggleSave: (postId) =>
    set(
      produce((state: AppState) => {
        const post = state.feed.find((p) => p.id === postId);
        if (post) post.saved = !post.saved;
      })
    ),
  addComment: (postId, comment) =>
    set(
      produce((state: AppState) => {
        const post = state.feed.find((p) => p.id === postId);
        if (!post) return;
        post.comments.push({
          id: comment.id,
          authorId: comment.senderId,
          body: comment.body,
          createdAt: comment.createdAt,
        });
      })
    ),
  addConversation: (conversation) =>
    set(
      produce((state: AppState) => {
        const exists = state.conversations.find((c) => c.id === conversation.id);
        if (!exists) state.conversations.unshift(conversation);
      })
    ),
  addMessage: (message) =>
    set(
      produce((state: AppState) => {
        state.messages.push(message);
        const convo = state.conversations.find(
          (c) => c.id === message.conversationId
        );
        if (convo) {
          convo.lastMessageAt = message.createdAt;
          convo.unread = message.senderId !== state.user.id;
        }
      })
    ),
  markAlertDone: (id) =>
    set(
      produce((state: AppState) => {
        state.alerts = state.alerts.filter((a) => a.id !== id);
      })
    ),
  submitOpportunity: (id) =>
    set(
      produce((state: AppState) => {
        const opp = state.opportunities.find((o) => o.id === id);
        if (opp) opp.submitted = true;
      })
    ),
  requestJoinFirm: (id) =>
    set(
      produce((state: AppState) => {
        const firm = state.firms.find((f) => f.id === id);
        if (firm) firm.joinStatus = "pending";
      })
    ),
  approveFirmJoin: (id) =>
    set(
      produce((state: AppState) => {
        const firm = state.firms.find((f) => f.id === id);
        if (firm) firm.joinStatus = "approved";
      })
    ),
}));
