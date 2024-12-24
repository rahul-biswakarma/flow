import type { UserResponse } from "@supabase/supabase-js";

import { supabaseOption } from "@flow/utils/supabase";
import { createSupabaseClient } from "@ren/supabase/client";
import type { Tables } from "../internal-data-contract";
import {
  addComponentPropertiesRelationQuires,
  addProjectComponentRelationQuery,
  addUserProjectRelationQuery,
  createComponentQuery,
  createProjectQuery,
  createPropertiesQuery,
  getAuthUserQuery,
  getProjectBySlugQuery,
  getProjectWithPagesQuery,
  getUserDetailsQuery,
  getUserProjectsQuery,
  updateProjectConfigQuery,
} from "./queries";

const supabase = createSupabaseClient(supabaseOption);

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

export async function updateProjectConfig(slug: string, config: object) {
  await updateProjectConfigQuery({ supabase, slug, config });
}

export async function createProject(project: Tables<"projects">) {
  return createProjectQuery({ supabase, project });
}

export const getProjectBySlug = async (slug: string) => {
  return getProjectBySlugQuery({ supabase, slug });
};

export async function addProjectMember(membership: Tables<"user_projects">) {
  return addUserProjectRelationQuery({ supabase, membership });
}

export async function createProjectWithMember(
  slug: string,
  name: string,
  onSuccess?: (project: Tables<"projects">) => void,
) {
  const user = await getUserDetails();

  if (!user) {
    throw new Error("User not found");
  }

  // Check if slug is already taken
  const projectsWithSameSlug = await getProjectBySlug(slug);
  if (projectsWithSameSlug.length > 0) {
    throw new Error("Slug already taken");
  }

  // Create project
  const projectData = {
    name,
    slug,
    created_by: user.id,
  } as unknown as Tables<"projects">;
  const project = await createProject(projectData);

  if (project.id) {
    // Add project member
    await addProjectMember({
      project_id: project.id,
      user_id: user.id,
    } as unknown as Tables<"user_projects">);

    onSuccess?.(project);
  } else {
    throw new Error("Failed to create project");
  }
}

export async function createComponent({
  component,
  properties,
  projectId,
}: {
  component: Tables<"components">;
  properties: Tables<"properties">[];
  projectId: string;
}) {
  try {
    // Create component and properties in parallel if properties exist
    const [componentResponse, propsResponse] = await Promise.all([
      createComponentQuery({ supabase, component }),
      properties.length > 0
        ? createPropertiesQuery({ supabase, properties })
        : Promise.resolve(null),
    ]);

    if (!componentResponse) {
      throw new Error("Failed to create component");
    }

    // Create relations in parallel if properties exist
    if (properties.length > 0 && propsResponse) {
      const propertyIds = propsResponse.map((prop) => prop.id);

      await Promise.all([
        addComponentPropertiesRelationQuires({
          supabase,
          componentId: componentResponse.id,
          properties: propertyIds,
        }),
        addProjectComponentRelationQuery({
          supabase,
          componentId: componentResponse.id,
          projectId,
        }),
      ]);
    } else {
      // If no properties, just create project component relation
      const projectComponentRelation = await addProjectComponentRelationQuery({
        supabase,
        componentId: componentResponse.id,
        projectId,
      });

      if (!projectComponentRelation) {
        throw new Error("Failed to create project component relation");
      }
    }

    return componentResponse;
  } catch (error) {
    throw new Error(
      `Failed to create component: ${error instanceof Error ? error.message : "Unknown error"}`,
    );
  }
}
