"use server";

import { validate } from "@/lib/validate";

type Props = { email: string; password: string };

const register = async ({ email, password }: Props) => {
	const checks = validate({ email, password });
	if (!checks.valid) return { data: null, error: { message: checks.message } };

	return {
		data: null,
		error: { message: "CLIENT ISN'T MADE. What do you expect?" },
	};
};

export { register };
