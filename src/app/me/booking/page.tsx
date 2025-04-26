"use client";

import { useAppContext } from "@/components/app-provider"
import { getAccessTokenFromLocalStorage, range } from "@/lib/utils";
import { useGetAccountBookings } from "@/queries/useBooking"
import { BookingFilter, BookingFilterSchema } from "@/schemas/filter.schemas";
import { useMemo, useState } from "react";
import {
     Pagination, PaginationContent,
     PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious
} from "@/components/ui/pagination";
import { PaginationFirst, PaginationLast } from "@/components/paginaiton";
import { BookingItem } from "./booking-item";
import { BookingResponse } from "@/schemas/booking.schema";


export default function Page() {

     // === CONTEXT ===
     const { account } = useAppContext();

     // === STATES ===
     const [filter, setFilter] = useState<BookingFilter>(BookingFilterSchema.parse({ pageSize: 10, sort: "[[DATE,DESC]]", duration: 360 }));

     // === VARIABLES ===
     const token = getAccessTokenFromLocalStorage();

     // === QUERIES ===
     const { data, isLoading } = useGetAccountBookings({ id: account?.id ?? 0, filter, token: token ?? "" });

     // === MEMO ===
     const bookings: BookingResponse[] = useMemo(() => data?.payload?.data?.content ?? [], [data]);

     // === HANDLER ===
     const handlePaging = (page: number) => {
          if (page < 0 || page >= data?.payload?.data?.totalPages) return;

          setFilter(() => ({
               ...filter,
               page
          }));
     }

     return (
          <>
               <div className="p-4">
                    <h1 className="text-xl font-semibold">
                         Lịch sử đặt sân
                    </h1>
               </div>
               <div className="p-2">
                    <div className="flex flex-col w-full p-2 gap-2">
                         {
                              bookings.length ?
                                   bookings?.map((booking, index: number) => {
                                        return <BookingItem key={index} booking={booking}></BookingItem>
                                   })
                                   : null
                         }
                    </div>
                    <Pagination className="mt-10">
                         <PaginationContent>
                              <PaginationItem className="hover:cursor-pointer">
                                   <PaginationFirst onClick={() => handlePaging(0)} />
                              </PaginationItem>
                              <PaginationItem className="hover:cursor-pointer" >
                                   <PaginationPrevious onClick={() => handlePaging(filter.page - 1)} />
                              </PaginationItem>
                              {
                                   data?.payload?.data
                                        ?
                                        range(Math.max(filter.page - 2, 0), Math.min(filter.page + 2, data?.payload?.data?.totalPages - 1)).map((p, index) => {
                                             return <PaginationItem key={index} className="hover:cursor-pointer">
                                                  <PaginationLink onClick={() => handlePaging(p)} >{p + 1}</PaginationLink>
                                             </PaginationItem>
                                        })
                                        : null
                              }

                              <PaginationItem className="hover:cursor-pointer">
                                   <PaginationNext onClick={() => handlePaging(filter.page + 1)} />
                              </PaginationItem>
                              <PaginationItem className="hover:cursor-pointer">
                                   <PaginationLast onClick={() => handlePaging(data?.payload?.data.totalPages - 1)} />
                              </PaginationItem>
                         </PaginationContent>
                    </Pagination>
               </div>
          </>
     )
}