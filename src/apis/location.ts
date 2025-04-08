import { http } from "../lib/http";

const ROOT = "/addresses"

const locationApi = {

     /**
      * @type Next Client to Server
      * @description 
      * @returns 
      */
     city: () => http.get<unknown>(`${ROOT}/cities`, {}),

     /**
      * @type Next Client to Server
      * @description 
      * @returns 
      */
     district: (cityId: number) => http.get<unknown>(`${ROOT}/districts/${cityId}`, {}),

     /**
      * @type Next Client to Server
      * @description 
      * @returns 
      */
     ward: (districtId: number) => http.get<unknown>(`${ROOT}/wards/${districtId}`, {}),
}

export default locationApi;