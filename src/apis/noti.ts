import { http } from "@/lib/http";
import { NotiResponse } from "@/schemas/noti.schema";

const NOTIFICATION_ENDPOINT = "/notifications";

export const apiNoti = {
     getUserNoti: (accessToken: string) => http.get<NotiResponse>(`${NOTIFICATION_ENDPOINT}/user`, {
          headers: {
               "Content-Type": "application/json",
               Authorization: `Bearer ${accessToken}`,
          },
     }),
} as const;