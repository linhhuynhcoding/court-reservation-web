"use client";
import { BiDetail, BiSolidDrink } from "react-icons/bi";
import { MdOutlinePayment } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { useCallback, useMemo, useState } from "react";
import Image from "next/image";
import sample from "@/assets/sample.webp"
import { useParams, useRouter } from "next/navigation";
import { useGetCourt } from "@/queries/useCourt";
import BookingForm from "./booking-form";

import { BookingFormSchema, BookingFormPayload } from "@/schemas/booking.schema";
import { processTimeBooking } from "@/lib/utils";
import { Button } from "@/components/ui/button";
const SAMPLE_IMAGE = sample.src;

// TODO: CẦN PHẢI REFACTOR LẠI, CẤU TRÚC COMPONENT CHƯA ỔN
export default function BookingPage() {
     const router = useRouter();
     const { id: _id } = useParams();
     const id = typeof _id === "string" ? _id : "";
     const { data } = useGetCourt(id, !!_id);
     const court = useMemo(() => (data?.payload?.data ?? {}), [data]);
     const [info, setInfo] = useState<BookingFormPayload>();

     const onChangeInfo = useCallback((value: BookingFormPayload | undefined) => {
          setInfo(value);
          console.log(info);
     }, []);

     return (
          <div className=" w-[60%] mt-4 flex flex-col gap-6">
               {/* PROCESS BAR */}
               <div className="flex justify-start gap-2  w-full font-normal text-md">
                    <div className="flex items-center gap-2  w-full">
                         <div className="flex items-center gap-2">
                              <BiDetail className="text-xl text-blue-700" />

                              Thông Tin Booking
                         </div>
                         <div className="w-full flex-1 h-[1px] bg-blue-900">

                         </div>
                    </div>
                    <div className="flex items-center gap-2  w-full">
                         <div className="flex items-center gap-2">
                              <BiSolidDrink className="text-xl text-blue-700/20" />

                              Nước Uống
                         </div>
                         <div className="w-full flex-1 h-[1px] bg-blue-900">

                         </div>
                    </div>
                    <div className="flex items-center gap-2  w-full">
                         <div className="flex items-center gap-2">
                              <MdOutlinePayment className="text-xl text-blue-700/20" />

                              Thanh Toán
                         </div>
                         <div className="w-full flex-1 h-[1px] bg-blue-900">

                         </div>
                    </div>
                    <div className="flex items-center gap-2 flex-none">
                         <div className="flex items-center gap-2">
                              <TiTick className="text-xl text-blue-700/20" />

                              Hoàn Tất
                         </div>
                    </div>
               </div>
               <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] lg:gap-2">
                    {/* FORM */}
                    <BookingForm courts={court?.courts} onChangeInfo={onChangeInfo}></BookingForm>

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
                              <div className="relative ">
                                   <Image className="rounded-md" src={SAMPLE_IMAGE} objectFit="cover" fill alt=""></Image>
                              </div>
                         </div>
                         <div className="p-4 border-b w-full flex flex-col items-start min-h-[120px]">
                              <div className="flex text-left flex-col w-full">
                                   <h4 className="font-semibold text-blue-900">{"Thông tin chi tiết"}</h4>
                              </div>
                              <div className="w-full">
                                   <div className="text-left">
                                        <span className="text-xs font-semibold">{info?.date?.toDateString()}</span>
                                   </div>
                                   <div className="text-left flex justify-between ">
                                        <div>
                                             <span className="text-xs">
                                                  {info?.time && info?.duration ? processTimeBooking(info.time, info.duration) : ""}
                                             </span>
                                             <span>  </span>
                                             <span className="text-xs">
                                                  {court.courts?.filter((c: { id: number, name: string }) => c.id === Number(info?.courtId))?.[0]?.name ?? ""}
                                             </span>
                                        </div>
                                        <div className="font-bold text-blue-900">
                                             {
                                                  info?.courtId ?
                                                       <span>{Math.round((info?.duration ?? 0) * court?.price).toLocaleString("vi-VN")}đ</span>
                                                       : null
                                             }
                                        </div>
                                   </div>

                              </div>
                         </div>
                         <Button className="mt-4 w-full bg-blue-900 text-white hover:bg-blue-600 hover:cursor-pointer">Đặt sân</Button>
                    </div>
               </div>

          </div>
     )
} 