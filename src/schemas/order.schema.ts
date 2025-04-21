import { z } from "zod";
import { CreateAddressPayload } from "./orther.schema";
import { AccountRes } from "./account.schema";
import { AddressResponseSchema } from "./court.schema";
import { ProductResponseSchema } from "./product.schema";

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

export const OrderItemResponseSchema = z.object({
     id: z.number().nullable(),
     product: ProductResponseSchema,
     quantity: z.number().nullable(),
     unitPrice: z.number().nullable(),
     totalPrice: z.number().nullable()
});

export const OrderResponseSchema = z.object({
     id: z.number().nullable(),
     account: AccountRes,
     orderType: z.string(),
     total: z.number().nullable(),
     productPrice: z.number().nullable(),
     payment: z.any(),
     address: AddressResponseSchema,
     shipFee: z.number().nullable(),
     orderItems: z.array(OrderItemResponseSchema).nullable()
});


export type OrderItemResponse = z.infer<typeof OrderItemResponseSchema>;
export type OrderResponse = z.infer<typeof OrderResponseSchema>;
export type PlaceOrderPayload = z.infer<typeof PlaceOrderPayloadSchema>;
export type PlaceOrderBookingPayload = z.infer<typeof PlaceOrderBookingPayloadSchema>;
export type Item = z.infer<typeof ItemSchema>;