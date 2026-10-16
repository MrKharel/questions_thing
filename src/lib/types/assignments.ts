import type { iso } from "./";

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
