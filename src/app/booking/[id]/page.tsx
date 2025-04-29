"use client";
import { BiDetail, BiSolidDrink } from "react-icons/bi";
import { MdOutlinePayment } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { useCallback, useContext, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useGetCourt } from "@/queries/useCourt";
import BookingForm from "./booking-form";
import Image from "next/image";
import { CalendarIcon, FormInput } from "lucide-react";
import sample from "@/assets/sample.webp"
import { BookingFormSchema, BookingFormPayload } from "@/schemas/booking.schema";
import { getAccessTokenFromLocalStorage, handleErrorApi, processTimeBooking } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { OrderDrinkForm } from "./order-drink-form";
import { Item, PlaceOrderBookingPayload } from "@/schemas/order.schema";
import { OrgaResponse } from "@/schemas/court.schema";
import { InfoContextProvider, useInfoContext } from "./info-provider";
import { usePlaceOrderBookingMutation } from "@/queries/useOrder";
import { useAppContext } from "@/components/app-provider";
import log from "@/lib/logger";
import { PaymentForm } from "./payment";
import { usePaymentBookingMutation } from "@/queries/usePayment";

const SAMPLE_IMAGE = sample.src;



// TODO: CẦN PHẢI REFACTOR LẠI, CẤU TRÚC COMPONENT CHƯA ỔN
export default function BookingPage() {
     const router = useRouter();
     const { id: _id } = useParams();
     const { data } = useGetCourt(Number(_id), !!_id);
     const { info, process, changeProcess } = useInfoContext();
     const usePlaceOrder = usePlaceOrderBookingMutation();
     const usePaymentBooking = usePaymentBookingMutation();

     const court: OrgaResponse = useMemo(() => (data?.payload?.data ?? {}), [data]);
     const total: number | undefined = useMemo(() => {
          if (info?.order?.items?.length === 0) return 0;

          return info?.order?.items
               ?.map((i: Item & { productName?: string, productPrice?: number }) => (i.productPrice! * i.quantity))
               ?.reduce((t: number | undefined, c: number | undefined) => t! + c!) ?? 0;
     }, [info])

     const handlePlaceOrder = async () => {
          try {
               const payload = info?.order;
               const token = getAccessTokenFromLocalStorage();

               if (!payload || !token) return;

               const response = await usePlaceOrder.mutateAsync({ payload, token });

               log.info(response);
               changeProcess(3);

               router.push("/me")
          }
          catch (error) {
               handleErrorApi({ error });
          }
     }

     const handlePurchase = async () => {
          try {
               const payload = info?.payment;
               const token = getAccessTokenFromLocalStorage();

               if (!payload || !token) return;

               const response = await usePaymentBooking.mutateAsync({ payload, token });

               log.info(response);
               if (response.payload?.data?.redirect) {
                    window.open(response.payload?.data?.redirectUrl, "_blank")
               }

               changeProcess(4);
          } catch (error) {
               handleErrorApi({ error });

          }
     }

     return (
          <div className="md:w-[80%] w-[80%] mt-4 flex flex-col gap-6">

               {/* PROCESS BAR */}
               <div className="flex justify-start gap-2  w-full font-normal text-md">
                    <div className="flex items-center gap-2 w-full">
                         <div className="flex items-center gap-2">
                              <BiDetail className="text-xl text-blue-700" />

                              Thông Tin Booking
                         </div>
                         <div className="w-full flex-1 h-[1px] bg-blue-900">

                         </div>
                    </div>
                    <div className="flex items-center gap-2  w-full">
                         <div className="flex items-center gap-2">
                              <BiSolidDrink className={`text-xl text-blue-700${process > 1 ? '' : '/20'}`} />

                              Nước Uống
                         </div>
                         <div className="w-full flex-1 h-[1px] bg-blue-900">

                         </div>
                    </div>
                    <div className="flex items-center gap-2  w-full">
                         <div className="flex items-center gap-2">
                              <MdOutlinePayment className={`text-xl text-blue-700${process > 2 ? '' : '/20'}`} />

                              Thanh Toán
                         </div>
                         <div className="w-full flex-1 h-[1px] bg-blue-900">

                         </div>
                    </div>
                    <div className="flex items-center gap-2 flex-none">
                         <div className="flex items-center gap-2">
                              <TiTick className={`text-xl text-blue-700${process > 3 ? '' : '/20'}`} />

                              Hoàn Tất
                         </div>
                    </div>
               </div>

               <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] lg:gap-2">

                    {/* FORM AREA */}
                    <div className="w-full max-w-full overflow-hidden">
                         {/* BOOKING COURT */}
                         {
                              process === 1 ?
                                   <BookingForm
                                        court={court}
                                   ></BookingForm>
                                   : null
                         }

                         {/* DRINKS ORDER */}
                         {
                              process === 2 ?
                                   <OrderDrinkForm></OrderDrinkForm>
                                   : null
                         }

                         {/* PAYMENT */}
                         {
                              process === 3 ?
                                   <PaymentForm></PaymentForm>
                                   : null
                         }

                    </div>

                    {/* CARD INFO */}
                    <div className="flex flex-col p-4 border rounded-xl shadow-lg items-center text-center min-h-[40px]">
                         <div className="pb-2 border-b w-full text-xl font-semibold text-blue-900">
                              <h1>Booking</h1>
                         </div>
                         <div className="p-4 border-b w-full grid grid-cols-[1.5fr_1fr] gap-4 min-h-[120px]">
                              <div className="flex text-left flex-col w-full pb-6">
                                   <h4 className="font-semibold text-blue-900">{court?.name ?? "Tên sân"}</h4>
                                   <span className="text-xs">
                                        {court?.address ? [court?.address?.addressLine, court?.address?.ward, court?.address?.district, court?.address?.city].join(", ")
                                             : "02 Võ Oanh, Phường 21, Quận Bình Thạnh, Tp Hồ Chí Minh"}
                                   </span>
                              </div>
                              <div className="relative z-0">
                                   <Image className="rounded-md" src={SAMPLE_IMAGE} objectFit="cover" fill alt=""></Image>
                              </div>
                         </div>
                         <div className="p-4 border-b w-full flex flex-col items-start min-h-[120px]">
                              <div className="flex text-left flex-col w-full">
                                   <h4 className="font-semibold text-blue-900">{"Thông tin chi tiết"}</h4>
                              </div>
                              <div className="w-full">
                                   <div className="text-left">
                                        <span className="text-xs font-semibold">{info?.booking?.date?.toDateString()}</span>
                                   </div>
                                   <div className="text-left flex justify-between ">
                                        <div>
                                             <span className="text-xs">
                                                  {info?.booking?.time && info?.booking?.duration ? processTimeBooking(info?.booking.time, Number(info?.booking.duration)) : ""}
                                             </span>
                                             <span>  </span>
                                             <span className="text-xs">
                                                  {court.courts?.filter((value) => value.id === Number(info?.booking?.courtId))?.[0]?.name ?? ""}
                                             </span>
                                        </div>
                                        <div className="font-bold text-blue-900">
                                             {
                                                  info?.booking?.courtId ?
                                                       <span>{Math.round(Number(info?.booking?.duration) * Number(court?.price)).toLocaleString("vi-VN")}đ</span>
                                                       : null
                                             }
                                        </div>
                                   </div>
                                   {
                                        info?.order?.items.map((i: Item & { productName?: string, productPrice?: number }, index: number) => {
                                             return (
                                                  <div key={index} className="text-left flex justify-between ">
                                                       <div>
                                                            <span className="text-xs">{i.productName} x {i.quantity}</span>
                                                       </div>
                                                       <div className="font-bold text-blue-900">
                                                            <span>{Number((i?.productPrice ?? 0) * i.quantity).toLocaleString("vi-VN")}đ</span>
                                                       </div>
                                                  </div>
                                             );
                                        })
                                   }


                                   <div className="text-left flex justify-between pt-5">
                                        <div>
                                             <span className="text-md">Tổng cộng</span>
                                        </div>
                                        <div className="font-bold text-blue-900">
                                             {
                                                  info?.booking?.courtId ?
                                                       <span>{((total ?? 0) + Math.round(Number(info?.booking?.duration) * Number(court?.price))).toLocaleString("vi-VN")}đ</span>
                                                       : null
                                             }
                                        </div>
                                   </div>
                              </div>
                         </div>
                         <div className="flex flex-row w-full justify-between self-start gap-2 mt-4">
                              {
                                   process === 1 &&
                                   <Button form={`form-booking`} type="submit" className="mt-4 w-full bg-blue-900 text-white hover:bg-blue-600 hover:cursor-pointer">Đặt sân</Button>
                              }
                              {
                                   process === 2 &&
                                   <>
                                        <Button onClick={() => changeProcess(3)} type="submit" className="flex-1 bg-white border border-blue-900 text-blue-900  hover:bg-sky-100/40 hover:cursor-pointer">Bỏ qua</Button>
                                        <Button onClick={() => handlePlaceOrder()} type="submit" className="flex-1 bg-blue-900 text-white hover:bg-blue-900/50 hover:cursor-pointer">Đặt ngay</Button>
                                   </>
                              }
                              {
                                   process === 3 &&
                                   <Button onClick={() => handlePurchase()}  className="mt-4 w-full bg-blue-900 text-white hover:bg-blue-600 hover:cursor-pointer">Thanh toán</Button>
                              }
                         </div>
                    </div>
               </div>
          </div>

     )
} 