import { http } from "../lib/http";
import { AccountResType } from "../schemas/account.schema";

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
}

export default accountApi;