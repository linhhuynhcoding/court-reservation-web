"use client";

import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import CourtCart from "@/components/court-cart";
import { useGetAllCourts } from "@/queries/useCourt";
import { useState } from "react";
import { CourtFilter, CourtFilterSchema } from '@/schemas/filter.schemas';
import { Skeleton } from "@/components/ui/skeleton";
import {
     Pagination, PaginationContent,
     PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious
} from "@/components/ui/pagination";
import { min } from "date-fns";
import { cn } from "@/lib/utils";

const range = (start: number, end: number) =>
     Array.from({ length: end - start }, (_, i) => start + i)

function PaginationFirst({
     className,
     ...props
}: React.ComponentProps<typeof PaginationLink>) {
     return (
          <PaginationLink
               aria-label="Go to previous page"
               size="default"
               className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
               {...props}
          >
               <FiChevronsLeft />
          </PaginationLink>
     )
}

function PaginationLast({
     className,
     ...props
}: React.ComponentProps<typeof PaginationLink>) {
     return (
          <PaginationLink
               aria-label="Go to previous page"
               size="default"
               className={cn("gap-1 px-2.5 sm:pl-2.5", className)}
               {...props}
          >
               <FiChevronsRight />
          </PaginationLink>
     )
}

export function CourtView() {
     const [filter, setFilter] = useState<CourtFilter>(CourtFilterSchema.parse({}));
     const { data, isLoading } = useGetAllCourts(filter);

     const handlePaging = (page: number) => {
          if (page < 0 || page >= data?.payload?.data?.totalPages) return;

          setFilter(() => ({
               ...filter,
               page
          }));
     }



     console.log(filter)

     return (
          <>
               <div className="grid md:grid-cols-3 grid-cols-1 gap-4 p-4 justify-around">
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
                                                  <CourtCart key={index} orga={court}>

                                                  </CourtCart>
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
          </>
     );
}