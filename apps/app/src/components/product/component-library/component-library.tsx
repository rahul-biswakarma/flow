import { useFlowContext } from "@/context";
import { useScopedI18n } from "@/locales/client";
import { createSupabaseClient } from "@v1/supabase/client";
import type { ComponentStatus } from "@v1/supabase/types/component";
import { Icons } from "@v1/ui/icons";
import { Tabs } from "@v1/ui/tabs";
import { Text } from "@v1/ui/text";
import { TextField } from "@v1/ui/text-field";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { ComponentGrid } from "./component-grid";
import { ComponentLibraryHeader } from "./header";
import { useComponents } from "./use-components";

export function ComponentLibrary() {
  const scopedT = useScopedI18n("component_library");
  const router = useRouter();
  const { projectData } = useFlowContext();
  const [activeTab, setActiveTab] = useState<ComponentStatus>("draft");
  const [search, setSearch] = useState("");
  const supabase = createSupabaseClient();

  const { components, isLoading, error } = useComponents({
    projectId: projectData?.id,
    filters: {
      status: activeTab,
      search: search,
      sort: "updated_at",
      sortDirection: "desc",
    },
  });

  const handleCreateComponent = useCallback(() => {
    router.push(`/${projectData?.slug}/components/new`);
  }, [projectData?.slug, router]);

  if (!projectData) return null;

  return (
    <div className="flex flex-col h-full">
      <ComponentLibraryHeader
        onCreateComponent={handleCreateComponent}
        componentsCount={components?.length ?? 0}
      />
      <div className="flex-1 p-6">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <Tabs.Root
              value={activeTab}
              onValueChange={(v) => setActiveTab(v as ComponentStatus)}
            >
              <Tabs.List>
                <Tabs.Trigger value="draft">
                  {scopedT("tabs.drafts")}
                </Tabs.Trigger>
                <Tabs.Trigger value="published">
                  {scopedT("tabs.published")}
                </Tabs.Trigger>
              </Tabs.List>
            </Tabs.Root>
            <TextField.Root
              placeholder={scopedT("search_placeholder")}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            >
              <TextField.Slot>
                <Icons.Search className="w-4 h-4 text-gray-11" />
              </TextField.Slot>
            </TextField.Root>
          </div>

          {error ? (
            <Text color="red">{scopedT("error_loading")}</Text>
          ) : (
            <ComponentGrid
              components={components ?? []}
              isLoading={isLoading}
              onCreateComponent={handleCreateComponent}
            />
          )}
        </div>
      </div>
    </div>
  );
}
