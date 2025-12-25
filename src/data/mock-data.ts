import {
  Alert,
  Conversation,
  Event,
  LawyerProfile,
  Message,
  NewsItem,
  Opportunity,
  Post,
  User,
  Firm,
} from "@/lib/types";

export const currentUser: User = {
  id: "me",
  name: "Avery Singh",
  role: "Partner",
  headline: "Cross-border M&A | Tech growth counsel",
  avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Avery+Singh",
  location: "New Delhi, India",
};

export const networkProfiles: LawyerProfile[] = [
  {
    id: "lawyer-1",
    name: "Mira Nair",
    headline: "Fintech regulatory | RBI liaison",
    location: "Mumbai, India",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Mira+Nair",
    specialties: ["Fintech", "Policy", "Compliance"],
    barId: "IN/MH/12345",
    availability: "48h response",
    experience: "12 yrs",
    languages: ["English", "Hindi"],
    clients: ["Razorflow", "Coastal Capital"],
    engagement: ["Retainer", "Fixed fee", "Sprint"],
    recognitions: ["India Legal 500 - 2024", "AsiaLaw Rising Star"],
    memberships: ["IBA", "FICCI Fintech Council"],
    matters: ["UPI cross-border pilot", "Neo-bank licensing"],
    education: ["NLSIU Bangalore"],
    publications: [{ title: "CBDC sandbox learnings", link: "#" }],
    proBono: ["Digital rights advisory"],
  },
  {
    id: "lawyer-2",
    name: "Jai Rao",
    headline: "Disputes strategist | Intl arbitration",
    location: "Singapore",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Jai+Rao",
    specialties: ["Arbitration", "Energy", "Construction"],
    barId: "SG/LSRA/9988",
    availability: "Calendar open",
    experience: "15 yrs",
    languages: ["English", "Mandarin"],
    clients: ["SE Asia Energy JV", "Global EPC"],
    engagement: ["Hearing lead", "Case audit"],
    recognitions: ["GAR 45 under 45"],
    memberships: ["SIAC", "HKIAC"],
    matters: ["ICSID defense - renewables", "APAC EPC dispute"],
    education: ["NUS, LL.M NYU"],
    publications: [{ title: "Evidence in virtual hearings", link: "#" }],
  },
  {
    id: "lawyer-3",
    name: "Fatima Qureshi",
    headline: "Tech transactions | AI safety",
    location: "London, UK",
    avatar: "https://api.dicebear.com/9.x/initials/svg?seed=Fatima+Qureshi",
    specialties: ["AI", "Commercial", "Data"],
    barId: "SRA/445566",
    availability: "Accepting matters",
    experience: "10 yrs",
    languages: ["English", "Arabic"],
    clients: ["DeepCompute", "Skyline Robotics"],
    engagement: ["Outside counsel", "Product counsel on-demand"],
    recognitions: ["Chambers - Technology 2025"],
    memberships: ["SCL", "IAPP"],
    matters: ["AI vendor MSAs", "Safety review board charters"],
    education: ["Oxford", "Columbia LL.M"],
    publications: [{ title: "RAG governance toolkit", link: "#" }],
  },
];

export const posts: Post[] = [
  {
    id: "post-1",
    authorId: "lawyer-1",
    title: "UPI cross-border sandbox insights",
    summary:
      "Sharing a short briefing on RBI's cross-border pilot and data localisation guardrails. Practical notes for fintech founders.",
    tags: ["Fintech", "Policy", "Payments"],
    category: "Briefing",
    createdAt: "09:10",
    likes: 12,
    comments: [
      {
        id: "c-1",
        authorId: "lawyer-2",
        body: "Thanks for this—did you see the updated sandbox template?",
        createdAt: "09:32",
      },
    ],
    saved: false,
    attachments: [{ id: "att-1", label: "Download briefing" }],
  },
  {
    id: "post-2",
    authorId: "lawyer-3",
    title: "Drafting AI procurement playbooks",
    summary:
      "We aligned a tri-party AI procurement playbook with safety, model risk, and incident response contours. Template link inside.",
    tags: ["AI", "Commercial", "Risk"],
    category: "Playbook",
    createdAt: "08:55",
    likes: 30,
    comments: [],
    saved: true,
  },
];

