import { z } from "zod";
import { ApiRes } from "./global.schemas";

export const AccountRes = z.object({
     id: z.number(),
     username: z.string(),
     email: z.string().email(),
     name: z.string(),
     cartId: z.number().nullable(),
})

export const AccountUpdatePayloadSchema = z.object({
     email: z.string().email(),
     name: z.string(),
})

const ApiAccountRes = ApiRes(AccountRes);
export type AccountResType = z.infer<typeof ApiAccountRes>;
export type AccountType = z.infer<typeof AccountRes>;
export type AccountUpdatePayload = z.infer<typeof AccountUpdatePayloadSchema>;