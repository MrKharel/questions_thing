import { ClassOverviewPage as ClassOverview } from "@/features/class/overview";

export default async function ClassOverviewPage({ params }: { params: Promise<{ username: string; className: string }> }) {
	const { username, className } = await params;

	return <ClassOverview />;
}
