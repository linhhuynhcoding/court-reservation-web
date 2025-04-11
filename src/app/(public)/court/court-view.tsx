"use client";

import CourtCart from "@/components/court-cart";
import { useGetAllCourts } from "@/queries/useCourt";
import { useState } from "react";
import { CourtFilter, CourtFilterSchema } from '@/schemas/filter.schemas';
import { Skeleton } from "@/components/ui/skeleton";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

export function CourtView() {
     const [filter, setFilter] = useState<CourtFilter>(CourtFilterSchema.parse({}));
     const { data, isLoading } = useGetAllCourts(filter);

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
                         <PaginationItem>
                              <PaginationPrevious href="#" />
                         </PaginationItem>
                         <PaginationItem>
                              <PaginationLink href="#">1</PaginationLink>
                         </PaginationItem>
                         <PaginationItem>
                              <PaginationEllipsis />
                         </PaginationItem>
                         <PaginationItem>
                              <PaginationNext href="#" />
                         </PaginationItem>
                    </PaginationContent>
               </Pagination>
          </>
     );
}