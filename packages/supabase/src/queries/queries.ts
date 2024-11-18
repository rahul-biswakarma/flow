import type { SupabaseClient } from "@supabase/supabase-js";
import { logger } from "@v1/logger";
import type { Tables } from "../types";

const BATCH_SIZE = 20;

export const getAuthUserQuery = async ({
  supabase,
}: { supabase: SupabaseClient }) => {
  try {
    const response = supabase.auth.getUser();

    return response;
  } catch (error) {
    logger.error("Error in getUser:", error);
    throw error;
  }
};

export const getUserDetailsQuery = async ({
  supabase,
}: { supabase: SupabaseClient }) => {
  try {
    const { data, error: authError } = await getAuthUserQuery({ supabase });

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
};

export const getUserProjectsQuery = async ({
  supabase,
  userId,
  page,
}: { supabase: SupabaseClient; userId: string; page: number }): Promise<
  Tables<"projects">[]
> => {
  try {
    const { error: authError } = await getAuthUserQuery({ supabase });

    if (authError) throw authError;

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
      .filter((project) => project !== null) as unknown as Promise<
      Tables<"projects">[]
    >;

    return projects ?? [];
  } catch (error) {
    logger.error("Error in getProjects:", error);
    return [];
  }
};

export const getProjectWithPagesQuery = async ({
  supabase,
  slug,
}: {
  supabase: SupabaseClient;
  slug: string;
}) => {
  const {
    data: { user },
    error: authError,
  } = await getAuthUserQuery({
    supabase,
  });

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
};

export const createProjectQuery = async ({
  supabase,
  project,
}: {
  supabase: SupabaseClient;
  project: Tables<"projects">;
}) => {
  const {
    data: { user },
    error: authError,
  } = await getAuthUserQuery({
    supabase,
  });

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
};

export const getProjectBySlugQuery = async ({
  supabase,
  slug,
}: {
  supabase: SupabaseClient;
  slug: string;
}) => {
  try {
    const {
      data: { user },
      error: authError,
    } = await getAuthUserQuery({
      supabase,
    });

    if (authError || !user) throw authError;
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

export const getProjectMembersQuery = async ({
  supabase,
  membership,
}: { supabase: SupabaseClient; membership: Tables<"project_memberships"> }) => {
  try {
    const {
      data: { user },
      error: authError,
    } = await getAuthUserQuery({
      supabase,
    });

    if (authError || !user) throw authError;

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
};
