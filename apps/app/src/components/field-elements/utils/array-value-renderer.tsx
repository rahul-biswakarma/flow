import { IconButton } from "@v1/ui/icon-button";
import { Icons } from "@v1/ui/icons";
import { clsx } from "clsx";
import { type JSX, useState } from "react";
import type { ReactNode } from "react";

export const ArrayValueRenderer = <T,>({
  value,
  valueRender,
  inputRenderer,
  removeItem,
  ref,
  isStreaming,
}: {
  value: T[];
  valueRender: (value: T) => JSX.Element;
  inputRenderer?: ReactNode;
  removeItem?: (value: T) => void;
  isStreaming?: boolean;
  ref?: React.RefObject<HTMLDivElement>;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      ref={ref}
      tabIndex={-1}
      className={clsx(
        "flex gap-1 items-center flex-wrap border-gray-7 bg-gray-a3 rounded-sm min-h-10",
        {
          "rounded p-1": value.length > 0 || isStreaming,
        },
      )}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {value.map((value, index) => (
        <div
          key={`${value}-${
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            index
          }`}
          className="flex gap-1 group/arrayKeywords items-center justify-center px-2 py-1 rounded bg-gray-a4 border border-gray-a6 cursor-default"
        >
          {valueRender(value)}
          <IconButton
            onClick={() => {
              removeItem?.(value);
            }}
            variant="ghost"
            size="1"
            color="gray"
            className="hidden group-hover/arrayKeywords:block ml-0.5"
          >
            <Icons.X className="!w-[16px] !h-[16px] text-gray-10" />
          </IconButton>
        </div>
      ))}
      {isFocused && inputRenderer}
    </div>
  );
};
