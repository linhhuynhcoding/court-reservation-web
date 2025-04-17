import { z } from "zod";

export const PlaceBookingPayloadSchema = z.object({
     accountId: z.number().optional(),

     orgaId: z.number({
          required_error: "orgaId is required",
     }),

     courtId: z.number({
          required_error: "courtId is required",
     }),

     timeStart: z.string({
          required_error: "timeStart is required",
     }).refine(val => !isNaN(Date.parse(val)), {
          message: "timeStart must be a valid ISO datetime string",
     }),

     duration: z.number()
          .min(0.5, { message: "Duration must be at least 0.5" })
          .default(1.0),
});

export const BookingFormSchema = PlaceBookingPayloadSchema.omit({
     timeStart: true, courtId: true, accountId: true, orgaId: true

}).extend({
     date: z.date(),
     time: z.string(),
     courtId: z.string(),
});

export type PlaceBookingPayload = z.infer<typeof PlaceBookingPayloadSchema>;
export type BookingFormPayload = z.infer<typeof BookingFormSchema>;