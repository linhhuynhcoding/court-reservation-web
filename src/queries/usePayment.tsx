import { apiPayment } from "@/apis/payment"
import { useMutation } from "@tanstack/react-query"

export const usePaymentBookingMutation = () => {
     return useMutation({
          mutationFn: apiPayment.paymentBooking
     })
}