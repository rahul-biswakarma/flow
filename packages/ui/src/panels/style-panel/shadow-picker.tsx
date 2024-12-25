import { Button, DropdownMenu, Text } from "@/components";
import { useState } from "react";

export const ShadowPicker = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const shadows = [
    { name: "None", value: "none" },
    { name: "Small", value: "0 2px 4px var(--gray-a12)" },
    { name: "Medium", value: "0 4px 8px var(--gray-a12)" },
    { name: "Large", value: "0 8px 16px var(--gray-a12)" },
    { name: "Extra Large", value: "0 16px 32px var(--gray-a12)" },
  ];

  return (
    <div className="flex items-center gap-2">
      <Text size="2" className="text-gray-11">
        Shadow
      </Text>
      <DropdownMenu.Root open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenu.Trigger>
          <Button variant="outline" size="2">
            {shadows.find((s) => s.value === value)?.name || "Custom"}
          </Button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          {shadows.map((shadow) => (
            <DropdownMenu.Item
              key={shadow.value}
              onClick={() => {
                onChange(shadow.value);
                setIsOpen(false);
              }}
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-8 h-8 rounded-md bg-white border border-gray-7"
                  style={{ boxShadow: shadow.value }}
                />
                <Text size="2">{shadow.name}</Text>
              </div>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};
