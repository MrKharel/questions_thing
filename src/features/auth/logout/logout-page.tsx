"use client";

import { useState } from "react";
import {
	FormHeader,
	FormContent,
	FormInput,
	FormButton,
	FormError,
} from "../components/form";
import { useSignOut } from "@/hooks/use-auth";

const LogoutPage = () => {
	const { signOut, isLoading, error } = useSignOut();
	const [userInput, setUserInput] = useState("");

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();
		await signOut();
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
