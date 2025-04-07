import { z } from "zod";
import { ApiRes } from "./global.schemas";

export const AccountRes = z.object({
     username: z.string(),
     email: z.string().email(),
     name: z.string(),
     cartId: z.number().nullable(),
})

const ApiAccountRes = ApiRes(AccountRes);
export type AccountResType = z.infer<typeof ApiAccountRes>;
export type AccountType = z.infer<typeof AccountRes>;
