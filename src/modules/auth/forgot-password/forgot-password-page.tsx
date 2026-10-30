"use client";
import { useState } from "react";
import { Loader2Icon, MailIcon, MailCheckIcon, ArrowUpRightIcon } from "lucide-react";
import { resetPasswordForEmail } from "@/features/auth/auth-actions";

import { Button } from "@/components/ui/button";
import { FormContent, FormTitle, FormHeader, FormInput, FormDescription } from "@/components/ui/form";
import {
	Dialog,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogClose,
	DialogContent,
} from "@/components/ui/dialog";

import type { SubmitEvent } from "react";

const ForgotPasswordPage = () => {
	const [email, setEmail] = useState("");
	const [state, setState] = useState({ isLoading: false, error: null as null | string });
	const [isDialogOpen, setIsDialogOpen] = useState(false);

	async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
		e.preventDefault();
		setState({ isLoading: true, error: null });

		try {
			const { error } = await resetPasswordForEmail(email);
			if (error) {
				throw new Error(error.message);
			}
			setIsDialogOpen(true);
		} catch (error: unknown) {
			const message = error instanceof Error ? error.message : String(error);
			setState((prev) => ({ ...prev, error: message }));
		} finally {
			setState((prev) => ({ ...prev, isLoading: false }));
		}
	}

	return (
		<>
			<FormHeader className="self-center">
				<FormTitle>Forgot Password</FormTitle>
				<FormDescription>Forgot your password? No worries. Get back where you left off.</FormDescription>
			</FormHeader>

			{state.error && <p className="self-center text-sm text-rose-400">{state.error}</p>}

			<FormContent onSubmit={handleSubmit}>
				<FormInput
					type="email"
					icon={MailIcon}
					placeholder={"Enter your email"}
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					autoFocus
					required
				/>

				<Button type="submit" className={"relative"} disabled={state.isLoading}>
					Continue
					{state.isLoading && <Loader2Icon className="size-4 animate-spin absolute top-1/2 -translate-y-1/2 right-2" />}
				</Button>
			</FormContent>

			<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
				<DialogContent className="max-w-sm gap-6 p-6 sm:p-7">
					<DialogHeader className="items-center gap-3 text-center">
						<div className="flex size-14 items-center justify-center rounded-2xl border bg-muted/50">
							<MailCheckIcon className="size-7 text-foreground" />
						</div>

						<div className="space-y-1.5">
							<DialogTitle className="text-xl font-semibold tracking-tight">Check your inbox</DialogTitle>

							<DialogDescription className="text-sm leading-relaxed">
								We've sent a magic link to <span className="font-medium text-foreground break-all">{email}</span>. Open
								the link in your email to verify your identity and continue.
							</DialogDescription>
						</div>
					</DialogHeader>

					<div className="flex flex-col gap-2">
						<Button
							className="w-full gap-2"
							nativeButton={false}
							render={<a href="https://mail.google.com/" target="_blank" rel="noreferrer" />}>
							Check your email
							<ArrowUpRightIcon className="size-4" />
						</Button>

						<DialogClose render={<Button variant="outline" className="w-full" />}>Maybe later</DialogClose>
					</div>

					<p className="text-center text-xs leading-relaxed text-muted-foreground">
						Didn't receive the email? Check your spam folder.
					</p>
				</DialogContent>
			</Dialog>
		</>
	);
};

export { ForgotPasswordPage };
