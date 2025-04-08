import { useQuery } from "@tanstack/react-query"
import accountApi from "../apis/account"

export const useMe = () => {
     return useQuery({
          queryKey: ['account-me'],
          queryFn: accountApi.me
     })
}