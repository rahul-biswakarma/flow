export const generateComponentListKey = ({
  projectId,
  status,
}: {
  projectId: string;
  status?: string;
  page: number;
}) => `/api/components.list?status=${status ?? "all"}&projectId=${projectId}`;

export const generateComponentCountKey = ({
  projectId,
  status,
}: {
  projectId: string;
  status: string;
}) => {
  return `/api/components.count?projectId=${projectId}&status=${status}`;
};
