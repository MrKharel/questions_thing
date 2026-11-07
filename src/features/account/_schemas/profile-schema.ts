import z from "zod";

export const ProfileSchema = z.object({
  id: z.string(),
  name: z.string(),
  first_name: z.string().nullish(),
  last_name: z.string().nullish(),
  email: z.string().nullish(),
  avatar_url: z.string().nullish(),
  location: z.string().nullish(),
  bio: z.string().nullish(),
  website: z.string().nullish(),
  created_at: z.string(),
  updated_at: z.string(),
});

export const ProfilePostSchema = ProfileSchema.omit({ id: true, updated_at: true, created_at: true, email: true });

export const ProfilePatchSchema = ProfileSchema.omit({ id: true, email: true, created_at: true, updated_at: true }).partial();

export type Profile = z.infer<typeof ProfileSchema>;
export type ProfilePost = z.infer<typeof ProfilePostSchema>;
export type ProfilePatch = z.infer<typeof ProfilePatchSchema>;
