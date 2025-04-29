import { z } from "zod";

export const RevenueBookingLocationSchema = z.object({
  totalRevenue: z.number().nullable(), 
  bookingTimes: z.number().nullable(), 
  location: z.string().nullable(),
});

export const SystemStatisticResponseSchema = z.object({
  totalUsers: z.number().nullable(),
  totalOrganisations: z.number().nullable(),
  totalOrganisationsOpening: z.number().nullable(),
  totalOrganisationsMaintaining: z.number().nullable(),
  totalOrganisationsClosed: z.number().nullable(),
  totalRevenueBooking: z.number().nullable(),
  bookingTimes: z.number().nullable(),
  revenueBookingLocations: z.array(RevenueBookingLocationSchema).nullable(),
  totalRevenueOrder: z.number().nullable(),
  successOrderCount: z.number().nullable(),
  processingOrderCount: z.number().nullable(),
  failedOrderCount: z.number().nullable(),
  topProduct: z.array(z.any()).nullable(), 
});

export type SystemStatisticResponse = z.infer<typeof SystemStatisticResponseSchema>;
export type RevenueBookingLocation = z.infer<typeof RevenueBookingLocationSchema>;