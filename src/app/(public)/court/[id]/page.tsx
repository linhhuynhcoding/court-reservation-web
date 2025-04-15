"use client";

import { Button } from "@/components/ui/button";
import { useGetCourt } from "@/queries/useCourt"
import { useParams } from "next/navigation";

export default function DetailCourtPage() {
     const { id: _id } = useParams();
     const id = typeof _id === "string" ? _id : "";

     const { data } = useGetCourt(id, !!_id);

     return (
          <div className="w-full bg-gray-50 h-fit min-h-dvh flex justify-center">
               <div className="w-[80%] bg-pink-50 h-fit min-h-dvh flex flex-col gap-4 justify-start">
                    <div className="sticky top-0 right-0 left-0 bg-white rounded-b-lg flex p-2 pb-4  justify-between items-center">
                         <div className="flex gap-4 flex-col pl-4">
                              <h1 className="text-2xl font-semibold">
                                   {data?.payload?.data?.name}
                              </h1>
                              <h2 className="text-ld font-normal">
                                   {data?.payload?.data?.address?.city}
                              </h2>
                         </div>
                         <div className="flex gap-6 pr-10">
                              <Button variant="outline" className="pl-8 pr-8 text-sky-700 border-sky-700 h-[40px] w-[160px] hover:text-sky-700 hover:cursor-pointer" size={"lg"}>Lịch trống</Button>
                              <Button variant="outline" className="pl-8 pr-8 text-white bg-sky-700 h-[40px] w-[160px] hover:bg-sky-700 hover:text-white hover:cursor-pointer " size={"lg"}>Đặt ngay</Button>
                         </div>
                    </div>

                    <div className="grid grid-rows-2 grid-cols-4 gap-2 items-stretch justify-stretch">
                         <div className="rounded-lg min-h-[120px] bg-red-400 row-span-2 col-span-2">image</div>
                         <div className="rounded-lg min-h-[120px] bg-red-400">image</div>
                         <div className="rounded-lg min-h-[120px] bg-red-400">image</div>
                         <div className="rounded-lg min-h-[120px] bg-red-400">image</div>
                         <div className="rounded-lg min-h-[120px] bg-red-400">image</div>

                    </div>

                    <div className="grid grid-rows-2 grid-cols-2 gap-4 items-stretch justify-stretch ">
                         <div className="rounded-lg min-h-[120px] bg-green-400">1</div>
                         <div className="rounded-lg min-h-[120px] bg-green-400 row-span-2">3</div>
                         <div className="rounded-lg min-h-[120px] bg-green-400">2</div>
                    </div>

                    <div className="rounded-lg bg-yellow-300 w-full min-h-[120px]">
                         Map
                    </div>
               </div>


          </div>
     )
}