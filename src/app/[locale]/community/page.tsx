import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { redirect } from "@/i18n/navigation";
import Image from "next/image";
import LogoutButton from "@/components/Auth/LogoutButton";

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { currentUser } = await getAuthenticatedAppForUser();
  
  if (!currentUser) {
    redirect({ href: "/", locale });
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-6xl font-bold mb-4">Community</h1>
      <Image
        src={currentUser?.photoURL || "/profile.svg"}
        className="rounded my-6"
        alt="User Profile"
        width={100}
        height={100}
      />
      <p className="text-4xl">Hello, {currentUser?.displayName}</p>
      <LogoutButton />
    </div>
  );
}
