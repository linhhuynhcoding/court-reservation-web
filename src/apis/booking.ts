import { http } from "@/lib/http";
import { toQueryString } from "@/lib/utils";
import { PlaceBookingPayload } from "@/schemas/booking.schema";
import { BookingFilter } from "@/schemas/filter.schemas";

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

     /**
      * @type Next Client to Server
      * @description Lấy danh sách booking của người dùng theo ID
      * @param id ID của tài khoản
      * @param filter Bộ lọc và phân trang
      * @returns Danh sách booking phân trang
      */
     getAllUserBookings: ({ id, filter, token }: { id: number, filter: BookingFilter, token: string }) =>
          http.get<unknown>(`/accounts/${id}/bookings${toQueryString(filter)}`, {
               headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
               },
          }),
} as const;