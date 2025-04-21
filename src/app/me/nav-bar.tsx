"use client";
import { useAppContext } from "@/components/app-provider";

import Image from "next/image";
import NavLink from "@/components/NavLink";


const HREFS = [
     { name: "Thông tin cá nhân", href: "/me" },
     { name: "Đơn hàng", href: "/me/order" },
     { name: "Lịch sử đặt sân", href: "/me/booking" },
   ];
   

export function NavBar() {
     const { account } = useAppContext();

     return (
          <nav className="w-full flex flex-col justify-start basis-1/3 border rounded-lg">
               <div className="border-b  w-full flex flex-col justify-center gap-2 p-4 h-fit">
                    <div className="relative aspect-square m-4">
                         <Image src="https://avatar.iran.liara.run/public/31"
                              fill alt="" objectFit="cover"
                         ></Image>
                    </div>
                    <h1 className="text-xl text-center font-bold">
                         {account?.name ?? "Nhật Linh"}
                    </h1>
               </div>
               <ul>
                    <NavLink hrefs={HREFS}
                         style="border-b  w-full flex flex-col justify-center gap-2 p-4 h-fit"
                         hover_style="hover:text-black hover:font-semibold hover:border-b-black"
                         focus_style="text-black font-semibold border-b-black"
                    >

                    </NavLink>

               </ul>
          </nav>
     )
}