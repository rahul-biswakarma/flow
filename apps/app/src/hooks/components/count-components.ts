import type { Component } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
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

  const { data, error, isLoading } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      return axios
        .post("/api/components.count", {
          projectId: projectId,
          status: status,
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
