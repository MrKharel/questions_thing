const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX =
	/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])[\s\S]+$/;
const USERNAME_REGEX = /^[A-Za-z ]+$/;

type Props = { email?: string; password?: string; username?: string };

type Return = { valid: boolean; message?: string };

const validate = ({ email, username, password }): Return => {
	// Check for email
	if (email !== undefined && !EMAIL_REGEX.test(email))
		return {
			valid: false,
			message: "Invalid Email",
		};

	// Check for password
	if (password !== undefined) {
		if (password.length < 8)
			return {
				valid: false,
				message: "Password must be more than 8 character long",
			};
		if (password.length > 64)
			return {
				valid: false,
				message: "Password must be less than 64 characters long",
			};
		if (!PASSWORD_REGEX.test(password))
			return {
				valid: false,
				message:
					"Password must contain one uppercase letter, lowercase letter, symbol and number",
			};
	}

	// Check for username
	if (username !== undefined) {
		if (username.length < 3)
			return {
				valid: false,
				message: "Username must be more than 3 characters long",
			};
		if (username.length > 16)
			return {
				valid: false,
				message: "Username must be less than 16 characters long",
			};
		if (!USERNAME_REGEX.test(username))
			return {
				valid: false,
				message:
					"Username must not contain any special symbols. Gaps and uppercase letters are good though.",
			};
	}

	return { valid: true };
};

export { validate };
