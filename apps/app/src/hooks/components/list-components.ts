import type { Component } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
  const key = `/api/components.list?status=${status}&projectId=${projectId}&page=${page}&countPerPage=${countPerPage}`;

  const { data, error, isLoading } = useQuery({
    queryKey: [key],
    queryFn: () => {
      return axios
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
