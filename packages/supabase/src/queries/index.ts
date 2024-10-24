import { logger } from "@v1/logger";
import { createClient } from "@v1/supabase/server";
import type { Database } from "../types/db";
type Tables = Database["public"]["Tables"];

export async function getUser() {
  const supabase = await createClient();

  try {
    const result = await supabase.auth.getUser();

    return result;
  } catch (error) {
    logger.error(error);

    throw error;
  }
}

export async function getUserDetails() {
  const supabase = await createClient();

  try {
    // Get the authenticated user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) throw authError;

    if (!user) {
      return null;
    }

    // Fetch user details
    const { data, error: detailsError } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (detailsError) throw detailsError;

    return data;
  } catch (error) {
    console.error("Error fetching user information:", error);
    return null;
  }
}

export async function getProjects(userId: string) {
  const supabase = await createClient();

  try {
    const { data, error } = await supabase
      .from("project_memberships")
      .select(`
        project_id,
        projects (
          id,
          name,
          slug,
          description,
          created_at,
          updated_at
        )
      `)
      .eq("user_id", userId);

    if (error) throw error;

    // Extract the projects from the joined data
    const projects = data
      ?.map((item) => item.projects)
      .filter(
        (project): project is Tables["projects"]["Row"] => project !== null,
      );

    return projects || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export async function getProject(projectSlug: string) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", projectSlug)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error fetching project:", error);
    throw error;
  }
}
export async function getProjectWithPages(projectSlug: string) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("projects")
      .select("*, pages(*)")
      .eq("slug", projectSlug)
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error fetching project with pages:", error);
    throw error;
  }
}

export async function createProject(project: Tables["projects"]["Insert"]) {
  const supabase = await createClient();
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
  const supabase = await createClient();
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
  const supabase = await createClient();
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

export async function createRole(role: Tables["roles"]["Insert"]) {
  const supabase = await createClient();
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
export async function getUserRoles(userId: string) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("user_roles")
      .select("*, roles(*)")
      .eq("user_id", userId);
    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error fetching user roles:", error);
    throw error;
  }
}
export async function assignUserRole(userRole: Tables["user_roles"]["Insert"]) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("user_roles")
      .insert(userRole)
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error assigning user role:", error);
    throw error;
  }
}
export async function getProjectMembers(projectId: string) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("project_memberships")
      .select("*, users(*)")
      .eq("project_id", projectId);
    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error fetching project members:", error);
    throw error;
  }
}
export async function addProjectMember(
  membership: Tables["project_memberships"]["Insert"],
) {
  const supabase = await createClient();
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
export async function getProjectPages(projectId: string) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("pages")
      .select("*")
      .eq("project_id", projectId);
    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error fetching project pages:", error);
    throw error;
  }
}
export async function createPage(page: Tables["pages"]["Insert"]) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("pages")
      .insert(page)
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error creating page:", error);
    throw error;
  }
}
export async function getProjectCustomNodes(projectId: string) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("custom_nodes")
      .select("*")
      .eq("project_id", projectId);
    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error fetching project components:", error);
    throw error;
  }
}
export async function createCustomNodes(
  component: Tables["custom_nodes"]["Insert"],
) {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase
      .from("custom_nodes")
      .insert(component)
      .select()
      .single();
    if (error) throw error;
    return data;
  } catch (error) {
    logger.error("Error creating component:", error);
    throw error;
  }
}
