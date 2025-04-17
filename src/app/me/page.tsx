"use client";

import { useAppContext } from "@/components/app-provider";
import NavLink from "@/components/NavLink";
import { AccountType } from "@/schemas/account.schema";
import Image from "next/image";


export default function Profile() {

     const { account } = useAppContext();

     console.log(account)

     return <>
          <div className="p-4">
               <h1 className="text-xl font-semibold">
                    Thông tin cá nhân
               </h1>
          </div>
          <div>

          </div>
     </>
}