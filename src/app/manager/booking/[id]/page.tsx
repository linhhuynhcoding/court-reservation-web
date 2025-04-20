"use client";


import { useParams } from "next/navigation";
import { useGetCourt } from "@/queries/useCourt";
import { ScheduelBooking } from "./schedule";

export default function CourtDetail() {
     const { id: _id } = useParams();
     const { data } = useGetCourt(Number(_id), !!_id);

     return (
          <div className="flex flex-col pl-5 pr-5 gap-4">
               <h1 className="text-3xl font-bold">{data?.payload.data.name}</h1>
               <div className="border flex justify-stretch bg-white w-fit">
                    <div className="pl-4 pr-4 bg-gray-100 w-full self-stretch">Tab</div>
                    <div className="pl-4 pr-4 w-full self-stretch">Tab</div>
                    <div className="pl-4 pr-4 w-full self-stretch">Tab</div>
                    <div className="pl-4 pr-4 w-full self-stretch">Tab</div>
               </div>
               <div className="border bg-white rounded-lg w-full p-10 overflow-auto max-h-[800px]">
                    <ScheduelBooking></ScheduelBooking>
               </div>
          </div>
     )
}