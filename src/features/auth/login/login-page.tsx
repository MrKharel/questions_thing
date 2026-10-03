"use client";

import { useState } from "react";
import { MailIcon, LockIcon } from "lucide-react";

import {
	FormHeader,
	FormContent,
	FormInput,
	FormError,
	FormButton,
} from "../components/form";

import { login } from "./action";

const LoginPage = () => {
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<null | string>(null);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		const { error } = await login({ email, password });
		if (error !== null) setError(error.message);
		setIsLoading(false);
	};

	return (
		<>
			<FormHeader>
				<h2>Login to corp</h2>
			</FormHeader>

			<FormContent onSubmit={handleSubmit}>
				{error && <FormError>{error}</FormError>}

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

				<FormButton isLoading={isLoading}>Login</FormButton>
			</FormContent>
		</>
	);
};

export { LoginPage };
