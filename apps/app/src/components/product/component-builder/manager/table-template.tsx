import { Button } from "@v1/ui/button";
import { Icons } from "@v1/ui/icons";
import { clsx } from "clsx";
export const TableTemplate = ({
  children,
  currentPage,
  totalPage,
  setPage,
}: {
  children?: React.ReactNode;
  currentPage?: number;
  totalPage?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
}) => {
  return (
    <div className="flex h-full">
      <div className="flex flex-col max-h-full w-full border-gray-6 rounded-sm">
        <div className="flex h-full max-h-full">
          <div className="grid grid-cols-[auto_auto_1fr_auto_auto] w-full h-fit max-h-full component-grid-layout overflow-hidden">
            <div className="relative font-medium text-gray-10 bg-transparent text-[13px] component-grid-item" />
            <div className="relative font-medium text-gray-10 bg-transparent text-[13px] component-grid-item">
              Name
            </div>
            <div className="relative font-medium text-gray-10 bg-transparent text-[13px] component-grid-item">
              Description
            </div>
            <div className="relative font-medium text-gray-10 bg-transparent text-[13px] component-grid-item">
              Keywords
            </div>
            <div className="relative font-medium text-gray-10 bg-transparent text-[13px] component-grid-item">
              Last Updated
            </div>
            {children}
          </div>
        </div>
        <div
          className={clsx(
            "flex justify-end gap-6 p-2 px-4 border-t border-gray-6",
            { hidden: totalPage === 1 },
          )}
        >
          {currentPage !== 1 && (
            <Button
              onClick={() => {
                setPage?.((prev) => prev - 1);
              }}
              className="text-sm"
              variant="ghost"
              color="gray"
            >
              <Icons.ChevronLeft />
              Prev
            </Button>
          )}
          {currentPage !== totalPage && (
            <Button
              onClick={() => {
                setPage?.((prev) => prev + 1);
              }}
              className="text-sm"
              variant="ghost"
              color="gray"
            >
              Next
              <Icons.ChevronRight />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
