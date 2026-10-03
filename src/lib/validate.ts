const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s])\S+$/;
const USERNAME_REGEX = /^[A-Za-z]+( [A-Za-z]+)*$/;

type Props = {
	email?: string | null;
	password?: string | null;
	username?: string | null;
};
type Return = { valid: true } | { valid: false; message: string };

const fail = (message: string): Return => ({ valid: false, message });

const validate = ({ email, username, password }: Props): Return => {
	if (email != null) {
		if (email.length > 254 || !EMAIL_REGEX.test(email))
			return fail("Invalid email");
	}

	if (password != null) {
		if (password.length < 8)
			return fail("Password must be at least 8 characters long");
		if (password.length > 64)
			return fail("Password must be at most 64 characters long");
		if (!PASSWORD_REGEX.test(password))
			return fail(
				"Password must contain an uppercase letter, a lowercase letter, a number and a symbol, with no spaces",
			);
	}

	if (username != null) {
		if (username.length < 3)
			return fail("Username must be at least 3 characters long");
		if (username.length > 16)
			return fail("Username must be at most 16 characters long");
		if (!USERNAME_REGEX.test(username))
			return fail(
				"Username can only contain letters, with single spaces between words",
			);
	}

	return { valid: true };
};

export { validate };
