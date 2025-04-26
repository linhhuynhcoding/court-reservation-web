import { register } from "module";
import { http } from "../lib/http";
import { AccountResType } from "../schemas/account.schema";
import { LoginBodyType, LoginResType, RegisterBodyType } from "../schemas/auth.schema";
import { ErrorResType } from "../schemas/global.schemas";
import { setAccessTokenToLocalStorage } from "@/lib/utils";

const AUTH_ENDPOINT = '/auth';

const authApi = {

     // Next Client to Next Server
     clogin: (body: LoginBodyType) => http.post<LoginResType>('/api/auth/login', {
          baseUrl: '',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
     }),

     // Next Server to Server
     slogin: (body: LoginBodyType) => http.post<LoginResType>(`${AUTH_ENDPOINT}/login`, {
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
     }),


     /**
      * Next Client to Server
      * @param body (body) RegisterBodyType 
      * @returns 
      */
     register: (body: RegisterBodyType) => http.post<unknown>(`${AUTH_ENDPOINT}/register`, {
          body: JSON.stringify(body),
          headers: { "Content-Type": "application/json" },
     }),

     // Next Client to Next Server
     logout: () => {
          setAccessTokenToLocalStorage("");
          return http.post('/api/auth/logout', {
               baseUrl: "",
               headers: { "Content-Type": "application/json" },
          });
     }

}

export default authApi;