import AuthLayout from "@/features/auth";

export default function Auth_Layout(props: { children: React.ReactNode }) {
	return <AuthLayout>{props.children}</AuthLayout>;
}
