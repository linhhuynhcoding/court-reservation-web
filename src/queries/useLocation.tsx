import { useQuery } from "@tanstack/react-query"
import locationApi from "../apis/location"

export const useCity = () => {
     return useQuery({
          queryKey: ['city'],
          queryFn: locationApi.city,
          staleTime: 30 * 24 * 60 * 1000,
          gcTime: 90 * 24 * 60 * 1000,          
     })
}