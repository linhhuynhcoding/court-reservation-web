import { BaseFilter } from "@/schemas/filter.schemas";
import { http } from "../lib/http";
import { AccountResType } from "../schemas/account.schema";
import { toQueryString } from "@/lib/utils";

const accountApi = {

     /**
      * @type Next Client to Server
      * @description Lấy thông tin người dùng từ server (thêm token trung gian)
      * @returns AccountResType Thông tin người dùng
      */
     me: () => http.get<AccountResType>('/auth/me', {
          headers:  { "Content-Type": "application/json" },
     }),

     /**
      * @type Next Server to Server
      * @description Lấy thông tin người dùng (gửi kèm token)
      * @param accessToken Token
      * @returns AccountResType Thông tin người dùng
      */
     sme: (accessToken: string) => http.get<AccountResType>('/auth/me', {
          headers: {
               Authorization: `Bearer ${accessToken}`,
          }
     }),

     /**
      * @type Next Server to Server
      * @description Lấy thông tin tài khoản (theo role)
      * @param role (query) Role (ADMIN | COURT_MANAGER | PLAYER | COACH)
      * @param filter (query) Bộ lọc
      * @returns AccountResType Thông tin người dùng
      */
     getAccountsByRole: (role: string, filter: BaseFilter) => http.get<unknown>(`/accounts/role${toQueryString(filter)}&role=${role}`, {}),

     
}

export default accountApi;