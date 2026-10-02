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

const RegisterProfilePage = () => {
	const [username, setUsername] = useState("");
	const [isLoading, setIsLoadig] = useState(false);
	const [error, setError] = useState<null | string>(null);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		setIsLoading(false);
	};

	return (
		<FormWrapper>
			<FormTitle>What should we call you? 😉</FormTitle>

			<FormContent>
				<FormInput
					type="text"
					name="username"
					placeholder="What would be your name?"
					icon={UserIcon}
					value={username}
					handleChange={setUsername}
					required
				/>

				{error && <FormError>{error}</FormError>}

				<Button className="w-full">
					{isLoading && <LoaderIcon size={16} className="animate-spin" />}
					Login
				</Button>
			</FormContent>
		</FormWrapper>
	);
};

export { RegisterProfilePage };
