import AuthLayout from "@/features/auth";

export default function Auth_Layout(props: { children: React.ReatNode }) {
	return <AuthLayout>{props.children}</AuthLayout>;
}
