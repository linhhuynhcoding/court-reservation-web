import envConfig from "../config";
import { JwtTokenResType, LoginResType } from "../schemas/auth.schema";
import { ErrorResType, ErrorValidationResType, ValidationErrorResType } from "../schemas/global.schemas";
import { removeTokensFromLocalStorage, setAccessTokenToLocalStorage, setRefreshTokenToLocalStorage } from "./utils";

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
type CustomOptions = RequestInit & {
     baseUrl?: string;
}

const ENTITY_ERROR_STATUS = 422;
const UNAUTHORIZED_STATUS = 401;

const isClient = typeof window !== 'undefined';

export class HttpError extends Error {
     status: number;
     payload: {
          message: string;
          [key: string]: unknown;
     };

     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     constructor({ message, status, payload }: { message: string; status: number; payload: any }) {
          super("HttpError: " + message);
          this.status = status;
          this.payload = payload;
     }
}

export class GlobarError extends HttpError {
     payload: ErrorResType;

     constructor({ message, status, payload }: { message: string; status: number; payload: ErrorResType }) {
          super({ message, status, payload });
          this.payload = payload;
     }
}

export class ValidationError extends HttpError {
     payload: ErrorValidationResType;

     constructor({ message, status, payload }: { message: string; status: number; payload: ErrorValidationResType }) {
          super({ message, status, payload });
          this.payload = payload;
     }
}


const request = async <Response>(method: HttpMethod, url: string, options?: CustomOptions | undefined) => {
     console.log("🚀 ~ options:", options)

     const body = options?.body;
     const baseHeaders = {
          'Accept': 'application/json',
          // 'Content-Type': 'application/json',
     }

     const baseUrl = options?.baseUrl ?? envConfig.NEXT_PUBLIC_SERVER_URL;

     const fullUrl = url.startsWith('/') ? `${baseUrl}${url}` : `${baseUrl}/${url}`;

     console.log(`[HTTP] ${method} ${fullUrl}`);

     const res = await fetch(fullUrl, {
          ...options,
          headers: {
               ...baseHeaders,
               ...options?.headers,
          },
          body,
          method,
     });

     const resBody = res instanceof Response ? await res.json() : res;

     console.log("🚀 ~ file: http.ts:50 ~ request ~ resBody:", resBody)
     if (!res.ok) {
          if (res.status === ENTITY_ERROR_STATUS) {
               const error = resBody as ErrorValidationResType;
               throw new HttpError({
                    message: error.message,
                    status: res.status,
                    payload: error,
               });
          }
          else {
               const error = resBody as ErrorResType;
               throw new HttpError({
                    message: error.message,
                    status: res.status,
                    payload: error,
               });
          }
     }

     const data =  {
          status: res.status,
          payload: (baseUrl === '') ? resBody.payload : resBody,
     }

     if (isClient) {
          if (["/api/auth/login", "/api/guest/auth/login"].includes(url)) {
               const { accessToken, refreshToken } = (data.payload as LoginResType).data;
               setAccessTokenToLocalStorage(accessToken);
               setRefreshTokenToLocalStorage(refreshToken);
          } else if (["/api/auth/logout"].includes(url)) {
               removeTokensFromLocalStorage();
          }
     }

     return data;
}

export const http = {
     get: <Response>(url: string, options?: Omit<CustomOptions, 'body'>) => request<Response>('GET', url, options),
     post: <Response>(url: string, options?: CustomOptions) => request<Response>('POST', url, options),
     put: <Response>(url: string, options?: CustomOptions) => request<Response>('PUT', url, options),
     patch: <Response>(url: string, options?: CustomOptions) => request<Response>('PATCH', url, options),
     delete: <Response>(url: string, options?: CustomOptions) => request<Response>('DELETE', url, options),
}
