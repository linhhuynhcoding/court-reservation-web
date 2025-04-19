import { apiOrder } from "@/apis/order"
import { useMutation } from "@tanstack/react-query"

export const usePlaceOrderBookingMutation = () => {
     return useMutation({
          mutationFn: apiOrder.placeOrderBooking
     })
}