"use client";

import { AuthError, type User } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { UserIcon } from "lucide-react";
import { useState } from "react";
import { createClient } from "@/lib/client/client";
import {
	FormButton,
	FormContent,
	FormError,
	FormHeader,
	FormInput,
} from "../components/form";
import { registerProfile } from "./action";

const RegisterProfilePage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);

	const { data: user } = useQuery({
		queryKey: ["user"],
		queryFn: async () => {
			const supabase = await createClient();

			const {
				data,
				error,
			}: {
				data: { user: User | null };
				error: AuthError | null;
			} = await supabase.auth.getUser();
			return { data, error };
		},
	});

	const { data: profile } = useQuery({
		queryKey: ["profile"],
		queryFn: async () => {
			const res = await fetch(`/users/${user!.data.id}`);
			if (!res.ok) return null;
			return await res.json();
		},
	});

	const [username, setUsername] = useState(profile!.username);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		const { error } = await registerProfile({ username });
		if (error) setError(error.message);
		setIsLoading(false);
	};

	return (
		<>
			<FormHeader>
				<h2>What should we call ya?!</h2>
			</FormHeader>

			<FormContent onSubmit={handleSubmit} className="gap-2">
				{error && <FormError>{error}</FormError>}

				<FormInput
					type="text"
					name="username"
					placeholder="Cristino Ronaldo"
					icon={UserIcon}
					value={username}
					handleChange={setUsername}
					required
				/>

				<FormButton isLoading={isLoading}>Continue</FormButton>
			</FormContent>
		</>
	);
};

export { RegisterProfilePage };
