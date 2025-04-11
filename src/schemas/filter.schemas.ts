import { z } from 'zod';

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
});

export type CourtFilter = z.infer<typeof CourtFilterSchema>;