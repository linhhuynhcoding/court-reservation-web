import { PaymentFor, PaymentMethod } from "@/constants/types";
import { z } from "zod";

export const PaymentPayloadSchema = z.object({
     // amount: z.number(),
     paymentMethod: z.string(),
     paymentFor: z.string(),
     id: z.number(),
});

export type PaymentPayload = z.infer<typeof PaymentPayloadSchema>