import { TOOLTIP_DELAY_DURATION } from "@/constants";
import { DropdownMenu } from "@v1/ui/dropdown";
import { Icons } from "@v1/ui/icons";
import { TextField } from "@v1/ui/text-field";
import { Tooltip, TooltipContent, TooltipTrigger } from "@v1/ui/tooltip";

const validUnits = ["px", "em", "rem", "%"];

export const UnitTextInput = ({
  slotValue,
  value,
  handleChange,
  hideOptionDropdown = false,
  tooltipContent,
}: {
  value: string;
  slotValue: string;
  handleChange: (e: string) => void;
  hideOptionDropdown?: boolean;
  tooltipContent?: React.ReactNode;
}) => {
  return (
    <Tooltip delayDuration={TOOLTIP_DELAY_DURATION}>
      <TooltipTrigger>
        <TextField.Root
          value={value}
          onChange={(e) => {
            handleChange(e.target.value);
          }}
        >
          <TextField.Slot>{slotValue}</TextField.Slot>
          {!hideOptionDropdown && (
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
                      handleChange("fit-content");
                    }}
                  >
                    fit
                  </DropdownMenu.Item>
                  <DropdownMenu.Item
                    onClick={() => {
                      handleChange("100%");
                    }}
                  >
                    full
                  </DropdownMenu.Item>
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </TextField.Slot>
          )}
        </TextField.Root>
      </TooltipTrigger>
      {tooltipContent && <TooltipContent>{tooltipContent}</TooltipContent>}
    </Tooltip>
  );
};
