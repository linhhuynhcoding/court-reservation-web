import { http } from "@/lib/http";

const IMAGE_ENDPOINT = '/uploads';

const imgApi = {
     /**
      * Lấy danh sách sân, kèm pagination
      * Next Server to Server
      * @param (query) CourtFilter Bộ lọc của sân (pagiantion, sort,...)
      * @returns 
      */
     uploadImages: (files: FormData) => http.post<unknown>(`${IMAGE_ENDPOINT}`, {
          // headers:  { "Content-Type": "multipart/form-data" },
          body: files
     }),
}

export default imgApi;