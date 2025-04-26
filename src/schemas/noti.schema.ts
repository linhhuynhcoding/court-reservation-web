import { z } from "zod";
import { AccountRes } from "./account.schema";


const NotiResponseSchema = z.object({
  id: z.number().nullable(), 
  title: z.string(),
  message: z.string(),
  sender: AccountRes,
  recipient: AccountRes,
  notiType: z.string(), 
  sentTime: z.string(), 
  role: z.string(),
  recipientType: z.enum(["INDIVIDUAL", "ALL"]),
  isSeen: z.boolean()
});

export type NotiResponse = z.infer<typeof NotiResponseSchema>;