import { z } from "zod";

export const WardResponseSchema = z.object({
     code: z.number(),
     codename: z.string(),
     district_code: z.number(),
     division_type: z.string(),
     name: z.string(),
   });

   
export const DistrictResponseSchema = z.object({
     name: z.string(),
     code: z.number(),
     division_type: z.string(),
     codename: z.string(),
     province_code: z.number(),
     wards: z.array(WardResponseSchema),
});

export const ProvinceResponseSchema = z.object({
     name: z.string(),
     code: z.number(),
     division_type: z.string(),
     codename: z.string(),
     phone_code: z.number(),
     districts: z.array(DistrictResponseSchema),
});

export type WardResponseSchemaType = z.infer<typeof WardResponseSchema>; 
export type DistrictResponseSchemaType = z.infer<typeof DistrictResponseSchema>; 
export type ProvinceResponseSchemaType = z.infer<typeof ProvinceResponseSchema>; 