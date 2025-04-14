"use client";

import { useState } from "react";
import AccountManagerTable from "./account-table";

import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
   } from "@/components/ui/select"

export default function ManagerAdminPage() {
     const [role, setRole] = useState("COURT_MANAGER");

     return (

          <>
               <div className="flex flex-col pl-5 pr-5 gap-4">
                    <h1 className="text-3xl font-bold">Quản lý tài khoản</h1>

                    <div className='w-full bg-white p-4 mt-6 rounded-lg border'>
                         <div>
                              <Select onValueChange={(value) => setRole(value)} defaultValue="COURT_MANAGER">
                                   <SelectTrigger className="w-[180px]">
                                        <SelectValue placeholder="Vai trò" />
                                   </SelectTrigger>
                                   <SelectContent>
                                        <SelectItem value="ADMIN">Quản trị viên</SelectItem>
                                        <SelectItem value="COURT_MANAGER">Quản lý sân</SelectItem>
                                        <SelectItem value="PLAYER">Người chơi</SelectItem>
                                        <SelectItem value="COACH">Huấn luyện viên</SelectItem>
                                   </SelectContent>
                              </Select>
                         </div>
                    </div>
                    <AccountManagerTable role={role} >
                         
                    </AccountManagerTable>
               </div>
          </>
     )
}