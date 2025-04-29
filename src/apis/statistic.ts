import { http } from "@/lib/http";

const STATISTIC_ENDPOINT = '/statistic';

export const statisticApi = {

     getSystemStatistic: (accessToken: string) => http.get<unknown>(`${STATISTIC_ENDPOINT}/system`, {
               headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`,
               },
          }),

} as const;
