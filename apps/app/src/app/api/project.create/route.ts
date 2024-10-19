import { logger } from "@v1/logger";
import {
  addProjectMember,
  createProject,
  getProjectBySlug,
  getUser,
} from "@v1/supabase/queries";
import type {} from "next";
import { NextResponse } from "next/server";
import { z } from "zod";

const projectSchema = z.object({
  name: z.string(),
  slug: z.string(),
});

export async function POST(request: Request) {
  try {
    const {
      data: { user },
      error: authError,
    } = await getUser();

    if (authError || !user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = projectSchema.parse(body);

    const projectData = {
      ...validatedData,
      created_by: user.id,
      admins: [user.id],
    };

    const projectsWithSameSlug = await getProjectBySlug(projectData.slug);

    if (projectsWithSameSlug.length > 0) {
      return NextResponse.json(
        { error: "Slug already taken" },
        { status: 400 },
      );
    }

    const project = await createProject(projectData);

    if (project.id) {
      await addProjectMember({
        project_id: project.id,
        user_id: user.id,
      });
    }

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    logger.error("Error creating project:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid project data" },
        { status: 400 },
      );
    }

    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
}
