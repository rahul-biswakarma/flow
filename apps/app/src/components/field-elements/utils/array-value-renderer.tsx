import { IconButton } from "@v1/ui/icon-button";
import { Icons } from "@v1/ui/icons";
import { clsx } from "clsx";
import { useState } from "react";
import type { ReactNode } from "react";

export const ArrayValueRenderer = <T,>({
  value,
  valueRender,
  inputRenderer,
  removeItem,
}: {
  value: T[];
  valueRender: (value: T) => JSX.Element;
  inputRenderer: ReactNode;
  removeItem?: (value: T) => void;
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div
      tabIndex={-1}
      className={clsx("flex gap-2 flex-wrap border-gray-7", {
        "bg-surface rounded p-1": value.length > 0,
      })}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      {value.map((value) => (
        <div
          key={`${value}`}
          className="flex gap-1 items-center justify-center px-2 py-1 rounded bg-gray-surface border border-outline-01"
        >
          {valueRender(value)}
          <IconButton
            onClick={() => {
              removeItem?.(value);
            }}
            variant="ghost"
            size="1"
            color="gray"
          >
            <Icons.X className="!w-[16px] !h-[16px] text-gray-10" />
          </IconButton>
        </div>
      ))}
      {(isFocused || !value.length) && inputRenderer}
    </div>
  );
};
