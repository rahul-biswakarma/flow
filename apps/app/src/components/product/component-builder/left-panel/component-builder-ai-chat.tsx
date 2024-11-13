import { IconButton } from "@v1/ui/icon-button";
import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { TextField } from "@v1/ui/text-field";

export const ComponentBuilderAIChat = () => {
  return (
    <div className="relative h-full bg-gray-a1">
      <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-between z-10">
        <div className="flex justify-between items-center gap-2 px-3 py-2 border-b border-outline-02">
          <Text size="2">Flux AI</Text>
        </div>
        <div />
        <div className="p-2">
          <TextField.Root placeholder="Enter your thoughts">
            <TextField.Slot />
            <TextField.Slot>
              <IconButton variant="ghost" color="gray">
                <Icons.SendHorizontal />
              </IconButton>
            </TextField.Slot>
          </TextField.Root>
        </div>
      </div>
    </div>
  );
};
