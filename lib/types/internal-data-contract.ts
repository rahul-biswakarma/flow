import { User } from '@prisma/client';

export interface GetUsersRequest {
  userIds: string[];
}

export interface GetUsersResponse {
  users: User[];
}
