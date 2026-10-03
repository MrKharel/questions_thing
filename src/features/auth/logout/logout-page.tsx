"use client";

import { redirect } from "next/navigation";
import { useState } from "react";

import {
	FormHeader,
	FormContent,
	FormInput,
	FormButton,
	FormError,
} from "../components/form";

import { useQuery } from "@tanstack/react-query";
import { fetchProfile } from "@/features/profile";
import { logout } from "@/features/profile/action";

const LogoutPage = () => {
	const [userInput, setUserInput] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);

	const { data: profile } = useQuery({
		queryKey: ["user-profile"],
		queryFn: fetchProfile,
	});
	if (!profile) return null;

	if (profile!.error) redirect("/register/profile");

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();
		setIsLoading(true);

		if (profile!.data.username !== userInput) {
			setError(
				`Enter ${profile!.data.username} correctly. You only have one job. Don't mess this up.`,
			);
			return;
		}

		await logout();
		setIsLoading(false);
	};

	return (
		<>
			<FormHeader>
				<h2>Are you sure to logout?</h2>
			</FormHeader>

			{error ? (
				<FormError>{error}</FormError>
			) : (
				<p className="text-center text-sm text-muted-foreground">
					Type in your username: "{profile!.data.username}" so that we know that
					you really want to logout.
				</p>
			)}
			<FormContent onSubmit={handleSubmit}>
				<FormInput
					type="text"
					name="username"
					placeholder="Enter your username"
					value={userInput}
					handleChange={setUserInput}
					autoFocus
					required
				/>

				<FormButton isLoading={isLoading}>Log Out</FormButton>
			</FormContent>
		</>
	);
};

export { LogoutPage };
