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

import { register } from "./action";

const RegisterPage = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<null | string>(null);

	const handleSubmit = async (e: any) => {
		e.preventDefault();
		setIsLoading(true);
		setError(null);

		const { error } = await register({ email, password });
		if (error) setError(error.message);
		setIsLoading(false);
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

				<FormButton isLoading={isLoading}>Register</FormButton>
			</FormContent>
		</>
	);
};

export { RegisterPage };
