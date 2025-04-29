"use client";

import { BookingItem } from "@/app/me/booking/booking-item"
import { useAppContext } from "@/components/app-provider";
import { getAccessTokenFromLocalStorage, handleErrorApi, range } from "@/lib/utils";
import { useGetCourtBookings, useUpdateStatusBookingMutation } from "@/queries/useBooking";
import { BookingResponse } from "@/schemas/booking.schema";
import { BookingFilter, BookingFilterSchema } from "@/schemas/filter.schemas";
import { ReactNode, useMemo, useState } from "react";
import {
     Pagination, PaginationContent,
     PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious
} from "@/components/ui/pagination";
import { PaginationFirst, PaginationLast } from "@/components/paginaiton";
import { useManagerContext } from "@/components/manager-provider";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import BadgeCustom from "@/components/ui/badge-custom";
import { toGMT7 } from "@/lib/date";

import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
} from "@/components/ui/select"
import { toast } from "sonner";

const durations: { [index: number]: string } = {
     1: "Hôm nay",
     7: "Tuần này",
     30: "30 ngày gần nhất",
     180: "6 tháng gần nhất",
     [-7]: "Tuần tới",
}
const BOOKING_BAGDE_MAPPING: { [index: string]: string } = {
     "PENDING": "pending",
     "BOOKED": "success",
     "FAILED": "failed",
     "PAYING": "paying",
     "WAITING": "waiting",

} as const;

interface BookingListProps {
     children?: ReactNode;
}

export const BookingList: React.FC<BookingListProps> = () => {

     // === CONTEXT ===
     const { account } = useAppContext();
     const { org } = useManagerContext();

     // === STATES ===
     const [filter, setFilter] = useState<BookingFilter>(BookingFilterSchema.parse({ pageSize: 10, sort: "[[DATE,DESC]]", duration: 7 }));

     // === VARIABLES ===
     const token = getAccessTokenFromLocalStorage();

     // === QUERIES ===
     const { data, isLoading } = useGetCourtBookings(org?.id ?? 0, filter, token ?? "");

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
          <div>
               <div className="flex justify-end border p-2 rounded-lg">
                    <div className="self-end">
                         <Select defaultValue="1" onValueChange={(value) => {
                              setFilter({
                                   ...filter,
                                   duration: Number(value)
                              })
                         }}>
                              <SelectTrigger className="w-full">
                                   <SelectValue placeholder="Chọn thời gian" />
                              </SelectTrigger>
                              <SelectContent>
                                   <SelectItem value="-7">{durations[-7]}</SelectItem>
                                   <SelectItem value="1">{durations[1]}</SelectItem>
                                   <SelectItem value="7">{durations[7]}</SelectItem>
                                   <SelectItem value="30">{durations[30]}</SelectItem>
                                   <SelectItem value="180">{durations[180]}</SelectItem>
                              </SelectContent>
                         </Select>
                    </div>
               </div>
               {/* <div>
                    {
                         bookings.length ?
                              bookings.map((booking, index: number) => {
                                   return <BookingItem key={index} booking={booking}></BookingItem>
                              })
                              : null
                    }
               </div> */}
               <Table>
                    <TableHeader className="border-none">
                         <TableRow className='p-2 border-none'>
                              <TableHead className="text-gray-700 w-[100px]">#Booking ID</TableHead>
                              <TableHead className='text-gray-700 '>Người chơi</TableHead>
                              <TableHead className='text-gray-700 '>Tổ Chức</TableHead>
                              <TableHead className='text-gray-700 '>Sân</TableHead>
                              <TableHead className="text-gray-700 ">Thời gian</TableHead>
                              <TableHead className="text-gray-700 ">Số giờ thuê</TableHead>
                              <TableHead className="text-gray-700 ">Order Nước</TableHead>
                              <TableHead className="text-gray-700 ">Tình trạng</TableHead>
                              <TableHead className="text-gray-700 ">Tổng tiền</TableHead>
                              <TableHead className="text-gray-700 ">#</TableHead>
                         </TableRow>
                    </TableHeader>
                    <TableBody>
                         {
                              bookings.length && !isLoading ?
                                   bookings.map((booking, index: number) => {
                                        return <BookingRow key={booking.id} booking={booking} />
                                   })
                                   : null
                         }
                    </TableBody>
               </Table>

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
     )
}

interface BookingRowProps {
     booking: BookingResponse
}

const BookingRow: React.FC<BookingRowProps> = ({ booking }) => {
     console.log("bookingID: ", booking?.id, " booking: ", booking);
     const useUpdateStatus = useUpdateStatusBookingMutation();

     // === MEMO ===
     const timeStart = useMemo(() => {
          return new Date(toGMT7(booking.timeStart)).toLocaleDateString("vi-VN", {
               hour: "2-digit",
               minute: "2-digit",
               hour12: false
          })
     }, [booking]);

     const duration = useMemo(() => {
          const dateStart = new Date(booking.timeStart);
          const dateEnd = new Date(booking.timeEnd);

          return (dateEnd.getHours() + dateEnd.getMinutes() / 60.0) - (dateStart.getHours() + dateStart.getMinutes() / 60.0);
     }, [booking])

     const handleUpdateStatus = async (status: string) => {
          try {
               const token = getAccessTokenFromLocalStorage();
               const response = await useUpdateStatus.mutateAsync({ id: booking.id!, status, token: token! });

               toast.success(response.payload.message);

          } catch (error) {
               handleErrorApi({ error });
          }

     }

     return <TableRow className="font-semibold" >
          <TableCell>{booking?.id}</TableCell>
          <TableCell>{booking?.account?.name}</TableCell>
          <TableCell>{booking?.orgaName}</TableCell>
          <TableCell>{booking?.courtName}</TableCell>
          <TableCell className=''>{timeStart}</TableCell>
          <TableCell className=''>{duration}</TableCell>
          <TableCell className=''>{ }</TableCell>
          <TableCell className=''>
               <div className="self-end">
                    {
                         booking.status ?
                              <Select defaultValue={booking.status} onValueChange={(value) => handleUpdateStatus(value)}>
                                   <SelectTrigger className="w-fit border-none shadow-none">
                                        <SelectValue placeholder="" defaultValue={booking.status}/>
                                   </SelectTrigger>
                                   <SelectContent>
                                        <SelectItem className="border-none" value="BOOKED"><BadgeCustom variant={"success"}>Hoàn tất</BadgeCustom></SelectItem>
                                        <SelectItem className="border-none" value="PAYING"><BadgeCustom variant={"paying"}></BadgeCustom></SelectItem>
                                        <SelectItem className="border-none" value="PENDING"><BadgeCustom variant={"pending"}></BadgeCustom></SelectItem>
                                        <SelectItem className="border-none" value="FAILED"><BadgeCustom variant={"failed"}></BadgeCustom></SelectItem>
                                        <SelectItem className="border-none" value="WAITING"><BadgeCustom variant={"waiting"}></BadgeCustom></SelectItem>
                                   </SelectContent>
                              </Select>
                              : null
                    }
               </div>
          </TableCell>
          <TableCell className='text-yellow-500 font-bold '>
               {booking?.payment?.amount?.toLocaleString("vi-VN") ?? 0} đ
          </TableCell>
          <TableCell className=''>{booking?.payment?.status === 'SUCCESS' ? "Đã thanh toán" : "Chưa thanh toán"}</TableCell>
          <TableCell className='text-red-700 text-right flex justify-end gap-3'>
          </TableCell>

     </TableRow>
}