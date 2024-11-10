import { DropdownMenu } from "@v1/ui/dropdown";
import { Icons } from "@v1/ui/icons";
import { TextField } from "@v1/ui/text-field";

const validUnits = ["px", "em", "rem", "%"];

export const UnitTextInput = ({
  slotValue,
  value,
  handleChange,
}: {
  value: string;
  slotValue: string;
  handleChange: (e: string) => void;
}) => {
  return (
    <TextField.Root
      value={value}
      onChange={(e) => {
        handleChange(e.target.value);
      }}
    >
      <TextField.Slot>{slotValue}</TextField.Slot>
      <TextField.Slot>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger className="cursor-default">
            <Icons.Settings />
          </DropdownMenu.Trigger>
          <DropdownMenu.Content>
            <DropdownMenu.Item
              onClick={() => {
                handleChange("auto");
              }}
            >
              auto
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => {
                handleChange("fit");
              }}
            >
              fit
            </DropdownMenu.Item>
            <DropdownMenu.Item
              onClick={() => {
                handleChange("fill");
              }}
            >
              full
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </TextField.Slot>
    </TextField.Root>
  );
};
