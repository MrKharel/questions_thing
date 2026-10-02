"use client";

import { useState } from "react";
import Link from "next/link";
import { MailIcon, LockIcon, LoaderIcon } from "lucide-react";

import {
	FormWrapper,
	FormHeader,
	FormTitle,
	FormContent,
	FormInput,
	FormError,
} from "../components/form";
import { Button } from "@/components/ui/button";

import { login } from "./action";

const LoginPage = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isLoading, setIsLoadig] = useState<boolean>(false);
	const [error, setError] = useState<null | string>(null);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		const { error } = await login(email, password);
		if (error) setError(error.message);
		setIsLoading(false);
	};

	return (
		<FormWrapper>
			<FormTitle>Login to corp</FormTitle>

			<FormContent>
				<FormInput
					type="email"
					label="Email"
					name="email"
					autoComplete="email"
					placeholder="you@example.com"
					icon={MailIcon}
					value={email}
					handleChange={setEmail}
					required
				/>
				<FormInput
					type="password"
					label="Password"
					name="password"
					autoComplete="current-password"
					placeholder="Enter your password"
					icon={LockIcon}
					value={password}
					handleChange={setPassword}
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

export { LoginPage };
