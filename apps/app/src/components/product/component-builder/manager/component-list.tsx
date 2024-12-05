import { useFlowContext } from "@/context";
import type { Component } from "@/types";
import { Skeleton } from "@v1/ui/skeleton";
import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { ComponentListItem } from "./component-list-item";
import "./styles.css";

const SKELETON_HEIGHT = "20px";
const LOADER_COUNT = 5;

export const ComponentList = ({
  status,
}: {
  status?: Component["status"];
}) => {
  const [loading, setLoading] = useState(true);
  const [components, setComponents] = useState<Component[]>([]);
  const [page, setPage] = useState(1);

  const { projectData } = useFlowContext();

  useEffect(() => {
    async function fetchComponents() {
      setLoading(true);
      await axios
        .post("/api/components.list", {
          status,
          projectId: projectData.id,
          page,
        })
        .then((response) => {
          setComponents(response.data);
        });
      setLoading(false);
    }
    fetchComponents();
  }, [page]);

  if (loading) {
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
    <TableTemplate>
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
}: {
  children?: React.ReactNode;
}) => {
  return (
    <div className="p-2">
      <div className="flex h-full max-h-full border border-gray-6 rounded-sm">
        <div className="grid grid-cols-[auto_auto_1fr_auto_auto] w-full h-fit component-grid-layout">
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
    </div>
  );
};
