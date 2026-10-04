"use client";

import { setEngine } from "crypto";
import { UserIcon } from "lucide-react";
import { useState } from "react";
import { validate } from "@/lib/validate";
import {
	FormButton,
	FormContent,
	FormError,
	FormHeader,
	FormInput,
} from "../components/form";

const RegisterProfilePage = () => {
	const [state, setState] = useState({
		isLoading: false,
		error: null as string | null,
	});
	const [username, setUsername] = useState("");

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		const checks = validate({ username });
		if (!checks.valid) {
			setState((prev) => ({ ...prev, error: checks.message }));
			return;
		}

		setState({ isLoading: true, error: null });

		try {
			const res = await fetch("/api/users/me", {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ data: { username } }),
			});

			const result = await res.json();

			if (!res.ok || !result.success) {
				setState((prev) => ({ ...prev, error: result.message }));
			}
		} finally {
			setState((prev) => ({ ...prev, isLoading: false }));
		}
	};

	return (
		<>
			<FormHeader>
				<h2>What should we call ya?!</h2>
			</FormHeader>

			<FormContent onSubmit={handleSubmit} className="gap-2">
				{state.error && <FormError>{state.error}</FormError>}

				<FormInput
					type="text"
					name="username"
					placeholder="Cristino Ronaldo"
					icon={UserIcon}
					value={username}
					handleChange={setUsername}
					autoFocus
					required
				/>

				<FormButton isLoading={state.isLoading}>Continue</FormButton>
			</FormContent>
		</>
	);
};

export { RegisterProfilePage };
