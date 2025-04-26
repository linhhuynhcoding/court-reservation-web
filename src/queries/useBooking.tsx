import { bookingApi } from "@/apis/booking"
import { BookingFilter } from "@/schemas/filter.schemas"
import { useMutation, useQuery } from "@tanstack/react-query"

export const useBookingMutation = () => {
     return useMutation({
          mutationFn: bookingApi.bookingCourt
     })
}

export const useGetAccountBookings = ({ id, filter, token }: { id: number, filter: BookingFilter, token: string }) => {
     return useQuery({
          queryKey: ['get-account-bookings', { id, filter, token }],
          queryFn: () => bookingApi.getAllUserBookings({ id, filter, token })
     })
}

export const useGetCourtBookings = (id: number, filter: BookingFilter, token: string ) => {
     return useQuery({
          queryKey: ['get-court-bookings', { id, filter, token }, filter],
          queryFn: () => bookingApi.getAllCourtBookings({ id, filter, token })
     })
}

export const useUpdateStatusBookingMutation = () => {
     return useMutation({
          mutationFn: bookingApi.updateBookingStatus
     })
}