"use client";

import Image from "next/image";
import { FaClock, FaLocationArrow, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";
import sample from "@/assets/sample.webp"
import { OrgaResponse } from "@/schemas/court.schema";

const SAMPLE_IMAGE = sample.src;
// const SAMPLE_IMAGE = 'https://placehold.co/600x400/png';

function CourtCart({ orga = {
     name: "Sân Cuộc tình dĩ vãng",
     price: 24.000,
     address: {
          id: 0,
          addressLine: "",
          city: "Tp Hồ Chí Minh",
          district: "",
          ward: "",
          latitude: 0,
          longitude: 0,
     },
     courts: [],
     numberOfCourts: 0,
     phone: "",
     status: "",
     id: 0
} }: { orga?: OrgaResponse }) {
     return (
          <div className={`relative bg-white flex flex-col justify-self-stretch border border-xs border-gray-200
 md:w-2xs w-full  p-3 rounded-md gap-2 max-h-[500px] hover:cursor-pointer`}>

               <div className={`relative flex justify-items-stretch w-auto h-52 overflow-hidden`}>
                    <Image unoptimized className="rounded-sm h-full" src={orga?.imageCourts?.[0]?.image_url ?? SAMPLE_IMAGE} objectFit="cover" sizes="" fill={true} alt="" />
               </div>

               <div className="flex flex-col gap-2">
                    <h3 className="font-semibold tracking-wide lg:text-xl">
                         {orga.name}
                    </h3>
                    <span className="flex text-xs font-semibold items-center gap-2 content-self-end">
                         <FaLocationArrow />
                         {orga.address?.city}
                    </span>
                    <p className="text-gray-500 text-xs font-medium tracking-wide text-pretty">
                         Đây là sân chỉ dùng để làm bãi giữ xe...

                    </p>
                    <div className="flex justify-between text-xs font-semibold">
                         <span className="flex items-center gap-2">
                              <FaRegCalendarAlt />  Từ thứ 2 đến thứ 7
                         </span>
                         <span className="flex items-center gap-2">
                              <FaRegClock /> Từ 8:00 đến 23:00
                         </span>
                    </div>
                    <div className="flex items-end">
                         <span className="font-semibold text-lg leading-none text-primary">
                              {orga.price?.toLocaleString('vi')}<span>đ</span>
                         </span>
                         &nbsp; <span className="font-semibold text-xs">/1 giờ</span>
                    </div>
               </div>
          </div>

     );
}

export default CourtCart;