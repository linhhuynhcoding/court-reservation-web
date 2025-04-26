"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { decodeToken, getAccessTokenFromLocalStorage, handleErrorApi } from "../lib/utils";
import { RoleType } from "../constants/types";
import { AccountResType, AccountType } from "../schemas/account.schema";
import authApi from "../apis/auth";
import accountApi from "../apis/account";
import { QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { useMe } from "@/queries/useAccount";
import { useRouter } from "next/navigation";


const AppContext = createContext<{
     isAuth: boolean;
     account: AccountType | null;
     role: RoleType | null;
     setAccount: (account: AccountType | null) => void;
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
     const router = useRouter()
     const [account, setUserState] = useState<AccountType | null>(() => {
          return null
     })
     const [role, setRoleState] = useState<RoleType | null>(() => {
          return null
     })

     const accessToken = getAccessTokenFromLocalStorage();
     const { data } = useMe(accessToken ?? "");
     const _account = useMemo(() => data?.payload?.data ?? null, [data]);

     useEffect(() => {
          if (accessToken && _account) {
               const { role } = decodeToken(accessToken)
               setUserState(_account);
               setRoleState(role);
          }
          else {
               // router.push("/login");
          }
     }, [_account]);

     return (
          <AppContext value={{ isAuth: !!account, account, role, setAccount: setUserState, setRole: setRoleState }}>
               {children}
          </AppContext>
     );
}