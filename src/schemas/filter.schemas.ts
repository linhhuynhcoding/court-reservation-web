import { z } from 'zod';

export const BaseFilterSchema = z.object({
     sort: z
          .string()
          .regex(
               /^\[((\[[A-Z]{2,8}),(ASC|DESC)\])(,((\[[A-Z]{2,8}),(ASC|DESC)\])){0,4}\]$/,
               {
                    message:
                         'Sort must match pattern like [[ID,ASC],[NAME,DESC]] with 1-5 entries',
               }
          )
          .default('[[ID,ASC]]'),

     page: z.number().min(0).max(10000).default(0),

     pageSize: z.number().min(10).max(50).default(12),

});

export const CourtFilterSchema = z.object({
     sort: z
          .string()
          .regex(
               /^\[((\[[A-Z]{2,8}),(ASC|DESC)\])(,((\[[A-Z]{2,8}),(ASC|DESC)\])){0,4}\]$/,
               {
                    message:
                         'Sort must match pattern like [[ID,ASC],[NAME,DESC]] with 1-5 entries',
               }
          )
          .default('[[ID,ASC]]'),

     page: z.number().min(0).max(10000).default(0),

     pageSize: z.number().min(10).max(50).default(12),

     dateTime: z.string().nullable().optional(),
     search: z.string().nullable().optional(),
     location: z.string().nullable().optional()

});

export const ProductFilterSchema = z.object({
     sort: z
          .string()
          .regex(
               /^\[((\[[A-Z]{2,8}),(ASC|DESC)\])(,((\[[A-Z]{2,8}),(ASC|DESC)\])){0,4}\]$/,
               {
                    message:
                         'Sort must match pattern like [[ID,ASC],[NAME,DESC]] with 1-5 entries',
               }
          )
          .default('[[ID,ASC]]'),

     page: z.number().min(0).max(10000).default(0),

     pageSize: z.number().min(10).max(50).default(12),

     categoryName: z.string().default("SPORT EQUIPMENT"),

     priceMin: z.number().default(0.0),

     priceMax: z.number().default(5000000.0)
});

export const BookingFilterSchema = z.object({
     sort: z
          .string()
          .regex(/^\[((\[[A-Z]{2,8}),(ASC|DESC)\])(,(\[[A-Z]{2,8}),(ASC|DESC)\]){0,4}\]$/, {
               message: "Sort phải đúng định dạng [[FIELD,ASC|DESC],...] tối đa 5 phần tử",
          })
          .default("[[ID,ASC]]"),
     page: z
          .number()
          .min(0, { message: "Page phải lớn hơn hoặc bằng 0" })
          .max(1000, { message: "Page tối đa là 1000" })
          .default(0),
     pageSize: z
          .number()
          .min(10, { message: "Page size tối thiểu là 10" })
          .max(50, { message: "Page size tối đa là 50" })
          .default(10),
});

export type BaseFilter = z.infer<typeof BaseFilterSchema>;
export type CourtFilter = z.infer<typeof CourtFilterSchema>;
export type ProductFilter = z.infer<typeof ProductFilterSchema>;
export type BookingFilter = z.infer<typeof BookingFilterSchema>;