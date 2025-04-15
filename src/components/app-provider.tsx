"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { decodeToken, getAccessTokenFromLocalStorage, handleErrorApi } from "../lib/utils";
import { RoleType } from "../constants/types";
import { AccountResType, AccountType } from "../schemas/account.schema";
import authApi from "../apis/auth";
import accountApi from "../apis/account";
import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";


const AppContext = createContext<{
     isAuth: boolean;
     account: AccountType | null;
     role: RoleType | null;
     setAccount: (account: AccountType) => void;
     setRole: (role: RoleType) => void;
}>({
     isAuth: false,
     account: null,
     role: null,
     setAccount: () => { },
     setRole: () => { },
});

export const useAppContext = () => {
     return useContext(AppContext);
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
     const [account, setUserState] = useState<AccountType | null>(() => {
          return null
     })
     const [role, setRoleState] = useState<RoleType | null>(() => {
          return null
     })

     useEffect(() => {
          const accessToken = getAccessTokenFromLocalStorage();
          if (accessToken) {
               const fetchAccount = async () => await accountApi.sme(accessToken);

               fetchAccount().then(({ payload }) => {
                    const _account = (payload?.data as AccountType);
                    const { role } = decodeToken(accessToken)
                    setUserState(_account);
                    setRoleState(role);
               }).catch(e => {
                    handleErrorApi({ error: "Lỗi server!" })
               });
          }
     }, []);

     return (
          <AppContext value={{ isAuth: !!account, account, role, setAccount: setUserState, setRole: setRoleState }}>
               {children}
          </AppContext>
     );
}