import { z } from "zod";

export const PlaceBookingPayloadSchema = z.object({
     accountId: z.number().optional(),

     orgaId: z.number({
          required_error: "orgaId is required",
     }),

     courtId: z.number({
          required_error: "Chọn sân là bắt buộc",
     }),

     timeStart: z.string({
          required_error: "timeStart is required",
     }).refine(val => !isNaN(Date.parse(val)), {
          message: "Định dạng không hợp lệ",
     }),

     duration: z.string()
          .refine(val => !isNaN(parseInt(val, 10)), {
               message: "Giờ thuê sân không hợp lệ",
          }).default("1.0"),
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