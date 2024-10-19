import apiClient from "@/lib/api-client";
import { useScopedI18n } from "@/locales/client";
import type { Project } from "@/types";
import { Button } from "@v1/ui/button";
import { Heading } from "@v1/ui/heading";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { TextField } from "@v1/ui/text-field";
import { toast } from "@v1/ui/toast";
import { redirect } from "next/navigation";
import { useState } from "react";

export const CreateProject = ({
  showProjectManger,
}: { showProjectManger: () => void }) => {
  const scopedT = useScopedI18n("onboarding");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleProjectRedirect = (slug: string) => {
    setName("");
    setSlug("");
    setTimeout(() => {
      redirect(`/${slug}`);
    }, 100);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data, error } = await apiClient.post<Project>("/project.create", {
        name,
        slug,
      });
      if (error) {
        toast.error(scopedT("project_create_error", { error }));
      } else if (data.slug) {
        toast.success(scopedT("project_created"));
        handleProjectRedirect(data.slug);
      }
    } catch (e) {
      toast.error(scopedT("project_create_error", { error: e as string }));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col items-center justify-center gap-4 w-full h-full p-4 z-1"
    >
      <Heading weight="medium" size="7" highContrast={false}>
        {scopedT("create_new_project")}
      </Heading>
      <Text size="2" className="text-gray-10">
        {scopedT("create_new_project_description")}
      </Text>
      <div className="flex flex-col gap-5 justify-center items-center py-8 h-full max-h-[350px] border border-outline-00 bg-gray-a2 rounded-base w-full max-w-[700px] px-4">
        <div className="flex flex-col gap-1 w-full max-w-[400px]">
          <Text>{scopedT("project_name")}</Text>
          <TextField.Root
            placeholder={scopedT("project_name_placeholder")}
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1 w-full max-w-[400px]">
          <Text>{scopedT("project_slug")}</Text>
          <TextField.Root
            placeholder={scopedT("project_slug_placeholder")}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </div>
        <div className="flex w-full gap-2 justify-end items-center max-w-[400px]">
          <Button
            disabled={isLoading}
            color="gray"
            variant="soft"
            type="button"
            onClick={showProjectManger}
          >
            {scopedT("cancel")}
          </Button>
          <Button
            loading={isLoading}
            variant="solid"
            type="submit"
            disabled={isLoading || !name || !slug}
          >
            <Icons.Plus />
            {scopedT("create_project")}
          </Button>
        </div>
      </div>
    </form>
  );
};
