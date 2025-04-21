import { apiOrder } from "@/apis/order"
import { BaseFilter } from "@/schemas/filter.schemas"
import { useMutation, useQueries, useQuery } from "@tanstack/react-query"

export const usePlaceOrderBookingMutation = () => {
     return useMutation({
          mutationFn: apiOrder.placeOrderBooking
     })
}

export const usePlaceOrderMutation = () => {
     return useMutation({
          mutationFn: apiOrder.placeOrder
     })
}

export const useGetAccountOrder = ({ id, filter, token }: { id: number, filter: BaseFilter, token: string }) => {
     return useQuery({
          queryKey: ['get-account-orders', { id, filter, token }],
          queryFn: () => apiOrder.getAccountOrders({ id, filter, token })
     })
}