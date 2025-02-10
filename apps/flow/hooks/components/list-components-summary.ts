import type { Component } from "@flow/data-layer/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { generateComponentListSummaryKey } from "./keys";

export const useListComponentsSummary = ({
  projectId,
  status,
  countPerPage,
  page,
}: {
  projectId: string;
  countPerPage: number;
  page: number;
  status?: Component["status"];
}): {
  data: Component[];
  error: unknown;
  isLoading: boolean;
} => {
  const key = generateComponentListSummaryKey({
    projectId,
    status: status ?? "all",
    page,
  });

  const { data, error, isLoading } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      return await axios
        .post("/api/components.summary.list", {
          status,
          projectId,
          page,
          countPerPage,
        })
        .then((res) => res.data);
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    data,
    error,
    isLoading,
  };
};
