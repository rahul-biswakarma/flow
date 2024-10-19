import { useScopedI18n } from "@/locales/client";
import type { User } from "@/types";
import { Button } from "@v1/ui/button";
import { Heading } from "@v1/ui/heading";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { TextField } from "@v1/ui/text-field";
import axios from "axios";
import { useState } from "react";

export const CreateProject = ({ userData }: { userData: User }) => {
  const scopedT = useScopedI18n("onboarding");
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post("/api/project.create", { name, slug });
      console.log("Project created:", response.data);
      // Handle successful creation (e.g., redirect to new project page)
    } catch (error) {
      console.error("Error creating project:", error);
      // Handle error (e.g., show error message to user)
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
      <div className="flex flex-col gap-5 justify-center items-center py-8 h-full max-h-[350px] border border-outline-00 bg-surface rounded-base w-full max-w-[700px] px-4">
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
          >
            {scopedT("cancel")}
          </Button>
          <Button
            loading={isLoading}
            variant="solid"
            type="submit"
            disabled={isLoading}
          >
            <Icons.Plus />
            {scopedT("create_project")}
          </Button>
        </div>
      </div>
    </form>
  );
};
