"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { decodeToken, getAccessTokenFromLocalStorage, handleErrorApi } from "../lib/utils";
import { RoleType } from "../constants/types";
import { AccountResType, AccountType } from "../schemas/account.schema";
import authApi from "../apis/auth";
import accountApi from "../apis/account";
import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { OrgaResponse } from "@/schemas/court.schema";
import { useAppContext } from "./app-provider";
import courtApi from "@/apis/court";


const ManagerContext = createContext<{
     org: OrgaResponse | null;
     setOrg: (role: OrgaResponse) => void;
}>({
     org: null,
     setOrg: () => { },
});

export const useManagerContext = () => {
     return useContext(ManagerContext);
};

export const ManagerProvider = ({ children }: { children: React.ReactNode }) => {
     const { account: manager } = useAppContext();

     const [org, setOrg] = useState<OrgaResponse | null>(() => {
          return null
     })

     useEffect(() => {
          const accessToken = getAccessTokenFromLocalStorage();
          if (accessToken && manager) {
               const fetchAccount = async () => await courtApi.getCourtByManagerId(manager?.id);

               fetchAccount().then(({ payload }) => {
                    const _org = (payload?.data as OrgaResponse);
                    setOrg(_org)
                    console.log(_org);
               }).catch(e => {
                    handleErrorApi({ error: "Lỗi server!" })
               });
          }
     }, [manager]);

     return (
          <ManagerContext value={{ org: org, setOrg: setOrg }}>
               {children}
          </ManagerContext>
     );
}