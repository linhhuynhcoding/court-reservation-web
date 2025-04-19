import { z } from "zod";

const ItemSchema = z.object({
     productId: z.number(),
     quantity: z.number()
})

export const PlaceOrderBookingPayloadSchema = z.object({
     bookingId: z.number(), // Java Long -> number (nullable if needed)
     items: z.array(ItemSchema),
});

export type PlaceOrderBookingPayload = z.infer<typeof PlaceOrderBookingPayloadSchema>;
export type Item = z.infer<typeof ItemSchema>;