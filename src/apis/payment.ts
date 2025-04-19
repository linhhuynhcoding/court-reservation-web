import { http } from "@/lib/http";
import { PaymentPayload } from "@/schemas/payment.schema";

const PAYMENT_ENDPOINT = '/payment';

export const apiPayment = {
     
     /**
      * Thanh toán booking
      * Next Client to Server
      * @param (body) PaymentPayload Thông tin payment cho booking
      * @returns 
      */
     paymentBooking: async ({ payload, token }: { payload: PaymentPayload, token: string }) => http.post<unknown>(`${PAYMENT_ENDPOINT}/bookings`, {
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          body: JSON.stringify(payload)
     }),
} as const;