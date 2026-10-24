export default async function ProfilePage({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params;

  return <>this is the profile page. username: {username}</>;
}
