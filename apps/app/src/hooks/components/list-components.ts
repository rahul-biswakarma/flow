import type { Component } from "@/types";
import axios from "axios";
import useSWR from "swr";

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

  const { data, error, isLoading } = useSWR(key, () => {
    return axios
      .post("/api/components.list", {
        status,
        projectId,
        page,
        countPerPage,
      })
      .then((res) => res.data);
  });

  return {
    data,
    error,
    isLoading,
  };
};
