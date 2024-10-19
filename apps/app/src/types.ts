import type { Tables } from "@v1/supabase/types";

export type User = Tables<"users">;

export type Project = Tables<"projects">;

export type ProjectWithPages = Tables<"projects"> & {
  pages: Tables<"pages">[];
};
