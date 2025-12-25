import { formatTime, sentenceToTitle } from "@/lib/utils";
import { Post } from "@/lib/types";
import { useAppStore } from "@/stores/app-store";
import { currentUser } from "@/data/mock-data";

export const feedService = {
  publish: (body: string, attachments?: Post["attachments"]) => {
    const post: Post = {
      id: `feed-${Date.now()}`,
      authorId: currentUser.id,
      title: sentenceToTitle(body),
      summary: body,
      tags: ["Network"],
      category: "Update",
      createdAt: `${formatTime(new Date())} • Today`,
      likes: 0,
      comments: [],
      saved: false,
      attachments,
    };
    useAppStore.getState().addPost(post);
    return post;
  },
  toggleLike: (id: string) => useAppStore.getState().toggleLike(id),
  toggleSave: (id: string) => useAppStore.getState().toggleSave(id),
  comment: (postId: string, body: string) => {
    const now = formatTime(new Date());
    useAppStore.getState().addComment(postId, {
      id: `c-${Date.now()}`,
      body,
      conversationId: "",
      senderId: currentUser.id,
      createdAt: now,
    });
    return now;
  },
};
