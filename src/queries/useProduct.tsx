import { productApi } from "@/apis/product";
import { ProductFilter } from "@/schemas/filter.schemas";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProducts = (filter: ProductFilter) => {
     return useQuery({
          queryKey: ['get-products', filter],
          queryFn: () => productApi.getCourts(filter),
          staleTime: 60 * 3 * 1000
     })
};