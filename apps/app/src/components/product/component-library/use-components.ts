import { useDebounce } from "@/hooks/use-debounce";
import { createSupabaseClient } from "@v1/supabase/client";
import { getComponents } from "@v1/supabase/queries/components";
import type {
  ComponentFilters,
  ComponentWithStats,
} from "@v1/supabase/types/component";
import { useCallback, useEffect, useState } from "react";

export function useComponents({
  projectId,
  filters,
}: {
  projectId?: string;
  filters: ComponentFilters;
}) {
  const [components, setComponents] = useState<ComponentWithStats[]>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error>();

  const debouncedSearch = useDebounce(filters.search, 300);
  const supabase = createSupabaseClient();

  const fetchComponents = useCallback(async () => {
    if (!projectId) return;

    try {
      setIsLoading(true);
      const data = await getComponents(supabase, projectId, {
        ...filters,
        search: debouncedSearch,
      });
      setComponents(data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch components"),
      );
    } finally {
      setIsLoading(false);
    }
  }, [projectId, filters, debouncedSearch, supabase]);

  useEffect(() => {
    fetchComponents();
  }, [fetchComponents]);

  return { components, isLoading, error, refetch: fetchComponents };
}
