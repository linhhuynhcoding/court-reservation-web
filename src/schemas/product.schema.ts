import { z } from "zod";
import { CategorySchema, ImageResponseSchema } from "./orther.schema";

export const ProductResponseSchema = z.object({
     id: z.number(),     
     name: z.string(),
     price: z.number(),  
     buyTurn: z.number().nullable(),
     stock: z.number().nullable(),
     category: CategorySchema,
     image: ImageResponseSchema,
});

export type ProductResponse = z.infer<typeof ProductResponseSchema>;