"use client";

import { useAppContext } from "@/components/app-provider";
import NavLink from "@/components/NavLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getAccessTokenFromLocalStorage, handleErrorApi } from "@/lib/utils";
import { useUpadateAccountMutation } from "@/queries/useAccount";
import { AccountType } from "@/schemas/account.schema";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";


export default function Profile() {

     // === CONTEXT ===
     const { account } = useAppContext();

     // === STATES ===
     const router = useRouter();

     const [editMode, setEditMode] = useState(false);
     const [name, setName] = useState(account?.name ?? "");
     const [mail, setMail] = useState(account?.email ?? "");

     // === MUTATIONS ===
     const useUpdateAccount = useUpadateAccountMutation();

     // === HANDLERS ===
     const handleUpdateAccount = async () => {

          try {
               const token = getAccessTokenFromLocalStorage();

               if (!token || !account) {
                    router.push("/login");
               }

               const response = await useUpdateAccount.mutateAsync(
                    {
                         id: account!.id!,
                         payload: {
                              email: mail !== "" ? mail : account!.email,
                              name: name !== "" ? name : account!.name,
                         },
                         accessToken: token!,
                    }
               )

               toast.success(response.payload.message);
          } catch (error) {
               handleErrorApi({ error })
          }
     }

     console.log(account)

     return <>
          <div className="p-4">
               <h1 className="text-xl font-semibold">
                    Thông tin cá nhân
               </h1>
          </div>
          <div className="pl-8 flex flex-col  gap-2">
               <div className="flex">
                    <div className="w-[50px] font-bold flex items-end">
                         <span>Tên :</span>
                    </div>
                    <div>
                         {
                              !editMode
                                   ? <span>{account?.name}</span>
                                   : <Input onChange={(e) => setName(e.target.value)} type="text" className="" defaultValue={account?.name} />
                         }
                    </div>
               </div>
               <div className="flex">
                    <div className="w-[50px] font-bold flex items-end">
                         <span>Email :</span>
                    </div>
                    <div>
                         {
                              !editMode
                                   ? <span>{account?.email}</span>
                                   : <Input onChange={(e) => setMail(e.target.value)} type="text" className="" defaultValue={account?.email} />
                         }
                    </div>
               </div>
          </div>
          <div className="p-4">
               {
                    !editMode ?
                         <Button onClick={() => { setEditMode(true) }} variant={"outline"}>Chỉnh sửa</Button>
                         :
                         <div className="flex gap-4">
                              <Button onClick={() => { handleUpdateAccount() }} variant={"outline"}>Xác nhận</Button>
                              <Button onClick={() => { setEditMode(false) }} variant={"outline"}>Hủy</Button>
                         </div>
               }
          </div>
     </>
}