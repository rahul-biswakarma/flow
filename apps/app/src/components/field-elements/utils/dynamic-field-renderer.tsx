import { Icons } from "@v1/ui/icons";
import { Text } from "@v1/ui/text";
import { Tooltip, TooltipContent, TooltipTrigger } from "@v1/ui/tooltip";
import { clsx } from "clsx";
import { fieldFontSize, infoIconSize, tooltipProps } from "../constants";

interface BooleanFieldElementProps {
  label?: string;
  children: React.ReactNode;
  fieldInfo?: string;
  labelClassName?: string;
}

export const DynamicFieldRenderer = ({
  label,
  children,
  fieldInfo,
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
      {children}
    </>
  );
};
