import type { UserResponse } from "@supabase/supabase-js";

import { supabaseOption } from "@flow/utils/supabase";
import { createSupabaseClient } from "@ren/supabase/server";
import type { Tables } from "../internal-data-contract";
import {
  countComponentsByStatusQuery,
  listComponentsSummaryByStatusQuery,
} from "./queries";
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
  const supabase = await createSupabaseClient(supabaseOption);
  return getAuthUserQuery({ supabase });
}

export async function getUserDetails(): Promise<Tables<"users"> | null> {
  const supabase = await createSupabaseClient(supabaseOption);
  return getUserDetailsQuery({ supabase });
}

export async function getUserProjects({
  userId,
  page = 1,
}: {
  userId: string;
  page: number;
}): Promise<Tables<"projects">[]> {
  const supabase = await createSupabaseClient(supabaseOption);
  return getUserProjectsQuery({ supabase, userId, page });
}

export async function getProjectWithPages(slug: string): Promise<
  | (Tables<"projects"> & {
      pages: Tables<"pages">[];
    })
  | null
> {
  const supabase = await createSupabaseClient(supabaseOption);
  return getProjectWithPagesQuery({ supabase, slug });
}

export async function createProject(project: Tables<"projects">) {
  const supabase = await createSupabaseClient(supabaseOption);

  return createProjectQuery({ supabase, project });
}

export const getProjectBySlug = async (slug: string) => {
  const supabase = await createSupabaseClient(supabaseOption);
  return getProjectBySlugQuery({ supabase, slug });
};

export async function addProjectMember(membership: Tables<"user_projects">) {
  const supabase = await createSupabaseClient(supabaseOption);
  return addUserProjectRelationQuery({ supabase, membership });
}

export async function listComponentsSummaryByStatus(
  projectId: string,
  status: Tables<"components">["status"],
  page = 1,
  countPerPage?: number,
) {
  const supabase = await createSupabaseClient(supabaseOption);
  return listComponentsSummaryByStatusQuery({
    supabase,
    projectId,
    status,
    page,
    countPerPage,
  });
}

export async function listComponentsByStatus(
  projectId: string,
  status: Tables<"components">["status"],
  page = 1,
  countPerPage?: number,
) {
  const supabase = await createSupabaseClient(supabaseOption);
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
  const supabase = await createSupabaseClient(supabaseOption);
  return countComponentsByStatusQuery({ supabase, projectId, status });
}
