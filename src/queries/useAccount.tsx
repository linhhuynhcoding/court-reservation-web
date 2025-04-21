import { useMutation, useQuery } from "@tanstack/react-query"
import accountApi from "../apis/account"
import { BaseFilter } from "@/schemas/filter.schemas"
import { queryClient } from "@/components/QueryProvider"

export const useMe = () => {
     return useQuery({
          queryKey: ['account-me'],
          queryFn: accountApi.me
     })
}

export const useGetAccountsByRole = (role: string, filter: BaseFilter) => {
     return useQuery({
          queryKey: ['get-accounts-by-role', role, filter],
          queryFn: () => accountApi.getAccountsByRole(role, filter)
     })
}

export const useUpadateAccountMutation = () =>{
     return useMutation({
          mutationFn: accountApi.updateAccount,
          onSuccess: () => {
               queryClient.invalidateQueries({queryKey: ['account-me']})
          }
     })
}