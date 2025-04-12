import { z } from "zod";

export const ImageResponseSchema = z.object({
     id: z.number().nullable(),           // Long can be null
     image_url: z.string(),
     width: z.number().nullable(),        // Integer can be null
     height: z.number().nullable(),
     status: z.string(),
     type: z.string(),
});

export const CategorySchema = z.object({
     id: z.number().nullable(),
     name: z.string(),
})