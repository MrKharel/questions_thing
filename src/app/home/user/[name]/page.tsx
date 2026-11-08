import { PublicProfile } from "@/features/account/profile";

export default async function PublicProfilePage({ params }: { params: Promise<{ name: string }> }) {
  const { name } = await params;
  return <PublicProfile name={name} />;
}
