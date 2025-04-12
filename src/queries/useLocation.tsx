import { useQuery } from "@tanstack/react-query"
import locationApi from "../apis/location"

export const useCity = () => {
     return useQuery({
          queryKey: ['city'],
          queryFn: locationApi.city,
          staleTime: 5 * 60 * 1000,
          gcTime: 5* 60 * 1000,          
     })
}

export const useDistrict = (cityId: number) => {
     return useQuery({
          queryKey: ['district', cityId],
          queryFn: () => locationApi.district(cityId),
          staleTime: 5 * 60 * 1000,
          gcTime: 5* 60 * 1000,          
     })
}

export const useWard = (districtId: number) => {
     return useQuery({
          queryKey: ['ward', districtId],
          queryFn: () => locationApi.ward(districtId),
          staleTime: 5 * 60 * 1000,
          gcTime: 5* 60 * 1000,          
     })
}