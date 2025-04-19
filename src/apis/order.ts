import { http } from "@/lib/http";
import { PlaceOrderBookingPayload } from "@/schemas/order.schema";

const ORDER_ENPOINT = '/orders'

export const apiOrder = {
     /**
      * Place order kèm booking
      * Next Client to Server
      * @param (body) PlaceBookingPayload Thông tin order
      * @returns 
      */
     placeOrderBooking: async ({ payload, token }: { payload: Partial<PlaceOrderBookingPayload>, token: string }) => http.post<unknown>(`${ORDER_ENPOINT}/booking`, {
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          body: JSON.stringify(payload)
     }),
} as const;