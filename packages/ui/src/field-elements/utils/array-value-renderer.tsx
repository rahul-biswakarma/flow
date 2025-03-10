import { clsx } from "clsx";
import { type JSX, useState } from "react";
import type { ReactNode } from "react";
import { IconButton } from "../../components";
import { Icons } from "../../icons";

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
  ref?: React.RefObject<HTMLDivElement | null>;
  placeholder?: string;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      ref={ref}
      tabIndex={-1}
      className={clsx(
        "flex gap-1 items-center flex-wrap border-gray-6 bg-gray-a3 rounded-sm min-h-[30px]",
        {
          "rounded px-2 py-1": value.length > 0 || isStreaming,
        },
      )}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {/* {(!value || value.length === 0) && !isFocused && (
        <Text className="text-gray-a10 pl-1.5" size="2">
          {placeholder}
        </Text>
      )} */}
      {value.map((value, index) => (
        <div
          key={`${value}-${
            // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
            index
          }`}
          className="flex gap-1 group/arrayKeywords items-center justify-center px-2 py-0.5 rounded bg-gray-a4 border border-gray-a6 cursor-default"
        >
          {valueRender(value)}
          <IconButton
            onClick={() => {
              removeItem?.(value);
            }}
            variant="ghost"
            size="1"
            color="gray"
            className="ml-0.5"
          >
            <Icons.X className="!w-[16px] !h-[16px] text-gray-10" />
          </IconButton>
        </div>
      ))}
      {isFocused && inputRenderer}
    </div>
  );
};
