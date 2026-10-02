"use server";

const login = async (): Promise<{
	data: null | Object;
	error: null | Object;
}> => {
	return { data: null, error: { message: "Invalid user creditienals" } };
};

export { login };
