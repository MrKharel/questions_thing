"use server";

import { validate } from "@/lib/validate";

const login = async ({
	email,
	password,
}: {
	email: string;
	password: string;
}) => {
	const checks = validate({ email, password });
	if (!checks.valid) return { data: null, error: { message: checks.message } };

	return {
		data: null,
		error: { message: "CLIENT ISN'T MADE. What do youe expect?" },
	};
};

export { login };
