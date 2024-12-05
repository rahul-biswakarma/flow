import { useFlowContext } from "@/context";
import type { Component } from "@/types";
import { Skeleton } from "@v1/ui/skeleton";
import { Fragment, useState } from "react";
import { ComponentListItem } from "./component-list-item";
import "./styles.css";
import { useListComponents } from "@/hooks/components/list-components";
import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";
import { clsx } from "clsx";

const SKELETON_HEIGHT = "20px";
const LOADER_COUNT = 5;
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
    return (
      <TableTemplate>
        {[...Array(LOADER_COUNT)].map((_, index) => (
          <Fragment
            key={`table-loader-${
              // biome-ignore lint/suspicious/noArrayIndexKey:
              index
            }`}
          >
            <div className="relative component-grid-item">
              <Skeleton height={SKELETON_HEIGHT} width="50px" />
            </div>
            <div className="relative component-grid-item">
              <Skeleton height={SKELETON_HEIGHT} width="140px" />
            </div>
            <Skeleton
              className="relative component-grid-item"
              height={SKELETON_HEIGHT}
              width="full"
            />
            <div className="relative component-grid-item">
              <Skeleton height={SKELETON_HEIGHT} width="200px" />
            </div>
            <div className="relative component-grid-item">
              <Skeleton height={SKELETON_HEIGHT} width="80px" />
            </div>
          </Fragment>
        ))}
      </TableTemplate>
    );
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

const TableTemplate = ({
  children,
  currentPage,
  totalPage,
  setPage,
}: {
  children?: React.ReactNode;
  currentPage?: number;
  totalPage?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="flex p-2 h-full">
      <div className="flex flex-col max-h-full w-full border border-gray-6 rounded-sm">
        <div className="flex h-full max-h-full">
          <div className="grid grid-cols-[auto_auto_1fr_auto_auto] w-full h-fit max-h-full component-grid-layout overflow-hidden">
            <div className="relative font-medium text-gray-10 bg-transparent text-[13px] component-grid-item" />
            <div className="relative font-medium text-gray-10 bg-transparent text-[13px] component-grid-item">
              Name
            </div>
            <div className="relative font-medium text-gray-10 bg-transparent text-[13px] component-grid-item">
              Description
            </div>
            <div className="relative font-medium text-gray-10 bg-transparent text-[13px] component-grid-item">
              Keywords
            </div>
            <div className="relative font-medium text-gray-10 bg-transparent text-[13px] component-grid-item">
              Last Updated
            </div>
            {children}
          </div>
        </div>
        <div
          className={clsx(
            "flex justify-end gap-6 p-2 px-4 border-t border-gray-6",
            { hidden: totalPage === 1 },
          )}
        >
          {currentPage !== 1 && (
            <Button
              onClick={() => {
                setPage?.((prev) => prev - 1);
              }}
              className="text-sm"
              variant="ghost"
              color="gray"
            >
              <Icons.ChevronLeft />
              Prev
            </Button>
          )}
          {currentPage !== totalPage && (
            <Button
              onClick={() => {
                setPage?.((prev) => prev + 1);
              }}
              className="text-sm"
              variant="ghost"
              color="gray"
            >
              Next
              <Icons.ChevronRight />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
