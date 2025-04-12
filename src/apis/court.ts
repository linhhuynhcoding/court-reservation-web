import { http } from "@/lib/http";
import { toQueryString } from "@/lib/utils";
import { CreateCourtPayload } from "@/schemas/court.schema";
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
     
     /**
      * Tạo sân
      * Next Server to Server
      * @param (body) CreateCourtPayload Thông tin sân
      * @returns 
      */
     createCourts: (payload: CreateCourtPayload) => http.post<unknown>(`${COURT_ENDPOINT}}`, {
          body: JSON.stringify(payload)
     }),
}

export default courtApi;