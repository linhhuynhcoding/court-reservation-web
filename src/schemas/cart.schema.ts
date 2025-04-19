import { z } from "zod";
import { ProductResponseSchema } from "./product.schema";

/**
 * Schema cho CartItemResponse
 */
export const CartItemResponseSchema = z.object({
  id: z.number(),
  product: ProductResponseSchema,
  quantity: z.number(),
  selected: z.boolean(),
});

/**
 * Schema cho CartResponse
 */
export const CartResponseSchema = z.object({
  id: z.number(),
  account: ProductResponseSchema,
  items: z.array(CartItemResponseSchema),
});

/**
 * Schema cho UpdateItemPayload
 */
export const UpdateItemPayloadSchema = z.object({
  productId: z.number({
    required_error: "productId is required",
  }),
  quantity: z.number({
    required_error: "quantity is required",
  }),
  selected: z.boolean(),
});

// Types export
export type CartItemResponse = z.infer<typeof CartItemResponseSchema>;
export type CartResponse = z.infer<typeof CartResponseSchema>;
export type UpdateItemPayload = z.infer<typeof UpdateItemPayloadSchema>;
