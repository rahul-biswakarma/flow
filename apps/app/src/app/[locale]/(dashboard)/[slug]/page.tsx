import { Loader } from "@/components/loader/loader";
import ProductWrapper from "@/components/product/product-wrapper";
import type { ProjectWithPages } from "@/types";
import {
  getProjectWithPages,
  getUserDetails,
} from "@v1/supabase/queries/server";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params;
  const user = await getUserDetails();
  if (!user) {
    redirect("/login");
  }
  const projectData = (await getProjectWithPages(
    params.slug,
  )) as ProjectWithPages;
  if (!projectData) {
    redirect("/404");
  }

  projectData.config = JSON.parse(JSON.stringify(projectData.config));

  return (
    <Suspense fallback={<Loader />}>
      <ProductWrapper user={user} projectData={projectData} />
    </Suspense>
  );
}
