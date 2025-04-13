"use client"
import React from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useDeleteCourtMutation, useGetAllCourts } from "@/queries/useCourt";
import { useState } from "react";
import { CourtFilter, CourtFilterSchema } from '@/schemas/filter.schemas';
import {
     Pagination, PaginationContent,
     PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious
} from "@/components/ui/pagination";
import { PaginationFirst, PaginationLast } from "@/components/paginaiton";
import { range } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
     AlertDialog,
     AlertDialogAction,
     AlertDialogCancel,
     AlertDialogContent,
     AlertDialogDescription,
     AlertDialogFooter,
     AlertDialogHeader,
     AlertDialogTitle,
     AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
     Dialog,
     DialogContent,
     DialogDescription,
     DialogHeader,
     DialogTitle,
     DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

function TableCourtView() {
     const router = useRouter();
     const [filter, setFilter] = useState<CourtFilter>(CourtFilterSchema.parse({ pageSize: 50 }));
     const { data, isLoading } = useGetAllCourts(filter);
     const useDeleteCourt = useDeleteCourtMutation();

     const handlePaging = (page: number) => {
          if (page < 0 || page >= data?.payload?.data?.totalPages) return;

          setFilter(() => ({
               ...filter,
               page
          }));
     }

     const handleDelete = async (id: number) => {
          try {
               await useDeleteCourt.mutateAsync(id);

               toast.success("Thành công!");

          } catch (error) {
               toast.error("Xóa sân thất bại!")
          }
     }

     return (
          <div className='w-full bg-white p-4 mt-6 rounded-lg border'>
               <Table className="w-full">
                    {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
                    <TableHeader>
                         <TableRow className=' p-2  shadow font-bold '>
                              <TableHead className="text-red-700 w-[100px]">ID</TableHead>
                              <TableHead className='text-red-700 '>Name</TableHead>
                              <TableHead className='text-red-700 '>Phone</TableHead>
                              <TableHead className="text-red-700 text-right">NoC</TableHead>
                              <TableHead className="text-red-700 text-right">Price</TableHead>
                              <TableHead className="text-red-700 text-right">City</TableHead>
                              <TableHead className="text-red-700 ">Status</TableHead>
                              <TableHead className="text-red-700 text-right">#</TableHead>
                         </TableRow>
                    </TableHeader>
                    <TableBody>
                         <TableRow >
                              <TableCell>0</TableCell>
                              <TableCell>aaaaaa</TableCell>
                              <TableCell>aaaaaa</TableCell>
                              <TableCell className='text-right'>bbbb</TableCell>
                              <TableCell className='text-right'>bbbb</TableCell>
                              <TableCell className='text-right'>bbbbbbbb</TableCell>
                              <TableCell className=''>bbbbbbbbb</TableCell>
                              <TableCell className='text-red-700 text-right flex justify-end gap-3'>
                                   <Button variant={"outline"} className='bg-emerald-400 text-white hover:bg-emerald-300 hover:text-white hover:cursor-pointer'>
                                        Chỉnh sửa
                                   </Button>
                                   <Button variant={"outline"} className='w-[100px] bg-rose-500 text-white hover:bg-rose-300 hover:text-white hover:cursor-pointer'>
                                        Xóa
                                   </Button>
                              </TableCell>

                         </TableRow>
                         {
                              !isLoading ?
                                   // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                   data?.payload?.data?.content.map((c: any, i: number) => {
                                        return <TableRow key={i}>
                                             <TableCell>{c?.id}</TableCell>
                                             <TableCell>{c?.name}</TableCell>
                                             <TableCell>{c?.phone}</TableCell>
                                             <TableCell className='text-right'>{c?.numberOfCourts}</TableCell>
                                             <TableCell className='text-right'>{Number(c?.price).toLocaleString("vi")}</TableCell>
                                             <TableCell className='text-right'>{c?.address?.city}</TableCell>
                                             <TableCell className=''>{c?.status}</TableCell>
                                             <TableCell className='text-red-700 text-right flex justify-end gap-3'>
                                                  <Button
                                                       onClick={() => {
                                                            router.push("/admin/court/" + c?.id)
                                                       }}
                                                       variant={"outline"} className='bg-emerald-400 text-white hover:bg-emerald-300 hover:text-white hover:cursor-pointer'>
                                                       Chi tiết
                                                  </Button>
                                                  <AlertDialog >
                                                       <AlertDialogTrigger asChild>
                                                            <Button
                                                                 variant={"outline"} className='w-[100px] bg-rose-500 text-white hover:bg-rose-300 hover:text-white hover:cursor-pointer'>
                                                                 Xóa
                                                            </Button>
                                                       </AlertDialogTrigger>
                                                       <AlertDialogContent >
                                                            <AlertDialogHeader>
                                                                 <AlertDialogTitle>Bạn có chắc chắn?</AlertDialogTitle>
                                                                 <AlertDialogDescription>
                                                                      Hành động này không thể hoàn tác. Dữ liệu trên máy chủ sẽ thay đổi vĩnh viễn.
                                                                 </AlertDialogDescription>
                                                            </AlertDialogHeader>
                                                            <AlertDialogFooter>
                                                                 <AlertDialogCancel>Hủy bỏ</AlertDialogCancel>
                                                                 <AlertDialogAction onClick={() => handleDelete(c?.id)}
                                                                      className='w-[100px] bg-rose-500 text-white hover:bg-rose-300 hover:text-white hover:cursor-pointer'>
                                                                      Xóa dữ liệu
                                                                 </AlertDialogAction>
                                                            </AlertDialogFooter>
                                                       </AlertDialogContent>
                                                  </AlertDialog>

                                             </TableCell>

                                        </TableRow>
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

export default TableCourtView