"use client";

import { Button } from "@/components/ui/button";
import { CartItem } from "./cart-item";
import { Checkbox } from "@/components/ui/checkbox"
import { useCreateOrUpdateCartItemMutation, useDeleteCartItemMutation, useGetCart } from "@/queries/useCart";
import { useAppContext } from "@/components/app-provider";
import { getAccessTokenFromLocalStorage, handleErrorApi } from "@/lib/utils";
import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { UpdateItemPayload } from "@/schemas/cart.schema";

const CartPage: React.FC = () => {
     const router = useRouter();
     const { account } = useAppContext();
     const token = getAccessTokenFromLocalStorage();
     const { data, isLoading } = useGetCart(account?.cartId ?? 0, token ?? "", !!account);
     const items = useMemo(() => data?.payload?.data?.items ?? [], [data]);
     const total = useMemo(() => {
          if (!items.length) return 0;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return items.map((i: any) => i.selected ? i.product.price * i.quantity : 0)
               .reduce((t: number, c: number) => t + c);
     }, [items])

     const useDeleteItem = useDeleteCartItemMutation();
     const useUpdateItem = useCreateOrUpdateCartItemMutation();

     const handleDeleteItem = async (itemId: number) => {
          try {
               const token = getAccessTokenFromLocalStorage();

               if (!account || !token) {
                    router.push("/login");
               }

               const response = await useDeleteItem.mutateAsync({
                    id: account!.cartId!,
                    itemId,
                    token: token!,
               });

               toast.success(response.payload.message);
               router.refresh();
          } catch (error) {
               handleErrorApi({ error });
          }
     }

     const handleUpdateItem = async (payload: UpdateItemPayload) => {
          try {
               const token = getAccessTokenFromLocalStorage();

               if (!account || !token) {
                    router.push("/login");
               }

               const response = await useUpdateItem.mutateAsync({
                    id: account!.cartId!,
                    payload,
                    token: token!,
               });

               toast.success(response.payload.message);
          } catch (error) {
               handleErrorApi({ error });
          }
     }

     return (
          <div className="w-full bg-gray-100 min-h-dvh flex justify-center">
               <div className="w-[70%] bg-pink-100 min-h-[400px] p-4 grid grid-cols-[2fr_1fr] gap-4">
                    <div className="bg-red-100 flex flex-col gap-4">
                         <div className="p-4 bg-white grid grid-cols-[0.5fr_1fr_2fr_1fr_1fr_1fr_0.3fr] border justify-stretch justify-items-center">
                              <div><Checkbox /></div>
                              <div className="text-left w-full items-left col-span-2"><span>Sản phẩm</span></div>
                              <div className="text-left w-full items-left"><span>Số lượng</span></div>
                              <div className="text-left w-full items-left"><span>Đơn giá</span></div>
                              <div className="text-left w-full items-left"><span>Giá tiền</span></div>
                         </div>
                         <div className="flex flex-col gap-4 h-full">
                              {
                                   items?.length ?
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        items.map((item: any, index: number) => {
                                             return <CartItem key={index} item={item}
                                                  onDeleteItem={handleDeleteItem}
                                                  onUpdateItem={handleUpdateItem}
                                             >
                                             </CartItem>
                                        })
                                        :
                                        <div className="bg-white h-full border flex justify-center items-center">
                                             <span className="text-xl">Chưa có sản phẩm trong giỏ hàng</span>
                                        </div>
                              }
                         </div>
                    </div>
                    <div className="bg-white border flex flex-col p-4 justify-start">
                         <div className="p-4 border-b w-full text-center">
                              <h1 className="text-3xl font-bold text-blue-700">Giỏ hàng</h1>
                         </div>
                         <div className="pt-4 pb-4 border-b flex flex-col content-betwwen">
                              <div className="flex flex-col min-h-[100px]">
                                   <div className="flex justify-between">
                                        <span>Sản phẩm 1&nbsp;<strong>x</strong>&nbsp;4</span>
                                        <span>{(90000).toLocaleString("vi-VN")}đ</span>
                                   </div>
                                   {
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        items.map((i: any, index: number) => {
                                             if (!i.selected) return;

                                             return <div key={index} className="flex justify-between">
                                                  <span>{i.product.name}&nbsp;<strong>x</strong>&nbsp;{i.quantity}</span>
                                                  <span>{(i.product.price * i.quantity).toLocaleString("vi-VN")}đ</span>
                                             </div>
                                        })
                                   }
                              </div>
                              <div className="flex justify-between text-lg font-semibold">
                                   <div className=" ">
                                        <span>Tổng cộng</span>
                                   </div>
                                   <div>
                                        {items && (total ?? 0).toLocaleString("vi-VN")}đ
                                   </div>
                              </div>
                         </div>
                         <div className="pt-3 w-full">
                              <Button className="w-full border border-blue-900 hover:bg-blue-900 hover:text-white hover:cursor-pointer" variant={"outline"}>Mua hàng</Button>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default CartPage;