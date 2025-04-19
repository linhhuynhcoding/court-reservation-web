import { z } from "zod";
import { CreateAddressPayload, ImagePayload } from "./orther.schema";

const CourtResponseSchema = z.object({
     id: z.number().nullable(),
     name: z.string().nullable(),
});

const AddressResponseSchema = z.object({
     id: z.number().nullable(),
     city: z.string().nullable(),
     district: z.string().nullable(),
     ward: z.string().nullable(),
     addressLine: z.string().nullable(),
     latitude: z.number().nullable().default(0),
     longitude: z.number().nullable().default(0),
});

export const OrgaResponseSchema = z.object({
     id: z.number(),
     name: z.string(),
     phone: z.string(),
     numberOfCourts: z.number(),
     price: z.number(),
     address: AddressResponseSchema.nullable(),
     status: z.string().nullable(),
     imageCourts: z.any(),
     courts: z.array(CourtResponseSchema).nullable(),
});

export const CreateCourtPayloadSchema = z.object({
     name: z.string(),
     phone: z.string()
          .regex(/^[0-9]{10,11}$/)
          ,
     numberOfCourts: z.coerce.number().int(),
     courtNames: z.array(z.string()),
     price: z.coerce.number().min(1000),
     address: CreateAddressPayload,
     imageCourts: z.array(ImagePayload).min(3).max(5).optional()
});

export type OrgaResponse = z.infer<typeof OrgaResponseSchema>;
export type CreateCourtPayload = z.infer<typeof CreateCourtPayloadSchema>;