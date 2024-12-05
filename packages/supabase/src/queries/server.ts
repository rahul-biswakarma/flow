import type { UserResponse } from "@supabase/supabase-js";
import { createSupabaseClient } from "@v1/supabase/server";
import type { Tables } from "../types";
import { countComponentsByStatusQuery } from "./queries";
import {
  addUserProjectRelationQuery,
  createProjectQuery,
  getAuthUserQuery,
  getProjectBySlugQuery,
  getProjectWithPagesQuery,
  getUserDetailsQuery,
  getUserProjectsQuery,
  listComponentsByStatusQuery,
} from "./queries";

export async function getAuthUser(): Promise<UserResponse> {
  const supabase = await createSupabaseClient();
  return getAuthUserQuery({ supabase });
}

export async function getUserDetails(): Promise<Tables<"users"> | null> {
  const supabase = await createSupabaseClient();
  return getUserDetailsQuery({ supabase });
}

export async function getUserProjects({
  userId,
  page = 1,
}: {
  userId: string;
  page: number;
}): Promise<Tables<"projects">[]> {
  const supabase = await createSupabaseClient();
  return getUserProjectsQuery({ supabase, userId, page });
}

export async function getProjectWithPages(slug: string): Promise<
  | (Tables<"projects"> & {
      pages: Tables<"pages">[];
    })
  | null
> {
  const supabase = await createSupabaseClient();
  return getProjectWithPagesQuery({ supabase, slug });
}

export async function createProject(project: Tables<"projects">) {
  const supabase = await createSupabaseClient();

  return createProjectQuery({ supabase, project });
}

export const getProjectBySlug = async (slug: string) => {
  const supabase = await createSupabaseClient();
  return getProjectBySlugQuery({ supabase, slug });
};

export async function addProjectMember(membership: Tables<"user_projects">) {
  const supabase = await createSupabaseClient();
  return addUserProjectRelationQuery({ supabase, membership });
}

export async function listComponentsByStatus(
  projectId: string,
  status: Tables<"components">["status"],
  page = 1,
  countPerPage?: number,
) {
  const supabase = await createSupabaseClient();
  return listComponentsByStatusQuery({
    supabase,
    projectId,
    status,
    page,
    countPerPage,
  });
}

export async function countComponentsByStatus(
  projectId: string,
  status: Tables<"components">["status"],
) {
  const supabase = await createSupabaseClient();
  return countComponentsByStatusQuery({ supabase, projectId, status });
}
