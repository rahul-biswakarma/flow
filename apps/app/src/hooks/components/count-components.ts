import type { Component } from "@/types";
import axios from "axios";
import useSWR from "swr";
export const useCountComponents = ({
  projectId,
  status,
}: {
  projectId: string;
  status: Component["status"];
}): {
  data: number;
  error: unknown;
  isLoading: boolean;
} => {
  const key = `/api/components.count?projectId=${projectId}&status=${status}`;

  const { data, error, isLoading } = useSWR(key, () => {
    return axios
      .post("/api/components.count", {
        projectId: projectId,
        status: status,
      })
      .then((res) => res.data);
  });

  return {
    data,
    error,
    isLoading,
  };
};
