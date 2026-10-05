"use client";

import { LockIcon, MailIcon } from "lucide-react";
import { useState } from "react";

import { useSignUp } from "@/hooks/use-auth";
import {
	FormButton,
	FormContent,
	FormError,
	FormHeader,
	FormInput,
} from "../components/form";

const RegisterPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const { isLoading, error, signUp } = useSignUp();

	const handleSubmit = async (e: React.SubmitEvent) => {
		e.preventDefault();
		await signUp({ email, password });
	};

	return (
		<>
			<FormHeader>
				<h2>
					You'll be organized <br /> Just with one signin
				</h2>
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
					autoFocus
					required
				/>
				<FormInput
					type="password"
					label="Password"
					name="password"
					autoComplete="new-password"
					placeholder="Set your password"
					icon={LockIcon}
					value={password}
					handleChange={setPassword}
					required
				/>

				<FormButton isLoading={isLoading} disabled={isLoading}>
					Register
				</FormButton>
			</FormContent>
		</>
	);
};

export { RegisterPage };
