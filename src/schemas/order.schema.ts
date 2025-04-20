import { z } from "zod";
import { CreateAddressPayload } from "./orther.schema";

const ItemSchema = z.object({
     productId: z.number(),
     quantity: z.number()
})

export const PlaceOrderBookingPayloadSchema = z.object({
     bookingId: z.number(), // Java Long -> number (nullable if needed)
     items: z.array(ItemSchema),
});

export const PlaceOrderPayloadSchema = z.object({
     createAddressPayload: CreateAddressPayload,
     paymentMethod: z.string(),

});

export type PlaceOrderPayload = z.infer<typeof PlaceOrderPayloadSchema>;
export type PlaceOrderBookingPayload = z.infer<typeof PlaceOrderBookingPayloadSchema>;
export type Item = z.infer<typeof ItemSchema>;