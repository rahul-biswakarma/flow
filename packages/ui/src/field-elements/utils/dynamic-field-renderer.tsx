import { Text, Tooltip, TooltipContent, TooltipTrigger } from "@/components";
import { Icons } from "@/icons";
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
