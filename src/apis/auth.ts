import { http } from "../lib/http";
import { AccountResType } from "../schemas/account.schema";
import { LoginBodyType, LoginResType } from "../schemas/auth.schema";
import { ErrorResType } from "../schemas/global.schemas";

const LOGIN_ENDPOINT = '/auth/login';

const authApi = {
     
     // Next Client to Next Server
     clogin: (body: LoginBodyType) => http.post<LoginResType>('/api/auth/login', {
          baseUrl: '',
          body: JSON.stringify(body),
     }),
     
     // Next Server to Server
     slogin: (body: LoginBodyType) => http.post<LoginResType>(`${LOGIN_ENDPOINT}`, {
          body: JSON.stringify(body),
     }),
}

export default authApi;