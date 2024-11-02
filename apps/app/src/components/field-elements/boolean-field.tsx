import { Icons } from "@v1/ui/icons";
import { Switch } from "@v1/ui/switch";
import { Text } from "@v1/ui/text";
import { Tooltip, TooltipContent, TooltipTrigger } from "@v1/ui/tooltip";
import { clsx } from "clsx";
import { tooltipProps } from "./constants";
import type { FieldOnChangeProps } from "./types";

interface BooleanFieldElementProps {
  label: string;
  value: boolean;
  fieldInfo?: string;
  labelClassName?: string;
  onChange: (e: FieldOnChangeProps<boolean>) => void;
}

export const BooleanFieldElement = ({
  label,
  value,
  fieldInfo,
  onChange,
  labelClassName,
}: BooleanFieldElementProps) => {
  return (
    <>
      <Text
        className={clsx(
          "text-gray-10 pt-1 flex gap-1 items-center h-fit",
          labelClassName,
        )}
        size="2"
      >
        {label}
        {fieldInfo && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Icons.Info className="!w-[16px] !h-[16px]" />
            </TooltipTrigger>
            <TooltipContent {...tooltipProps}>{fieldInfo}</TooltipContent>
          </Tooltip>
        )}
      </Text>
      <Switch
        checked={value}
        onCheckedChange={(e) =>
          onChange({
            isEmpty: false,
            type: "boolean",
            value: e,
          })
        }
      />
    </>
  );
};
