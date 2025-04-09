"use client";

import Image from "next/image";
import { FaClock, FaRegCalendarAlt, FaRegClock } from "react-icons/fa";

const SAMPLE_IMAGE = 'https://placehold.co/600x400/png';

function CourtCart() {
     return (
          <div className={`relative bg-white flex flex-col justify-self-stretch
 w-xs p-4 rounded-md gap-2 shadow-lg shadow-gray`}>

               <div className={`relative flex justify-items-stretch w-auto h-64 overflow-hidden`}>
                    <Image className="rounded-md h-full" src={SAMPLE_IMAGE} objectFit="cover" sizes="" fill={true} alt="" />
               </div>

               <div className="flex flex-col gap-2">
                    <h3 className="font-semibold tracking-wide lg:text-xl">
                         Sân Cuộc tình dĩ vãng
                    </h3>
                    <p className="text-gray-500 text-xs font-medium tracking-wide">
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
                         <h2 className="font-semibold tracking-wide lg:text-4xl">
                              <span>đ</span>24.000
                         </h2>
                         <span className="font-semibold">1 giờ</span>
                    </div>
               </div>
          </div>
     );
}

export default CourtCart;