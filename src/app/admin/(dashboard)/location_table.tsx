import React from 'react'
import {
     Table,
     TableBody,
     TableCaption,
     TableCell,
     TableFooter,
     TableHead,
     TableHeader,
     TableRow,
} from "@/components/ui/table"
import { RevenueBookingLocation } from '@/schemas/statistic.schema';

interface LocationTableProps {
     data: RevenueBookingLocation[];
}

export const LocationTable: React.FC<LocationTableProps> = ({ data }) => {
     const result = data?.sort((a, b) => (b.totalRevenue ?? 0) - (a.totalRevenue ?? 0)) ?? [];

     return (
          <div className='min-h-[300px] overflow-y-auto flex flex-col gap-4 w-full">'>
               <h1 className='text-xl font-bold'>Doanh thu theo khu vực</h1>
               <Table>
                    <TableHeader>
                         <TableRow>
                              <TableHead className="w-[100px]">Vị trí</TableHead>
                              <TableHead>Bookings</TableHead>
                              <TableHead>Tổng doanh thu</TableHead>
                         </TableRow>
                    </TableHeader>
                    <TableBody>
                         {
                              result.map((item, index) => (
                                   <TableRow key={index}>
                                        <TableCell className={`font-medium 
                                        ${index === 0 ? "text-red-400 " : ""}
                                        ${index === 1 ? "text-teal-400 " : ""}
                                        ${index === 2 ? "text-yellow-400 " : ""}
                                        ${index > 2 ? "text-gray-400 " : ""}
                                        `
                                        }>
                                             {item.location}
                                        </TableCell>
                                        <TableCell>{item.bookingTimes}</TableCell>
                                        <TableCell>{item.totalRevenue?.toLocaleString("vi-VN")}đ</TableCell>
                                   </TableRow>
                              ))
                         }

                    </TableBody>
               </Table>
          </div>

     )
}
