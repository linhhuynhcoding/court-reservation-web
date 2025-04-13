import courtApi from "@/apis/court";
import { CourtFilter } from "@/schemas/filter.schemas";
import { useMutation, useQuery } from "@tanstack/react-query"

export const useGetCourt = (id: string, enabled: boolean) => {
     return useQuery({
          queryKey: ['get-court', id],
          queryFn: () => courtApi.getCourt(id),
          staleTime: 60 * 3 * 1000,
          enabled
     })
};

export const useGetAllCourts = (filter: CourtFilter) => {
     return useQuery({
          queryKey: ['get-courts', filter],
          queryFn: () => courtApi.getCourts(filter),
          staleTime: 60 * 3 * 1000
     })
};

export const useUploadCourtMutation = () => {
     return useMutation({
          mutationFn: courtApi.createCourt
     })
}

export const useDeleteCourtMutation = () => {
     return useMutation({
          mutationFn: courtApi.deleteCourt
     })
}