import { Button } from "@v1/ui/button";
import { DropdownMenu } from "@v1/ui/dropdown";
import { Icons } from "@v1/ui/icons";

interface FontOption {
  label: string;
  value: string;
}

const FONT_OPTIONS: FontOption[] = [
  { label: "System", value: "var(--font-geist-sans)" },
  { label: "Mono", value: "var(--font-geist-mono)" },
];

interface FontFamilySelectProps {
  value: string;
  onChange: (value: string) => void;
}

export const FontFamilySelect = ({
  value,
  onChange,
}: FontFamilySelectProps) => {
  const selectedFont =
    FONT_OPTIONS.find((opt) => opt.value === value) ?? FONT_OPTIONS[0];

  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Button color="gray" variant="soft" className="w-full justify-between">
          {selectedFont?.label}
          <Icons.ChevronDown className="size-4" />
        </Button>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        {FONT_OPTIONS.map((option) => (
          <DropdownMenu.Item
            key={option.value}
            onClick={() => onChange(option.value)}
          >
            <span style={{ fontFamily: option.value }}>{option.label}</span>
          </DropdownMenu.Item>
        ))}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  );
};
