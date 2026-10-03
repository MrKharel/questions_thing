type Error = { message: string; [key: string]: unknown };

type Data = { [key: string]: unknown };

export const ActionPromise = Promise<
	{ data: null; error: Error } | { data: Data; error: null }
>;
