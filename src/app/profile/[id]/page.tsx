import { AppShell } from "@/components/shell/app-shell";
import { networkProfiles, currentUser } from "@/data/mock-data";
import { ProfileView } from "@/features/profile/profile-view";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export default function ProfilePage({ params }: Props) {
  const profile =
    networkProfiles.find((p) => p.id === params.id) ||
    (params.id === "me"
      ? {
          id: "me",
          name: currentUser.name,
          headline: currentUser.headline,
          location: currentUser.location,
          avatar: currentUser.avatar,
          specialties: ["M&A", "Growth"],
          barId: "IN/DL/7788",
          availability: "Calendar open",
          experience: "14 yrs",
          languages: ["English", "Hindi"],
          clients: ["Growth funds", "PE backed SaaS"],
          engagement: ["Outside counsel", "Board advisory"],
          recognitions: ["GAF legal network lead"],
          memberships: ["IBA", "AMCHAM"],
          matters: ["Cross-border buyout", "AI vendor diligence"],
          education: ["NLSIU", "Harvard LL.M"],
          publications: [{ title: "Scaling cross-border legal ops", link: "#" }],
        }
      : null);

  if (!profile) return notFound();

  return (
    <AppShell>
      <ProfileView profile={profile} />
    </AppShell>
  );
}
