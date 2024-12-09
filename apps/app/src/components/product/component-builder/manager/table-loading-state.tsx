import { Skeleton } from "@v1/ui/skeleton";
import { Fragment } from "react/jsx-runtime";
import { TableTemplate } from "./table-template";

const LOADER_COUNT = 5;
const SKELETON_HEIGHT = "20px";

export const TableLoadingState = () => {
  return (
    <TableTemplate>
      {[...Array(LOADER_COUNT)].map((_, index) => (
        <Fragment
          key={`table-loader-${
            // biome-ignore lint/suspicious/noArrayIndexKey:
            index
          }`}
        >
          <div className="relative component-grid-item">
            <Skeleton height={SKELETON_HEIGHT} width="50px" />
          </div>
          <div className="relative component-grid-item">
            <Skeleton height={SKELETON_HEIGHT} width="140px" />
          </div>
          <Skeleton
            className="relative component-grid-item"
            height={SKELETON_HEIGHT}
            width="full"
          />
          <div className="relative component-grid-item">
            <Skeleton height={SKELETON_HEIGHT} width="200px" />
          </div>
          <div className="relative component-grid-item">
            <Skeleton height={SKELETON_HEIGHT} width="80px" />
          </div>
        </Fragment>
      ))}
    </TableTemplate>
  );
};
