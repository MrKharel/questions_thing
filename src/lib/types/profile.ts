import type { iso } from "./";

export type Profile = {
  id: string; // primary
  email: string | null;
  username: string;
  display_name: string;
  avatar: string | null;
  bio: string | null;
  location: string | null;
  created_at: iso;
  updated_at: iso;
};
