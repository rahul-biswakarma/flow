import type { UserResponse } from "@supabase/supabase-js";
import { createSupabaseClient } from "@v1/supabase/client";
import type { Tables } from "../types";
import {
  createProjectQuery,
  getAuthUserQuery,
  getProjectBySlugQuery,
  getProjectMembersQuery,
  getProjectWithPagesQuery,
  getUserDetailsQuery,
  getUserProjectsQuery,
} from "./queries";

const supabase = createSupabaseClient();

export async function getAuthUser(): Promise<UserResponse> {
  return getAuthUserQuery({ supabase });
}

export async function getUserDetails(): Promise<Tables<"users"> | null> {
  return getUserDetailsQuery({ supabase });
}

export async function getUserProjects({
  userId,
  page = 1,
}: {
  userId: string;
  page: number;
}): Promise<Tables<"projects">[]> {
  return getUserProjectsQuery({ supabase, userId, page });
}

export async function getProjectWithPages(slug: string): Promise<
  | (Tables<"projects"> & {
      pages: Tables<"pages">[];
    })
  | null
> {
  return getProjectWithPagesQuery({
    supabase,
    slug,
  });
}

export async function createProject(project: Tables<"projects">) {
  return createProjectQuery({ supabase, project });
}

export const getProjectBySlug = async (slug: string) => {
  return getProjectBySlugQuery({ supabase, slug });
};

export async function addProjectMember(
  membership: Tables<"project_memberships">,
) {
  return getProjectMembersQuery({ supabase, membership });
}
