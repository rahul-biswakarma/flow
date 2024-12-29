import { useListComponents } from "@flow/hooks";
import { useFlowContext } from "@flow/providers";
import { Skeleton } from "@ren/ui/components";
import { useState } from "react";
import { ComponentListItem } from "./component-list-item";

const COUNT_PER_PAGE = 20;

export const ComponentList = () => {
  const [page, _setPage] = useState(1);
  const { projectData } = useFlowContext();

  const { data: components, isLoading } = useListComponents({
    projectId: projectData.id,
    countPerPage: COUNT_PER_PAGE,
    page,
  });

  if (isLoading) {
    return (
      <div>
        <Skeleton width="100%" height="30px" />
        <Skeleton className="opacity-80" width="100%" height="30px" />
        <Skeleton className="opacity-60" width="100%" height="30px" />
        <Skeleton className="opacity-40" width="100%" height="30px" />
        <Skeleton className="opacity-20" width="100%" height="30px" />
      </div>
    );
  }

  return (
    <div>
      {components?.map((component) => {
        return (
          <ComponentListItem
            key={component.id}
            componentName={component.name}
            componentCode={component.code ?? ""}
            styleValue={{}}
            propsValue={[]}
          />
        );
      })}
    </div>
  );
};
