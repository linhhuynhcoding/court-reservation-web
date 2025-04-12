import courtApi from "@/apis/court";
import { CourtFilter } from "@/schemas/filter.schemas";
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetAllCourts = (filter: CourtFilter) => {
     return useQuery({
          queryKey: ['get-courts', filter],
          queryFn: () => courtApi.getCourts(filter),
          staleTime: 60 * 3 * 1000
     })
};

export const useUploadCourtMutation = () => {
     return useMutation({
          mutationFn: courtApi.createCourts
     })
}