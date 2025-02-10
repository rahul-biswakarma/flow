import { listComponentsSummaryByStatus } from "@flow/data-layer/queries/server";
import { createApiHandler } from "@flow/utils/api-handler";

export const POST = createApiHandler(
  async (payload) => {
    return await listComponentsSummaryByStatus(
      payload.projectId,
      payload.status || undefined,
      payload.page || 1,
      payload.countPerPage,
    );
  },
  "components-summary-list",
  "Failed to list components summary",
);
