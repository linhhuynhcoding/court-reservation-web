import { apiNoti } from "@/apis/noti"
import { useQuery } from "@tanstack/react-query"


export const useGetUserNoti = (token: string) => {
     return useQuery({
          queryKey: ["get-user-noti", token],
          queryFn: () => apiNoti.getUserNoti(token),
          refetchInterval: 1000 * 60
     })
}