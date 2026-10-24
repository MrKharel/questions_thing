export type Response<Type> = Promise<{ message: string; code?: string } | Type>;

export type AppErrorCode = "UNAUTHORIZED" | "VALIDATION" | "NOT_FOUND" | "CONFLICT" | "DATABASE";

export class AppError extends Error {
	code: AppErrorCode;
	constructor(code: AppErrorCode, message: string) {
		super(message);
		this.name = "AppError";
		this.code = code;
	}
}
