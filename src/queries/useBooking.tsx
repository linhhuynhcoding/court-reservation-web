import { bookingApi } from "@/apis/booking"
import { useMutation } from "@tanstack/react-query"

export const useBookingMutation = () => {
     return useMutation({
          mutationFn: bookingApi.bookingCourt
     })
}