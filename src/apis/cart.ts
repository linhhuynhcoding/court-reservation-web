import { http } from "@/lib/http";
import { UpdateItemPayload } from "@/schemas/cart.schema";

const CART_ENDPOINT = '/carts';

const cartApi = {

  /**
   * Lấy giỏ hàng theo ID
   * Next Client to Server
   * @param (path) id ID của giỏ hàng
   * @returns 
   */
  getCart: (id: number) => http.get<unknown>(`${CART_ENDPOINT}/${id}`, {}),

  /**
   * Tạo hoặc cập nhật sản phẩm trong giỏ hàng
   * Next Client to Server
   * @param (path) id ID của giỏ hàng
   * @param (body) UpdateItemPayload Dữ liệu sản phẩm cần cập nhật
   * @returns 
   */
  createOrUpdateCartItem: ({id, payload}:{id: number, payload: UpdateItemPayload}) => http.post<unknown>(`${CART_ENDPOINT}/${id}`, {
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  }),

  /**
   * Xóa sản phẩm khỏi giỏ hàng
   * Next Client to Server
   * @param (path) id ID của giỏ hàng
   * @param (query) itemId ID của sản phẩm cần xóa
   * @returns 
   */
  deleteCartItem: ({id, itemId} : {id: number, itemId: number}) => http.delete<unknown>(`${CART_ENDPOINT}/${id}?itemId=${itemId}`, {
    headers: { "Content-Type": "application/json" },
  }),
}

export default cartApi;
