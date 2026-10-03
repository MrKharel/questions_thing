"use client";

import { useState } from "react";
import Link from "next/link";
import { UserIcon, LoaderIcon } from "lucide-react";

import {
	FormWrapper,
	FormHeader,
	FormTitle,
	FormContent,
	FormInput,
	FormError,
} from "../components/form";
import { Button } from "@/components/ui/button";

import { registerProfile } from "./action";

const RegisterProfilePage = () => {
	const [username, setUsername] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		const { error: profileError } = registerProfile(username);
		if (error) setError(profileError.message);
		setIsLoading(false);
	};

	return (
		<FormWrapper>
			<h2 className="text-3xl font-heading text-center">
				What should we call ya?!
			</h2>

			<FormContent className="gap-2">
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

				<Button className="w-full">
					{isLoading && <LoaderIcon size={16} className="animate-spin" />}
					Continue
				</Button>
			</FormContent>
		</FormWrapper>
	);
};

export { RegisterProfilePage };
