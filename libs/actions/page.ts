'use server';

import { prisma } from '../utils/db';

type PageData = {
  name: string;
  path: string;
  title: string;
  description: string;
  projectId: string;
  seoTitle: string;
  seoDescription: string;
  seoImage: string;
};

export const createPage = async (pageData: PageData) => {
  try {
    const page = await prisma.page.create({
      data: {
        name: pageData.name,
        path: pageData.path,
        title: pageData.title,
        description: pageData.description,
        config: JSON.stringify({}),
        project: {
          connect: {
            id: pageData.projectId,
          },
        },
        seo: {
          create: {
            title: pageData.seoTitle,
            description: pageData.seoDescription,
            image: pageData.seoImage,
          },
        },
      },
    });

    return { success: true, page };
  } catch (error) {
    return { success: false, error: 'Failed to create page' };
  }
};

export const updatePage = async (pageData: PageData) => {
  try {
    const updatedPage = await prisma.page.update({
      where: { id: pageData.projectId },
      data: {
        name: pageData.name,
        path: pageData.path,
        title: pageData.title,
        description: pageData.description,
        seo: {
          update: {
            title: pageData.seoTitle,
            description: pageData.seoDescription,
            image: pageData.seoImage,
          },
        },
      },
    });

    return { success: true, page: updatedPage };
  } catch (error) {
    return { success: false, error: 'Failed to update page' };
  }
};

export const updatePageData = async (pageId: string, data: string) => {
  await prisma.page.update({
    where: { id: pageId },
    data: { config: data },
  });
};

export const deletePage = async (pageId: string) => {
  try {
    // First, delete the associated SEO model
    await prisma.seoModel.deleteMany({
      where: {
        Page: {
          some: {
            id: pageId,
          },
        },
      },
    });

    // Then, delete the page
    const deletedPage = await prisma.page.delete({
      where: {
        id: pageId,
      },
    });

    return { success: true, deletedPage };
  } catch (error) {
    return { success: false, error: 'Failed to delete page' };
  }
};
