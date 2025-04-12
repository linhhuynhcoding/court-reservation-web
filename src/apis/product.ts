import { http } from "@/lib/http";
import { toQueryString } from "@/lib/utils";
import { ProductFilter } from "@/schemas/filter.schemas";

const COURT_ENDPOINT = '/products';

export const productApi = {
     /**
           * Lấy danh sách sản phầm, kèm pagination
           * Next Server to Server
           * @param (query) 
           * @returns 
           */
     getCourts: (filter: ProductFilter) => http.get<unknown>(`${COURT_ENDPOINT}${toQueryString(filter)}`, {}),
} as const;