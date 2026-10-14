export type iso =
  `${number}-${number}-${number}T${number}:${number}:${number}Z`;

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

export type Class = {
  id: string; // primary
  subject: string;
  description: string | null;
  created_by: string;
  created_at: iso;
  updated_at: iso;
};

export type ClassMember = {
  class_id: string; // primary
  user_id: string; // primary
  role: string;
  created_at: iso;
};

export type ClassMemberInviteStatus = "pending" | "resolved";

export type ClassMemberInvite = {
  id: string; // primary
  class_id: string;
  invited_by: string;
  invited_user: string;
  role: string;
  status: ClassMemberInvite;
  created_at: iso;
  updated_at: iso;
};

export type Assignments = {
  id: string; // primary
  class_id: string;
  title: string;
  description: string | null;
  due_at: iso;
  assigned_by: string;
  assigned_at: iso;
  update_at: iso;
};

export type Submissions = {
  id: string; // primary
  student_id: string;
  content: string | null;
  grade: string;
  submitted_at: iso;
  updated_at: iso;
};

export type ApiResponse<T> =
  | {
      success: true;
      data: T;
    }
  | {
      success: false;
      error: {
        message: string;
        hint: string | null;
        status: string | null;
        code: string | null;
      };
    };
