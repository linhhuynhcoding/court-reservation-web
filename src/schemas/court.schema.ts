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
     latitude: z.number().nullable(),
     longitude: z.number().nullable(),
});

export const OrgaResponseSchema = z.object({
     id: z.number().nullable(),
     name: z.string().nullable(),
     phone: z.string().nullable(),
     numberOfCourts: z.number().nullable(),
     price: z.number().nullable(),
     address: AddressResponseSchema.nullable(),
     status: z.string().nullable(),
     // imageCourts: z.array(ImageCourtSchema).nullable(),
     courts: z.array(CourtResponseSchema).nullable(),
});

export const CreateCourtPayloadSchema = z.object({
     name: z.string(),
     phone: z.string()
          .regex(/^[0-9]{10,11}$/)
          ,
     numberOfCourts: z.number().int(),
     courtNames: z.array(z.string()),
     price: z.number().min(1000),
     address: CreateAddressPayload,
     imageCourts: z.array(ImagePayload).min(3).max(5)
});

export type OrgaResponse = z.infer<typeof OrgaResponseSchema>;
export type CreateCourtPayload = z.infer<typeof CreateCourtPayloadSchema>;