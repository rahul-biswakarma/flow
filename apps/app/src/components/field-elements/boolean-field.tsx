import { Icons } from "@v1/ui/icons";
import { Switch } from "@v1/ui/switch";
import { Text } from "@v1/ui/text";
import { Tooltip, TooltipContent, TooltipTrigger } from "@v1/ui/tooltip";
import { clsx } from "clsx";
import { fieldFontSize, infoIconSize, tooltipProps } from "./constants";
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
          fieldFontSize,
          labelClassName,
        )}
      >
        {label}
        {fieldInfo && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Icons.Info className={infoIconSize} />
            </TooltipTrigger>
            <TooltipContent {...tooltipProps}>{fieldInfo}</TooltipContent>
          </Tooltip>
        )}
      </Text>
      <Switch
        checked={value}
        size="1"
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
