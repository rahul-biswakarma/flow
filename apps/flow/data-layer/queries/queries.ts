import { logger } from "@ren/logger";
import type { SupabaseClient } from "@supabase/supabase-js";
import type { Tables } from "../internal-data-contract";

const BATCH_SIZE = 20;

export const getAuthUserQuery = async ({
  supabase,
}: { supabase: SupabaseClient }) => {
  try {
    const response = await supabase.auth.getUser();

    return response;
  } catch (error) {
    logger.error("Error in getUser:", error);
    throw error;
  }
};

const verifyAuthUser = async ({ supabase }: { supabase: SupabaseClient }) => {
  const {
    data: { user },
    error: authError,
  } = await getAuthUserQuery({
    supabase,
  });

  if (authError || !user) throw authError;
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
      .eq("auth_id", data.user.id)
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
  page = 1,
}: { supabase: SupabaseClient; userId: string; page: number }): Promise<
  Tables<"projects">[]
> => {
  try {
    await verifyAuthUser({ supabase });

    const { data: response, error } = await supabase
      .from("user_projects")
      .select(`
          project_id,
          projects(id, name, slug)
      `)
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
  await verifyAuthUser({ supabase });

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
  await verifyAuthUser({ supabase });

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
    await verifyAuthUser({ supabase });

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

export const updateProjectConfigQuery = async ({
  supabase,
  slug,
  config,
}: {
  supabase: SupabaseClient;
  slug: string;
  config: object;
}) => {
  await verifyAuthUser({ supabase });

  try {
    const { data, error } = await supabase
      .from("projects")
      .update({ config })
      .eq("slug", slug)
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error updating project config:", error);
    throw error;
  }
};

export const addUserProjectRelationQuery = async ({
  supabase,
  membership,
}: { supabase: SupabaseClient; membership: Tables<"user_projects"> }) => {
  try {
    await verifyAuthUser({ supabase });

    const { data, error } = await supabase
      .from("user_projects")
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

export const createComponentQuery = async ({
  supabase,
  component,
}: {
  supabase: SupabaseClient;
  component: Tables<"components">;
}) => {
  await verifyAuthUser({ supabase });

  try {
    if (!component.code) {
      throw new Error("Component code is required");
    }

    const { data, error } = await supabase
      .from("components")
      .insert({
        ...component,
        code: Buffer.from(component.code).toString("base64"),
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error creating component:", error);
    throw error;
  }
};

export const createPropertiesQuery = async ({
  supabase,
  properties,
}: {
  supabase: SupabaseClient;
  properties: Tables<"properties">[];
}) => {
  await verifyAuthUser({ supabase });

  try {
    const { data, error } = await supabase
      .from("properties")
      .insert(properties)
      .select();
    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error creating properties:", error);
    throw error;
  }
};

export const addComponentPropertiesRelationQuires = async ({
  supabase,
  componentId,
  properties,
}: {
  supabase: SupabaseClient;
  componentId: string;
  properties: string[];
}) => {
  try {
    await verifyAuthUser({ supabase });

    const { data, error } = await supabase.from("component_properties").insert(
      properties.map((propertyId) => ({
        component_id: componentId,
        properties_id: propertyId,
      })),
    );
    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error adding project member:", error);
    throw error;
  }
};

export const addProjectComponentRelationQuery = async ({
  supabase,
  projectId,
  componentId,
}: {
  supabase: SupabaseClient;
  projectId: string;
  componentId: string;
}) => {
  try {
    await verifyAuthUser({ supabase });

    const { data, error } = await supabase
      .from("project_components")
      .insert({
        project_id: projectId,
        component_id: componentId,
      })
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error adding project component:", error);
    throw error;
  }
};

export const listComponentsByStatusQuery = async ({
  supabase,
  projectId,
  status,
  page = 1,
  countPerPage = BATCH_SIZE,
}: {
  page: number;
  supabase: SupabaseClient;
  projectId: string;
  status?: Tables<"components">["status"];
  countPerPage?: number;
}) => {
  try {
    await verifyAuthUser({ supabase });

    let query = supabase
      .from("project_components")
      .select(`
        component_id,
        components(name, id, status, description, keywords, updated_at)
      `)
      .eq("project_id", projectId)
      .range(page * countPerPage - countPerPage, page * countPerPage - 1);

    if (status) {
      query = query.eq("components.status", status);
    }

    const { data: response, error } = await query;

    if (error) throw error;

    const components = response
      ?.map((item) => item.components)
      .filter((component) => component !== null) as unknown as Promise<
      Tables<"components">[]
    >;

    return components ?? [];
  } catch (error) {
    logger.error("Error fetching components by status:", error);
    throw error;
  }
};

export const countComponentsByStatusQuery = async ({
  supabase,
  projectId,
  status,
}: {
  supabase: SupabaseClient;
  projectId: string;
  status?: Tables<"components">["status"];
}) => {
  try {
    await verifyAuthUser({ supabase });

    let query = supabase
      .from("project_components")
      .select(`
        components(id, status)
      `)
      .eq("project_id", projectId);

    if (status) {
      query = query.eq("components.status", status);
    }

    const { data, error } = await query;

    if (error) throw error;

    const filterComponents = data?.filter((item) => item.components) ?? [];
    return filterComponents?.length ?? 0;
  } catch (error) {
    logger.error("Error counting components by status:", error);
    throw error;
  }
};
