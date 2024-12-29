import { countComponentsByStatus } from "@flow/data-layer/queries/server";
import { createApiHandler } from "@flow/utils/api-handler";

export const POST = createApiHandler(
  async (payload) => {
    return await countComponentsByStatus(
      payload.projectId,
      payload.status || undefined,
    );
  },
  "components-count",
  "Failed to count components",
);
