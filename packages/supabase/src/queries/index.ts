import type { UserResponse } from "@supabase/supabase-js";
import { logger } from "@v1/logger";
import { createSupabaseClient } from "@v1/supabase/client";
import type { Tables } from "../types";

const supabase = createSupabaseClient();
const BATCH_SIZE = 20;

export async function getAuthUser(): Promise<UserResponse> {
  try {
    const response = await supabase.auth.getUser();

    return response;
  } catch (error) {
    logger.error("Error in getUser:", error);
    throw error;
  }
}

export async function getUserDetails(): Promise<Tables<"users"> | null> {
  try {
    const { data, error: authError } = await getAuthUser();

    if (authError) throw authError;
    if (!data) return null;

    const { data: response, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", data.user.id)
      .single();
    if (error) throw error;

    return response;
  } catch (error) {
    logger.error("Error in getUserDetails:", error);
    return null;
  }
}

export async function getUserProjects({
  userId,
  page = 1,
}: {
  userId: string;
  page: number;
}): Promise<Tables<"projects">[]> {
  try {
    const { data, error: authError } = await getAuthUser();

    if(authError) throw authError;

    const { data: response, error } = await supabase
      .from("project_memberships")
      .select(`project_id, projects (  id,
          name,
          slug,
          description,
          created_at,
          updated_at )`)
      .eq("user_id", userId)
      .range(page * BATCH_SIZE - BATCH_SIZE, page * BATCH_SIZE - 1);

    if (error) throw error;

    const projects = response
      ?.map((item) => item.projects)
      .filter((project): project is Tables<"projects"> => project !== null);

    return projects ?? [];
  } catch (error) {
    logger.error("Error in getProjects:", error);
    return [];
  }
}

export async function getProjectWithPages(slug: string): Promise<
  | (Tables<"projects"> & {
      pages: Tables<"pages">[];
    })
  | null
> {
  const {
    data: { user },
    error: authError,
  } = await getAuthUser();

  if (authError || !user) throw authError;

  try {
    const { data: response, error: projectError } = await supabase
      .from("projects")
      .select("*, pages(*)")
      .eq("slug", slug)
      .single();

    if (projectError) throw projectError;
    return response;
  } catch (error) {
    logger.error("Error in getProjectWithPages:", error);
    return null;
  }
}

export async function createProject(project: Tables<"projects">) {
  const {
    data: { user },
    error: authError,
  } = await getAuthUser();

  if (authError || !user) throw authError;

  try {
    const { data, error } = await supabase
      .from("projects")
      .insert(project)
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error creating project:", error);
    throw error;
  }
}

export const getProjectBySlug = async (slug: string) => {
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug);
    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error fetching project by slug:", error);
    throw error;
  }
};

export async function getRolesForProject(projectId: string) {
  try {
    const { data, error } = await supabase
      .from("roles")
      .select("*")
      .eq("project_id", projectId);
    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error fetching roles:", error);
    throw error;
  }
}

export async function createRole(role: Tables<"roles">) {
  try {
    const { data, error } = await supabase
      .from("roles")
      .insert(role)
      .select()
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error creating role:", error);
    throw error;
  }
}

export async function addProjectMember(
  membership: Tables<"project_memberships">,
) {
  try {
    const { data, error } = await supabase
      .from("project_memberships")
      .insert(membership)
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error adding project member:", error);
    throw error;
  }
}
