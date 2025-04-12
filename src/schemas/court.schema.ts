import { z } from "zod";

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

export type OrgaResponse = z.infer<typeof OrgaResponseSchema>;
