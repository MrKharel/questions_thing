import { ProfileInfoSection } from "./components/profile-info-section";

export function ProfilePage({ username }: { username: string }) {
	return (
		<div className="flex flex-col md:flex-row gap-4 md:gap-0 mt-6 max-w-[1200px] w-full self-center">
			<ProfileInfoSection username={username} />
		</div>
	);
}
