import { X } from "lucide-react";
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

export const CreateAddressPayload = z.object({
     city: z.string().nullable(),         // assuming optional
     district: z.string().nullable(),     // assuming optional
     ward: z.string().nullable(),         // assuming optional
     addressLine: z.string().nullable(),  // assuming optional
     latitude: z.number().int().nullable(),
     longitude: z.number().int().nullable()
});
export const ImagePayload = z.object({
     image_url: z.string().nullable(),
     width: z.number().int().nullable(),
     height: z.number().int().nullable(),
     type: z.string().nullable()
});

export type ImageResponse = z.infer<typeof ImageResponseSchema>;