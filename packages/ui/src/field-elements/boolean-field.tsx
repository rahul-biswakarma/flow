import {
  Switch,
  Text,
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components";
import { Icons } from "@/icons";
import { clsx } from "clsx";
import { fieldFontSize, infoIconSize, tooltipProps } from "./constants";
import type { FieldOnChangeProps } from "./types";

interface BooleanFieldElementProps {
  label?: string;
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
      {label && (
        <Text
          className={clsx(
            "text-gray-11 pt-1 flex gap-1 items-center h-fit",
            fieldFontSize,
            labelClassName,
          )}
        >
          {label}
          {fieldInfo && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Icons.InfoCircle className={infoIconSize} />
              </TooltipTrigger>
              <TooltipContent {...tooltipProps}>{fieldInfo}</TooltipContent>
            </Tooltip>
          )}
        </Text>
      )}
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
