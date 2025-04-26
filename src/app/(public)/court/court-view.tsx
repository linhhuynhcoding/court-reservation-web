"use client";

import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import CourtCart from "@/components/court-cart";
import { useGetAllCourts } from "@/queries/useCourt";
import { use, useEffect, useState } from "react";
import { CourtFilter, CourtFilterSchema } from '@/schemas/filter.schemas';
import { Skeleton } from "@/components/ui/skeleton";
import {
     Pagination, PaginationContent,
     PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious
} from "@/components/ui/pagination";
import { min } from "date-fns";
import { cn, range } from "@/lib/utils";
import { PaginationFirst, PaginationLast } from "@/components/paginaiton";
import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
} from "@/components/ui/select"
import Link from "next/link";

import { FaSort } from "react-icons/fa";


export function CourtView({ location = null, name = null, date = null }: { location?: string | null, name?: string | null, date?: Date | null }) {
     const [filter, setFilter] = useState<CourtFilter>(CourtFilterSchema.parse({}));
     const { data, isLoading } = useGetAllCourts(filter);

     const handlePaging = (page: number) => {
          if (page < 0 || page >= data?.payload?.data?.totalPages) return;

          setFilter(() => ({
               ...filter,
               page
          }));
     }

     useEffect(() => {
          setFilter({
               ...filter,
               location,
               search: name,
               dateTime: date?.toISOString().split('.')[0]
          })
     }, [location, name, date])

     console.log(filter)

     return (
          <>
               <div className=" p-4 ">
                    <h1 className="text-xl font-semibold">SÂN PICKLEBALL</h1>

               </div>
               <div className="gap-4 p-4 justify-around">
                    <div className="flex justify-end border p-2 rounded-lg">
                         <div className="self-end">
                              <Select onValueChange={(value) => {
                                   setFilter({
                                        ...filter,
                                        sort: `[[PRICE,${value}]]`
                                   })
                              }}>
                                   <SelectTrigger className="w-full">
                                        <FaSort  />
                                        <SelectValue placeholder="Sắp xếp" />
                                   </SelectTrigger>
                                   <SelectContent>
                                        <SelectItem value="ASC">Giá từ thấp đến cao</SelectItem>
                                        <SelectItem value="DESC">Giá từ cao đến thấp</SelectItem>
                                   </SelectContent>
                              </Select>
                         </div>
                    </div>

               </div>
               <div className="grid md:grid-cols-3 grid-cols-1 gap-4 p-4 items-stretch justify-around">
                    {
                         isLoading
                              ?
                              <>
                                   <div className="flex flex-col space-y-3">
                                        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                                        <div className="space-y-2">
                                             <Skeleton className="h-4 w-[250px]" />
                                             <Skeleton className="h-4 w-[200px]" />
                                        </div>
                                   </div>
                                   <div className="flex flex-col space-y-3">
                                        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                                        <div className="space-y-2">
                                             <Skeleton className="h-4 w-[250px]" />
                                             <Skeleton className="h-4 w-[200px]" />
                                        </div>
                                   </div>
                                   <div className="flex flex-col space-y-3">
                                        <Skeleton className="h-[125px] w-[250px] rounded-xl" />
                                        <div className="space-y-2">
                                             <Skeleton className="h-4 w-[250px]" />
                                             <Skeleton className="h-4 w-[200px]" />
                                        </div>
                                   </div>

                              </>
                              :
                              <>
                                   {
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        data?.payload?.data?.content?.map((court: any, index: number) => {
                                             return (
                                                  <Link href={`/court/${court.id}`} key={index}>
                                                       <CourtCart orga={court}>

                                                       </CourtCart>

                                                  </Link>
                                             );
                                        })
                                   }
                              </>


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
                                             <PaginationLink className={filter.page === p ? 'border' : ''} onClick={() => handlePaging(p)} >{p + 1}</PaginationLink>
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
          </>
     );
}