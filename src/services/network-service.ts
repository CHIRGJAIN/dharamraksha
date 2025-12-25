import { messageService } from "./message-service";
import { currentUser } from "@/data/mock-data";

export const networkService = {
  initiateCollaboration: (lawyerId: string) => {
    const convo = messageService.startConversation(
      lawyerId,
      "New collaboration thread"
    );
    messageService.send(
      convo.id,
      "Hi! Kicking off a collaboration thread from your LexLink profile."
    );
    return convo;
  },
  messageAuthor: (authorId: string) => {
    const convo = messageService.startConversation(authorId, "Post follow-up");
    messageService.send(convo.id, "Saw your update—can we connect this week?");
    return convo;
  },
  downloadProfile: (profileSummary: string) => {
    const blob = new Blob([profileSummary], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${currentUser.name}-profile.txt`;
    a.click();
    URL.revokeObjectURL(url);
  },
};
