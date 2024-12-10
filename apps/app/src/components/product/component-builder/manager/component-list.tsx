import { useFlowContext } from "@/context";
import type { Component } from "@/types";
import { useState } from "react";
import { ComponentListItem } from "./component-list-item";
import "./styles.css";
import { useListComponents } from "@/hooks/components/list-components";
import { TableLoadingState } from "./table-loading-state";
import { TableTemplate } from "./table-template";

const COUNT_PER_PAGE = 15;

export const ComponentList = ({
  status,
  totalCount,
}: {
  status?: Component["status"];
  totalCount: number;
}) => {
  const { projectData } = useFlowContext();

  const [page, setPage] = useState(1);
  const { data: components, isLoading } = useListComponents({
    projectId: projectData.id,
    status,
    countPerPage: COUNT_PER_PAGE,
    page,
  });

  const TOTAL_PAGES = Math.floor(COUNT_PER_PAGE / 10);

  if (isLoading) {
    return <TableLoadingState />;
  }

  return (
    <TableTemplate setPage={setPage} currentPage={page} totalPage={TOTAL_PAGES}>
      {components.map((component) => {
        return (
          <ComponentListItem
            key={`table-data-${page}-${status}-${component.id}`}
            component={component}
          />
        );
      })}
    </TableTemplate>
  );
};
