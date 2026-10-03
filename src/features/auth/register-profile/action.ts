"use server";

import { validate } from "@/lib/validate";

type Props = { username: string };

const registerProfile = async ({ username }: Props) => {
	const checks = validate({ username });
	if (!checks.valid) return { data: null, error: { message: checks.message } };

	return {
		data: null,
		error: { message: "No client exists, what do you expect?" },
	};
};

export { registerProfile };
