"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { decodeToken, getAccessTokenFromLocalStorage } from "../lib/utils";
import { RoleType } from "../constants/types";
import { AccountResType, AccountType } from "../schemas/account.schema";
import authApi from "../apis/auth";
import accountApi from "../apis/account";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
     defaultOptions: {
       queries: {
         refetchOnWindowFocus: false,
         refetchOnMount: false,
       },
     },
   });

const AppContext = createContext<{
     isAuth: boolean;
     account: AccountType | null;
     setAccount: (account: AccountType) => void;
}>({
     isAuth: false,
     account: null,
     setAccount: () => { },
});

export const useAppContext = () => {
     return useContext(AppContext);
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
     const [account, setUserState] = useState<AccountType | null>(() => {
          return null
     })

     useEffect(() => {
          const accessToken = getAccessTokenFromLocalStorage();
          if (accessToken) {
               try {
                    const fetchAccount = async () => await accountApi.sme(accessToken);
                    
                    fetchAccount().then(({ payload }) => {
                         const _account = (payload?.data as AccountType);
                         setUserState(_account);
                    });
               }
               catch (e) {
                    console.log(e);
               }
          }
     }, []);

     return (
          <AppContext value={{ isAuth: !!account, account, setAccount: setUserState }}>

               {children}
          </AppContext>
     );
}