import { useMutation } from "@tanstack/react-query"
import authApi from "../apis/auth"
import { queryClient } from "@/components/QueryProvider"

export const useLoginMutation = () => {
     return useMutation({
          mutationFn: authApi.clogin
     })
}

export const useRegisterMutation = () => {
     return useMutation({
          mutationFn: authApi.register,
          onSuccess: () => {
               queryClient.invalidateQueries({
                    queryKey: ['account-me']
               })
          }

     })
}

// export const useLogoutMutation = () => {
//      return useMutation({
//           mutationFn: authApi.logout
//      })
// }