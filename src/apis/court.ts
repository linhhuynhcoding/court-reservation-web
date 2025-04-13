import { http } from "@/lib/http";
import { toQueryString } from "@/lib/utils";
import { CreateCourtPayload } from "@/schemas/court.schema";
import { CourtFilter } from "@/schemas/filter.schemas";

const COURT_ENDPOINT = '/courts';

const courtApi = {

     /**
      * Lấy thông tin chi tiết của sân
      * Next Server to Server
      * @param (path) id ID của sân
      * @returns 
      */
     getCourt: (id?: string) => http.get<unknown>(`${COURT_ENDPOINT}/${id}`, {}),

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

     createCourt: (payload: CreateCourtPayload) => http.post<unknown>(`${COURT_ENDPOINT}`, {
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
     }),

     /**
      * Xóa sân
      * Next Server to Server
      * @param (body) CreateCourtPayload Thông tin sân
      * @returns 
      */
     deleteCourt: (id: number) => http.delete<unknown>(`${COURT_ENDPOINT}/${id}`, {
          headers: { "Content-Type": "application/json" },
     }),
}

export default courtApi;