import cartApi from "@/apis/cart";
import { queryClient } from "@/components/QueryProvider";
import { UpdateItemPayload } from "@/schemas/cart.schema";
import { useMutation, useQuery } from "@tanstack/react-query";

/**
 * Hook lấy giỏ hàng theo ID
 * @param id ID của giỏ hàng
 * @param enabled Bật / tắt việc tự động gọi query
 */
export const useGetCart = (id: number, token: string, enabled: boolean) => {
  return useQuery({
    queryKey: ['get-cart', id, token],
    queryFn: () => cartApi.getCart(id, token),
    staleTime: 60 * 3 * 1000,
    enabled,
  });
};

/**
 * Hook mutation thêm hoặc cập nhật sản phẩm trong giỏ hàng
 */
export const useCreateOrUpdateCartItemMutation = () => {
  return useMutation({
    mutationFn: cartApi.createOrUpdateCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['get-cart']})
    }
  });
};

/**
 * Hook mutation xóa sản phẩm khỏi giỏ hàng
 */
export const useDeleteCartItemMutation = () => {
  return useMutation({
    mutationFn: cartApi.deleteCartItem,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['get-cart']})
    }
  });
};
