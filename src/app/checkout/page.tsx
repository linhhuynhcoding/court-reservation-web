"use client";

import { useAppContext } from "@/components/app-provider";
import { Button } from "@/components/ui/button";
import { getAccessTokenFromLocalStorage, handleErrorApi } from "@/lib/utils";
import { useGetCart } from "@/queries/useCart";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { CartItem } from "../cart/cart-item";
import { AddressForm } from "@/components/address-form";
import { CardSelect } from "@/components/ui/cart-select";
import { PaymentMethod } from "@/constants/types";
import { usePlaceOrderMutation } from "@/queries/useOrder";
import { PlaceOrderPayload, PlaceOrderPayloadSchema } from "@/schemas/order.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

const CheckoutPage: React.FC = () => {
     const router = useRouter();
     const { account } = useAppContext();
     const [payment, setPayment] = useState<string>(PaymentMethod.COD)
     const token = getAccessTokenFromLocalStorage();
     const { data, isLoading } = useGetCart(account?.cartId ?? 0, token ?? "", !!account);
     const usePlaceOrder = usePlaceOrderMutation();
     const items = useMemo(() => data?.payload?.data?.items ?? [], [data]);
     const total = useMemo(() => {
          if (!items.length) return 0;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          return items.map((i: any) => i.selected ? i.product.price * i.quantity : 0)
               .reduce((t: number, c: number) => t + c);
     }, [items])

     const {
          register,
          watch,
          getValues,
          formState: { errors },
          control
     } = useForm<PlaceOrderPayload>({
          resolver: zodResolver(PlaceOrderPayloadSchema),
          defaultValues: {
               createAddressPayload: {
                    longitude: 0,
                    latitude: 0
               },
               paymentMethod: PaymentMethod.COD,
          },
     })
     const handleSubmit = async () => {
          try {
               const token = getAccessTokenFromLocalStorage();

               if (!account || !token) {
                    router.push("/login");
               }

               const payload: PlaceOrderPayload = {
                    createAddressPayload: {
                         ...getValues().createAddressPayload,
                         city: getValues().createAddressPayload.city?.split(",")?.[0] ?? "",
                         district: getValues().createAddressPayload.district?.split(",")?.[0] ?? "",
                         ward: getValues().createAddressPayload.ward?.split(",")?.[0] ?? "",
                         addressLine: getValues().createAddressPayload.addressLine?.split(",")?.[0] ?? "",
                    },
                    paymentMethod: payment
               }

               const response = await usePlaceOrder.mutateAsync({ payload, token: token! })

               toast.success(response.payload.message);

          } catch (error) {
               handleErrorApi({ error });
          }
     }

     return (
          <div className="w-full bg-gray-100 min-h-dvh flex justify-center">
               <div className="w-[70%] min-h-[400px] p-4 grid grid-cols-[2fr_1fr] gap-4">
                    <div className="flex flex-col gap-4">
                         <div className="flex flex-col">
                              <div className="p-4 bg-white border mb-4">
                                   <div className="mb-4">
                                        <h1 className="text-lg font-semibold">Địa chỉ giao hàng</h1>
                                   </div>
                                   <div>
                                        <AddressForm register={register} watch={watch} control={control}></AddressForm>
                                   </div>
                              </div>
                              <div className="p-4 bg-white border mb-4">
                                   <div className="mb-4">
                                        <h1 className="text-lg font-semibold">Phương thức thanh toán</h1>
                                   </div>
                                   <div>
                                        <div className="flex gap-4 p-4">
                                             <CardSelect value={PaymentMethod.COD} isSelected={payment === PaymentMethod.COD} onClick={(value) => { setPayment(() => value) }} title="Thanh toán COD" ></CardSelect>
                                             <CardSelect value={PaymentMethod.VNPAY} isSelected={payment === PaymentMethod.VNPAY} onClick={(value) => { setPayment(() => value) }} title="Thanh toán online" ></CardSelect>
                                        </div>
                                   </div>
                              </div>
                              <div className="p-4 bg-white grid grid-cols-[1fr_2fr_1fr_1fr_1fr] border justify-stretch justify-items-center">
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
                                                  if (!item.selected) return;

                                                  return <CartItem key={index} item={item}
                                                       disabled={true}
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
                    </div>
                    <div className="bg-white border flex flex-col p-4 justify-start">
                         <div className="p-4 border-b w-full text-center">
                              <h1 className="text-3xl font-bold text-blue-700">Thanh toán</h1>
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
                              <Button onClick={() => handleSubmit()} className="w-full border border-blue-900 hover:bg-blue-900 hover:text-white hover:cursor-pointer" variant={"outline"}>Thanh toán</Button>
                         </div>
                    </div>
               </div>
          </div>
     )
}

export default CheckoutPage;