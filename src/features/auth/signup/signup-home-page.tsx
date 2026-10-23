"use client";
import { useState } from "react";
import { KeyIcon, Loader2Icon, MailIcon } from "lucide-react";
import { FormContent, FormHeader, FormInput, FormTitle } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { signupWithEmail } from "../auth-actions";

export function SignupHomePage() {
	const [formdata, setFormdata] = useState({ email: "", password: "" });
	const [state, setState] = useState({ isLoading: false, error: null as null | string });

	const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		setState({ isLoading: true, error: null });

		try {
			const { error } = await signupWithEmail(formdata);
			if (error) {
				throw new Error(error.message);
			}
		} catch (error: unknown) {
			const message = error instanceof Error ? error.message : String(error);
			setState((prev) => ({ ...prev, error: message }));
		} finally {
			setState((prev) => ({ ...prev, isLoading: false }));
		}
	};

	return (
		<FormContent onSubmit={handleSubmit} className="gap-2">
			<FormHeader className="self-center">
				<FormTitle>Signup with [TODO]</FormTitle>
			</FormHeader>

			{state.error && <p className="text-sm text-rose-400 self-center">{state.error}</p>}

			<FormInput
				icon={MailIcon}
				placeholder="you@gmail.com"
				type="email"
				autoComplete="email"
				label={<>Email</>}
				value={formdata.email}
				onChange={(e) => setFormdata((prev) => ({ ...prev, email: e.target.value }))}
				required
				autoFocus
			/>
			<FormInput
				icon={KeyIcon}
				placeholder="very-strong-password-1"
				type="password"
				autoComplete="new-password"
				label={<>Password</>}
				value={formdata.password}
				onChange={(e) => setFormdata((prev) => ({ ...prev, password: e.target.value }))}
				required
			/>
			<Button disabled={state.isLoading} type="submit" className={"relative"}>
				Signup with Email
				{state.isLoading && <Loader2Icon className="absolute top-1/2 -translate-y-1/2 right-2 animate-spin" />}
			</Button>
		</FormContent>
	);
}
