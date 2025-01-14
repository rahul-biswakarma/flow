"use server";

import { getAuthActionClient } from "@/actions/safe-action";
import { updateUser } from "@v1/supabase/mutations";
import { updateUserSchema } from "./schema";

export const updateUserAction = async () => {
  const client = await getAuthActionClient();
  const result = await client
    .schema(updateUserSchema)
    .metadata({
      name: "update-user",
    })
    .action(async ({ parsedInput: input, ctx: { user } }) => {
      const result = await updateUser(user.id, input);

      return result;
    });

  return result;
};
