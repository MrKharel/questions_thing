"use client";

import { UserIcon } from "lucide-react";
import { useState } from "react";
import {
	FormButton,
	FormContent,
	FormError,
	FormHeader,
	FormInput,
} from "../components/form";
import { registerProfile } from "./action";

const RegisterProfilePage = () => {
	const [username, setUsername] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);

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
