export type ThemeMode = "light" | "dark";

export type User = {
  id: string;
  name: string;
  role: string;
  headline: string;
  avatar: string;
  location: string;
};

export type Attachment = {
  id: string;
  label: string;
  href?: string;
};

export type Comment = {
  id: string;
  authorId: string;
  body: string;
  createdAt: string;
};

export type Post = {
  id: string;
  authorId: string;
  title: string;
  summary: string;
  tags: string[];
  category: string;
  createdAt: string;
  likes: number;
  comments: Comment[];
  saved: boolean;
  liked?: boolean;
  attachments?: Attachment[];
};

export type Conversation = {
  id: string;
  participantIds: string[];
  title: string;
  unread: boolean;
  focus: "focused" | "other";
  lastMessageAt: string;
};

export type Message = {
  id: string;
  conversationId: string;
  senderId: string;
  body: string;
  createdAt: string;
  system?: boolean;
};

export type Opportunity = {
  id: string;
  heading: string;
  budget: string;
  due: string;
  submitted?: boolean;
};

export type Firm = {
  id: string;
  name: string;
  state: string;
  district: string;
  courts: string[];
  practiceAreas: string[];
  size: string;
  joinStatus?: "none" | "pending" | "approved";
};

export type Alert = {
  id: string;
  type: "Compliance" | "Case" | "Deadline" | "Network";
  title: string;
  detail: string;
};

export type Event = {
  id: string;
  title: string;
  date: string;
  time: string;
};

export type NewsItem = {
  id: string;
  source: string;
  title: string;
  time: string;
};

export type LawyerProfile = {
  id: string;
  name: string;
  headline: string;
  location: string;
  avatar: string;
  specialties: string[];
  barId: string;
  availability: string;
  experience: string;
  languages: string[];
  clients: string[];
  engagement: string[];
  recognitions: string[];
  memberships: string[];
  matters: string[];
  education: string[];
  publications: { title: string; link: string }[];
  proBono?: string[];
};
