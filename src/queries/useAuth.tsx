import { useMutation } from "@tanstack/react-query"
import authApi from "../apis/auth"

export const useLoginMutation = () => {
     return useMutation({
          mutationFn: authApi.clogin
     })
}

export const useRegisterMutation = () => {
     return useMutation({
          mutationFn: authApi.register
     })
}

// export const useLogoutMutation = () => {
//      return useMutation({
//           mutationFn: authApi.logout
//      })
// }