export default async function ClassOverviewPage({ params }: { params: Promise<{ username: string; className: string }> }) {
	const { username, className } = await params;

	return (
		<>
			this is the class overview page.
			<br />
			class name: {className}
			<br />
			clsas teacher: {username}
		</>
	);
}
