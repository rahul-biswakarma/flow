import { listComponentsByStatus } from "@flow/data-layer/queries/server";
import { createApiHandler } from "@flow/utils/api-handler";

export const POST = createApiHandler(
  async (payload) => {
    const data = await listComponentsByStatus(
      payload.projectId,
      payload.status || undefined,
      payload.page || 1,
      payload.countPerPage,
    );
    return data;
  },
  "components-list",
  "Failed to get components",
);
