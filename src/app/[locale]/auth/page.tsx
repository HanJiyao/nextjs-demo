import { getAuthenticatedAppForUser } from "@/lib/firebase/serverApp";
import { redirect } from "@/i18n/navigation";
import AuthMain from "@/components/Auth/AuthMain";

export default async function AuthPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const { currentUser } = await getAuthenticatedAppForUser();
  if (currentUser) {
    redirect({ href: "/community", locale: locale });
  }

  return <AuthMain />;
}
