"use client";

import { useState } from "react";
import {
	signInWithPassword as signInWithPasswordAction,
	signOut as signOutAction,
	signUp as signUpAction,
} from "@/lib/auth";
import { validate } from "@/lib/validate";

type Error = null | string;

const useSignUp = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error>(null);

	const signUp = async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		setIsLoading(true);
		const checks = validate({ email, password });
		if (!checks.valid) setError(checks.message);
		setError(null);

		const { error } = await signUpAction(email, password);
		if (error) setError(error.message);

		setIsLoading(false);
	};

	return { isLoading, error, signUp };
};

const useSignInWithPassword = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error>(null);

	const signInWithPassword = async ({
		email,
		password,
	}: {
		email: string;
		password: string;
	}) => {
		setIsLoading(true);
		const checks = validate({ email, password });
		if (!checks.valid) setError(checks.message);
		setError(null);

		const { error } = await signInWithPasswordAction(email, password);
		if (error) setError(error.message);
		setIsLoading(false);
	};

	return { isLoading, error, signInWithPassword };
};

const useSignOut = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<Error>(null);

	const signOut = async () => {
		setIsLoading(true);
		setError(null);

		const { error } = await signOutAction();
		if (error) setError(error.message);
		setIsLoading(false);
	};

	return { isLoading, error, signOut };
};

export { useSignInWithPassword, useSignOut, useSignUp };