export const conversations: Conversation[] = [
  {
    id: "conv-1",
    participantIds: ["me", "lawyer-1"],
    title: "Fintech licensing sprint",
    unread: false,
    focus: "focused",
    lastMessageAt: "09:22",
  },
  {
    id: "conv-2",
    participantIds: ["me", "lawyer-2"],
    title: "Arb hearing prep",
    unread: true,
    focus: "other",
    lastMessageAt: "08:11",
  },
];

export const messages: Message[] = [
  {
    id: "m-1",
    conversationId: "conv-1",
    senderId: "lawyer-1",
    body: "Can we lock the RBI reviewer slot for Thursday?",
    createdAt: "09:10",
  },
  {
    id: "m-2",
    conversationId: "conv-1",
    senderId: "me",
    body: "Yes—sending agenda shortly.",
    createdAt: "09:15",
  },
  {
    id: "m-3",
    conversationId: "conv-2",
    senderId: "lawyer-2",
    body: "Uploaded the bundle; check the privilege log.",
    createdAt: "08:11",
  },
];

export const opportunities: Opportunity[] = [
  {
    id: "opp-1",
    heading: "VC-backed fintech needs licensing partner",
    budget: "$18k sprint",
    due: "Due in 5 days",
  },
  {
    id: "opp-2",
    heading: "Series B SaaS: AI safety assessment",
    budget: "$9k fixed",
    due: "Due in 2 days",
  },
];

export const firms: Firm[] = [
  {
    id: "firm-1",
    name: "Delhi High Court Tech Chambers",
    state: "Delhi",
    district: "New Delhi",
    courts: ["Delhi High Court", "District Court Patiala House"],
    practiceAreas: ["Tech", "Commercial", "Data"],
    size: "35 lawyers",
    joinStatus: "none",
  },
  {
    id: "firm-2",
    name: "Mumbai Commercial Bar Collective",
    state: "Maharashtra",
    district: "Mumbai",
    courts: ["Bombay High Court", "City Civil Court"],
    practiceAreas: ["Fintech", "Disputes", "Banking"],
    size: "50 lawyers",
    joinStatus: "pending",
  },
  {
    id: "firm-3",
    name: "Karnataka IP & Tech Guild",
    state: "Karnataka",
    district: "Bengaluru Urban",
    courts: ["Karnataka High Court", "City Civil Court Bengaluru"],
    practiceAreas: ["IPR", "Technology", "Startups"],
    size: "22 lawyers",
    joinStatus: "approved",
  },
  {
    id: "firm-4",
    name: "Tamil Nadu Coastal Arbitration Group",
    state: "Tamil Nadu",
    district: "Chennai",
    courts: ["Madras High Court", "Madras Commercial Court"],
    practiceAreas: ["Arbitration", "Energy", "Maritime"],
    size: "18 lawyers",
    joinStatus: "none",
  },
];

export const alerts: Alert[] = [
  {
    id: "al-1",
    type: "Compliance",
    title: "DPDP deadline approaching",
    detail: "Client asks for DPIA addendum on Friday.",
  },
  {
    id: "al-2",
    type: "Network",
    title: "Intro request",
    detail: "Singapore lit partner wants to meet next week.",
  },
];

export const events: Event[] = [
  { id: "ev-1", title: "VC fintech diligence room", date: "FRI", time: "5:00 PM" },
  { id: "ev-2", title: "AI vendor review", date: "SAT", time: "11:30 AM" },
];

export const news: NewsItem[] = [
  {
    id: "n-1",
    source: "Reuters",
    title: "RBI expands cross-border sandbox to APAC",
    time: "12m ago",
  },
  {
    id: "n-2",
    source: "Law360",
    title: "Arbitration protocol adds virtual hearing rules",
    time: "35m ago",
  },
];
