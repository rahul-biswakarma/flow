import { FlowLoader } from "@flow/components";
import ProductWrapper from "@flow/components/product-wrapper";
import {
  getProjectWithPages,
  getUserDetails,
} from "@flow/data-layer/queries/server";
import type { ProjectWithPages } from "@flow/data-layer/types";
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
    <Suspense fallback={<FlowLoader />}>
      <ProductWrapper user={user} projectData={projectData} />
    </Suspense>
  );
}
