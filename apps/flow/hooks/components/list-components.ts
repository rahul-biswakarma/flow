import type { Component } from "@flow/data-layer/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { generateComponentListKey } from "./keys";

export const useListComponents = ({
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
  const key = generateComponentListKey({
    projectId,
    status: status ?? "all",
    page,
  });

  const { data, error, isLoading } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      return await axios
        .post("/api/components.list", {
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
