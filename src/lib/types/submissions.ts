import type { iso } from "./";

export type Submissions = {
  id: string; // primary
  student_id: string;
  content: string | null;
  grade: string;
  submitted_at: iso;
  updated_at: iso;
};
