"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSignOut } from "@/hooks/use-auth";
import {
	FormButton,
	FormContent,
	FormError,
	FormHeader,
	FormInput,
} from "../components/form";

const LogoutPage = () => {
	const router = useRouter();
	const { signOut, isLoading, error } = useSignOut();
	const [userInput, setUserInput] = useState("");

	const { data: profile, isFetching } = useQuery({
		queryKey: ["user-profile"],
		queryFn: async () => {
			const res = await fetch("/api/users/me");
			const result = await res.json();
			if (!res.ok || !result.success) {
				return null;
			}
			return result;
		},
	});

	const username: string | undefined = profile?.data?.username;

	useEffect(() => {
		if (!isFetching && !profile) {
			router.replace("/login");
		}
	}, [isFetching, profile, router]);

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (userInput !== username) return;
		await signOut();
	};

	if (!username) return null;

	return (
		<>
			<FormHeader>
				<h2>Are you sure to logout?</h2>
			</FormHeader>

			<FormContent onSubmit={handleSubmit}>
				{error ? (
					<FormError>{error}</FormError>
				) : (
					<p className="text-center text-sm text-muted-foreground">
						Type in your username: "{username}" so that we know that you really
						want to logout.
					</p>
				)}

				<FormInput
					type="text"
					name="username"
					placeholder="Enter your username"
					value={userInput}
					handleChange={setUserInput}
					autoFocus
					required
				/>

				<FormButton isLoading={isLoading} disabled={userInput !== username}>
					Log Out
				</FormButton>
			</FormContent>
		</>
	);
};

export { LogoutPage };
