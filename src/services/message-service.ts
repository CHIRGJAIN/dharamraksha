import { useAppStore } from "@/stores/app-store";
import { Conversation, Message } from "@/lib/types";
import { formatTime } from "@/lib/utils";
import { currentUser } from "@/data/mock-data";

export const messageService = {
  startConversation: (partnerId: string, title: string) => {
    const convo: Conversation = {
      id: `conv-${Date.now()}`,
      participantIds: [currentUser.id, partnerId],
      title,
      unread: false,
      focus: "focused",
      lastMessageAt: formatTime(new Date()),
    };
    useAppStore.getState().addConversation(convo);
    return convo;
  },
  send: (conversationId: string, body: string) => {
    const msg: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: currentUser.id,
      body,
      createdAt: formatTime(new Date()),
    };
    useAppStore.getState().addMessage(msg);
    return msg;
  },
  sendSystem: (conversationId: string, body: string) => {
    const msg: Message = {
      id: `msg-${Date.now()}`,
      conversationId,
      senderId: "system",
      body,
      createdAt: formatTime(new Date()),
      system: true,
    };
    useAppStore.getState().addMessage(msg);
    return msg;
  },
};
