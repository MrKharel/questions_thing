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

		const { error } = await register(email, password);
		if (error) setError(error.message);
		setIsLoading(false);
	};

	return (
		<FormWrapper>
			<FormTitle>
				You'll be organized <br /> Just with one signin
			</FormTitle>

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
					autoComplete="new-password"
					placeholder="Set your password"
					icon={LockIcon}
					value={password}
					handleChange={setPassword}
					required
				/>

				{error && <FormError>{error}</FormError>}

				<Button className="w-full">
					{isLoading && <LoaderIcon size={16} className="animate-spin" />}
					Register
				</Button>
			</FormContent>
		</FormWrapper>
	);
};

export { RegisterPage };
