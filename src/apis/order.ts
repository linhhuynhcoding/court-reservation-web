import { http } from "@/lib/http";
import { toQueryString } from "@/lib/utils";
import { BaseFilter } from "@/schemas/filter.schemas";
import { PlaceOrderBookingPayload, PlaceOrderPayload } from "@/schemas/order.schema";

const ORDER_ENPOINT = '/orders'

export const apiOrder = {
     /**
      * Place order kèm booking
      * Next Client to Server
      * @param (body) PlaceOrderBookingPayload Thông tin order
      * @returns 
      */
     placeOrderBooking: async ({ payload, token }: { payload: Partial<PlaceOrderBookingPayload>, token: string }) => http.post<unknown>(`${ORDER_ENPOINT}/booking`, {
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          body: JSON.stringify(payload)
     }),

     /**
      * Place order 
      * Next Client to Server
      * @param (body) PlaceOrderPayload Thông tin order
      * @returns 
      */
     placeOrder: async ({ payload, token }: { payload: Partial<PlaceOrderPayload>, token: string }) => http.post<unknown>(`${ORDER_ENPOINT}`, {
          headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          body: JSON.stringify(payload)
     }),

     /**
      * Lấy danh sách đơn hàng của tài khoản, kèm phân trang
      * Next Client to Server
      * @param (path) id ID của tài khoản
      * @param (query) OrderFilter Bộ lọc đơn hàng (phân trang, sắp xếp,...)
      * @returns 
      */
     getAccountOrders: ({ id, filter, token }: { id: number, filter: BaseFilter, token: string }) =>
          http.get<unknown>(`/accounts/${id}/orders${toQueryString(filter)}`, {
               headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
          }),
} as const;