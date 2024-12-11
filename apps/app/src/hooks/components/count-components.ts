import type { Component } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { generateComponentCountKey } from "./keys";
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
  const key = generateComponentCountKey({ projectId, status });

  const { data, error, isLoading } = useQuery({
    queryKey: [key],
    queryFn: async () => {
      return await axios
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
