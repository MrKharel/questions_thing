import type { iso } from "./";

export type Class = {
  id: string; // primary
  subject: string;
  description: string | null;
  visibility: "private" | "public";
  max_members: number;
  allow_late_submissions: boolean;
  members_can_see_eachother: boolean;
  students_can_comment: boolean;
  created_by: string;
  created_at: iso;
  updated_at: iso;
};

export type Member = {
  class_id: string; // primary
  user_id: string; // primary
  role: string;
  created_at: iso;
};

export type InviteStatus = "pending" | "resolved";

export type Invite = {
  id: string; // primary
  class_id: string;
  invited_by: string;
  invited_user: string;
  role: string;
  status: Invite;
  created_at: iso;
  updated_at: iso;
};
