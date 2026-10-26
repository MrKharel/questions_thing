"use server";
import z from "zod";
import createClient from "@/lib/supabase/server";

import { AppError } from ".";
import type { Response } from ".";

const ClassSchema = z.object({
	id: z.string(),
	title: z
		.string()
		.min(3, "Title must be at least 3 characters")
		.max(40, "Title must be at most 40 characters")
		.regex(/^[a-zA-Z0-9_]+$/, "Title can only contain letters, numbers and underscores"),
	description: z.string().nullable().optional(),
	teacher: z.string(),
	createdBy: z.string(),
	createdAt: z.string(),
	updatedAt: z.string(),
	deletedAt: z.string().nullable().optional(),
});

const ClassPostSchema = ClassSchema.omit({
	id: true,
	teacher: true,
	createdBy: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true,
}).strict();

const ClassPatchSchema = ClassSchema.omit({
	id: true,
	createdBy: true,
	createdAt: true,
	updatedAt: true,
	deletedAt: true,
})
	.partial()
	.strict()
	.refine((patch) => Object.keys(patch).length > 0, {
		message: "Nothing to update",
	});

const IdSchema = z.string().min(1, "Class id is required");

export type Class = z.infer<typeof ClassSchema>;
export type ClassPost = z.infer<typeof ClassPostSchema>;
export type ClassPatches = z.infer<typeof ClassPatchSchema>;

// constants
const CLASS_COLUMNS = "id, title, description, teacher, createdBy, createdAt, updatedAt, deletedAt";

// helpers
const toAppError = (error: { code?: string; message: string }) => {
	if (error.code === "PGRST116") return new AppError("NOT_FOUND", "Class not found");
	if (error.code === "23505") return new AppError("CONFLICT", "A class with this title already exists");
	if (error.code === "42501") return new AppError("FORBIDDEN", "You are not allowed to do that");
	return new AppError("DATABASE", error.message);
};

const parseInput = <T extends z.ZodType>(schema: T, input: unknown): z.infer<T> => {
	const parsed = schema.safeParse(input);
	if (!parsed.success) throw new AppError("VALIDATION", parsed.error.issues[0]?.message ?? "Invalid input");
	return parsed.data;
};

const parseClass = (data: unknown): Class => {
	const parsed = ClassSchema.safeParse(data);
	if (!parsed.success) throw new AppError("DATABASE", "Class data is malformed");
	return parsed.data;
};

export async function getClassByTitle({ title, username }: { title: string; username: string }): Response<Class> {
	const supabase = await createClient();

	// `!teacher!inner` pins the join to the teacher column, so the username filter
	// always means "the teacher's username" (and works even if createdBy also points at profiles).
	const { data, error } = await supabase
		.from("classes")
		.select(`${CLASS_COLUMNS}, profiles!teacher!inner(username)`)
		.eq("title", title)
		.eq("profiles.username", username)
		.is("deletedAt", null)
		.single();
	if (error) throw toAppError(error);

	return parseClass(data);
}

export async function postClassByTitle(inserts: ClassPost): Response<Class> {
	const values = parseInput(ClassPostSchema, inserts);

	const supabase = await createClient();

	// teacher and createdBy are filled by the database (column default auth.uid()),
	// and RLS rejects the insert for anonymous users.
	const { data, error } = await supabase.from("classes").insert(values).select(CLASS_COLUMNS).single();
	if (error) throw toAppError(error);

	return parseClass(data);
}

export async function patchClass({ id, patches }: { id: string; patches: ClassPatches }): Response<Class> {
	const classId = parseInput(IdSchema, id);
	const updates = parseInput(ClassPatchSchema, patches);

	const supabase = await createClient();

	// RLS decides who may edit; an empty result (not yours / deleted / missing) surfaces as NOT_FOUND.
	const { data, error } = await supabase
		.from("classes")
		.update(updates)
		.eq("id", classId)
		.is("deletedAt", null)
		.select(CLASS_COLUMNS)
		.single();
	if (error) throw toAppError(error);

	return parseClass(data);
}

export async function deleteClass({ id }: { id: string }): Response<true> {
	const classId = parseInput(IdSchema, id);

	const supabase = await createClient();

	// Soft delete. The id filter is essential: without it every class would be marked deleted.
	const { error } = await supabase
		.from("classes")
		.update({ deletedAt: new Date().toISOString() })
		.eq("id", classId)
		.is("deletedAt", null)
		.select("id")
		.single();
	if (error) throw toAppError(error);

	return true;
}
