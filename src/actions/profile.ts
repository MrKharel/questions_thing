"use server";
import z from "zod";
import createClient from "@/lib/supabase/server";

import { AppError } from ".";
import type { Response } from ".";

const ProfileSchema = z.object({
	id: z.string(),
	username: z
		.string()
		.min(3, "Username must be at least 3 characters")
		.max(30, "Username must be at most 30 characters")
		.regex(/^[a-zA-Z0-9_]+$/, "Username can only contain letters, numbers and underscores"),
	displayName: z.string().max(50, "Display name must be at most 50 characters").nullable(),
	email: z.string().email("Invalid email address"),
	avatar: z.string().url("Avatar must be a valid URL").nullable(),
	location: z.string().max(100, "Location must be at most 100 characters").nullable(),
	bio: z.string().max(500, "Bio must be at most 500 characters").nullable(),
	preferredRoles: z.string().max(200, "Preferred roles must be at most 200 characters").nullable(),
	createdAt: z.string(),
	updatedAt: z.string(),
	deletedAt: z.string().nullable().optional(),
});

const ProfilePatchSchema = ProfileSchema.omit({
	id: true,
	email: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true,
})
	.partial()
	.strict()
	.refine((patch) => Object.keys(patch).length > 0, {
		message: "Nothing to update",
	});

export type Profile = z.infer<typeof ProfileSchema>;
export type ProfilePatches = z.infer<typeof ProfilePatchSchema>;

const toAppError = (error: { code?: string; message: string }) => {
	if (error.code === "PGRST116") return new AppError("NOT_FOUND", "Profile not found");
	if (error.code === "23505") return new AppError("CONFLICT", "That username is already taken");
	return new AppError("DATABASE", "Unexpected error occured");
};

export const getProfile = async (): Response<Profile> => {
	const supabase = await createClient();

	const { data, error } = await supabase.from("profiles").select("*").is("deletedAt", null).single();
	if (error) throw toAppError(error);

	const parsed = ProfileSchema.safeParse(data);
	if (!parsed.success) throw new AppError("DATABASE", "Profile data is malformed");

	return data;
};

export const updateProfile = async (updates: ProfilePatches): Response<Profile> => {
	const parsedPatch = ProfilePatchSchema.safeParse(updates);
	if (!parsedPatch.success) {
		throw new AppError("VALIDATION", parsedPatch.error.issues[0].message);
	}

	const supabase = await createClient();

	const { data, error } = await supabase
		.from("profiles")
		.update({ ...parsedPatch.data })
		.is("deletedAt", null)
		.select()
		.single();
	if (error) throw toAppError(error);

	const parsed = ProfileSchema.safeParse(data);
	if (!parsed.success) throw new AppError("DATABASE", "Profile data is malformed");

	return parsed.data;
};
