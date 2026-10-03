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
import { useSignInWithPassword } from "@/hooks/use-auth";

const LoginPage = () => {
	const { signInWithPassword, isLoading, error } = useSignInWithPassword();
	const [email, setEmail] = useState<string>("");
	const [password, setPassword] = useState<string>("");

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();
		await signInWithPassword({ email, password });
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
