"use client";

import { Button } from "@/components/ui/button";
import { useGetCourt } from "@/queries/useCourt"
import { useParams, useRouter } from "next/navigation";
import {
     Accordion,
     AccordionContent,
     AccordionItem,
     AccordionTrigger,
} from "@/components/ui/accordion"

import { CiParking1 } from "react-icons/ci";
import { RiDrinksLine } from "react-icons/ri";
import sample from "@/assets/sample.webp"
const SAMPLE_IMAGE = sample.src;

import Image from "next/image";

export default function DetailCourtPage() {
     const router = useRouter();
     const { id: _id } = useParams();
     const id = typeof _id === "string" ? _id : "";
     
     const { data: courtData } = useGetCourt(id, !!_id);

     return (
          <div className="w-full bg-gray-100 h-fit min-h-dvh flex justify-center">
               <div className="w-[80%] h-fit min-h-dvh flex flex-col gap-4 justify-start">
                    <div className="z-1 sticky top-0 right-0 left-0 bg-white rounded-b-lg flex p-2 pb-4  justify-between items-center">
                         <div className="flex gap-4 flex-col pl-4">
                              <h1 className="text-2xl font-semibold">
                                   {courtData?.payload?.data?.name}
                              </h1>
                              <h2 className="text-ld font-normal">
                                   {courtData?.payload?.data?.address?.city}
                              </h2>
                         </div>
                         <div className="flex gap-6 pr-10">
                              <Button variant="outline" className="pl-8 pr-8 text-sky-700 border-sky-700 h-[40px] w-[160px] hover:text-sky-700 hover:cursor-pointer" size={"lg"}>Lịch trống</Button>
                              <Button onClick={() => { router.push(`/booking/${id}`) }}
                                   variant="outline" className="pl-8 pr-8 text-white bg-sky-700 h-[40px] w-[160px] hover:bg-sky-700 hover:text-white hover:cursor-pointer " size={"lg"}>Đặt ngay</Button>
                         </div>
                    </div>

                    <div className="z-0 grid grid-rows-2 grid-cols-4 h-82 gap-2 items-stretch justify-stretch">
                         <div className="relative h-[100%] rounded-lg min-h-[120px] bg-red-400 row-span-2 col-span-2">
                              <Image src={SAMPLE_IMAGE} className="rounded-sm" objectFit="cover" fill alt="" ></Image>
                         </div>
                         <div className="relative h-[100%] rounded-lg min-h-[120px] bg-red-400">
                              <Image src={SAMPLE_IMAGE} className="rounded-sm" objectFit="cover" fill alt="" ></Image>
                         </div>
                         <div className="relative h-[100%] rounded-lg min-h-[120px] bg-red-400">
                              <Image src={SAMPLE_IMAGE} className="rounded-sm" objectFit="cover" fill alt="" ></Image>
                         </div>
                         <div className="relative h-[100%] rounded-lg min-h-[120px] bg-red-400">
                              <Image src={SAMPLE_IMAGE} className="rounded-sm" objectFit="cover" fill alt="" ></Image>
                         </div>
                         <div className="relative h-[100%] rounded-lg min-h-[120px] bg-red-400">
                              <Image src={SAMPLE_IMAGE} className="rounded-sm" objectFit="cover" fill alt="" ></Image>
                         </div>

                    </div>

                    <div className="grid grid-rows-2 grid-cols-2 gap-4 items-stretch justify-stretch ">
                         <div className="rounded-lg min-h-[120px] bg-white p-4 flex flex-col justify-between">
                              <h1 className="text-2xl font-semibold">
                                   Giá thuê
                              </h1>
                              <div className="self-end">
                                   <h2 className="absolute text-4xl font-bold blur-lg text-yellow-400/60">
                                        {(courtData?.payload?.data?.price as number ?? 10000).toLocaleString("vi-VN")}<u>đ</u> /giờ
                                   </h2>
                                   <h2 className="text-4xl font-semibold text-primary font-roboto">
                                        {(courtData?.payload?.data?.price as number ?? 10000).toLocaleString("vi-VN")}<u>đ</u> /giờ
                                   </h2>
                              </div>
                         </div>
                         <div className="rounded-lg min-h-[120px] bg-white row-span-2 p-4">
                              <h1 className="text-2xl font-semibold pb-4">
                                   Thông tin sân
                              </h1>
                              <div>
                                   <Accordion type="single" collapsible>
                                        <AccordionItem value="item-1">
                                             <AccordionTrigger>Giờ mở cửa & giá</AccordionTrigger>
                                             <AccordionContent>
                                                  Yes. It adheres to the WAI-ARIA design pattern.
                                             </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-1">
                                             <AccordionTrigger>Sơ đồ sân</AccordionTrigger>
                                             <AccordionContent>
                                                  Yes. It adheres to the WAI-ARIA design pattern.
                                             </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-1">
                                             <AccordionTrigger>Chính sách của sân</AccordionTrigger>
                                             <AccordionContent>
                                                  Yes. It adheres to the WAI-ARIA design pattern.
                                             </AccordionContent>
                                        </AccordionItem>
                                        <AccordionItem value="item-1">
                                             <AccordionTrigger>Thông tin liên lạc</AccordionTrigger>
                                             <AccordionContent>
                                                  Yes. It adheres to the WAI-ARIA design pattern.
                                             </AccordionContent>
                                        </AccordionItem>
                                   </Accordion>
                              </div>
                         </div>
                         <div className="rounded-lg min-h-[120px] bg-white flex flex-col    justify-between p-4">
                              <h1 className="text-2xl font-semibold">
                                   Tiện ích
                              </h1>
                              <div className="flex gap-4">
                                   <span className="text-md font-semibold flex items-center gap-1">
                                        <CiParking1 className="text-xl" /> Đậu xe hơi
                                   </span>
                                   <span className="text-md font-semibold flex items-center gap-1">
                                        <RiDrinksLine className="text-xl" /> Nước uống
                                   </span>
                              </div>
                         </div>
                    </div>

                    <div className="rounded-lg bg-white w-full min-h-[120px] p-4">
                         <h1 className="text-2xl font-semibold pb-4">
                              Vị trí sân
                         </h1>
                    </div>
               </div>


          </div>
     )
}