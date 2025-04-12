import { http } from "@/lib/http";
import { toQueryString } from "@/lib/utils";
import { CourtFilter } from "@/schemas/filter.schemas";

const COURT_ENDPOINT = '/courts';

const courtApi = {
     /**
      * Lấy danh sách sân, kèm pagination
      * Next Server to Server
      * @param (query) CourtFilter Bộ lọc của sân (pagiantion, sort,...)
      * @returns 
      */
     getCourts: (filter: CourtFilter) => http.get<unknown>(`${COURT_ENDPOINT}${toQueryString(filter)}`, {}),
}

export default courtApi;