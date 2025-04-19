import { http } from "@/lib/http";
import { PlaceBookingPayload } from "@/schemas/booking.schema";

const BOOKING_ENDPOINT = '/bookings';

export const bookingApi = {

     /**
      * Book sân
      * Next Client to Server
      * @param (body) PlaceBookingPayload Thông tin booking
      * @returns 
      */

     bookingCourt: async ({ payload, token }: { payload: PlaceBookingPayload, token: string }) => http.post<unknown>(`${BOOKING_ENDPOINT}`, {
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          body: JSON.stringify(payload)
     }),
} as const;