"use client";

import React, { useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
import { useGetAccountsByRole } from '@/queries/useAccount';
import { BaseFilter, BaseFilterSchema } from '@/schemas/filter.schemas';

export function AccountManagerTable({ role = "COURT_MANAGER" }: { role: string }) {
  const [filter, setFilter] = useState<BaseFilter>(BaseFilterSchema.parse({ pageSize: 50 }));
  const { data, isLoading } = useGetAccountsByRole(role, filter);

  const handlePaging = (page: number) => {
    if (page < 0 || page >= data?.payload?.data?.totalPages) return;

    setFilter(() => ({
      ...filter,
      page
    }));
  }

  return (
    <div className='w-full bg-white p-4 mt-6 rounded-lg border'>
      <Table className="w-full">
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow className=' p-2  shadow font-bold '>
            <TableHead className="text-red-700 w-[100px]">ID</TableHead>
            <TableHead className='text-red-700 '>Username</TableHead>
            <TableHead className="text-red-700 ">Email</TableHead>
            <TableHead className='text-red-700 '>Tên</TableHead>
            {
              role === 'COURT_MANAGER '
                ?
                <TableHead className="text-red-700 text-right">ID Sân</TableHead>
                : null
            }
            <TableHead className="text-red-700 text-right">#</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {
            !isLoading ?
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              data?.payload?.data?.content.map((c: any, i: number) => {
                return <TableRow key={i}>
                  <TableCell className="w-[100px]">{c?.id}</TableCell>
                  <TableCell className=''>{c?.username}</TableCell>
                  <TableCell className="">{c?.email}</TableCell>
                  <TableCell className=''>{c?.name}</TableCell>
                  {
                    role === 'COURT_MANAGER '
                      ?
                      <TableCell className="text-right">{`####`}</TableCell>
                      : null
                  }
                  <TableCell className='text-right flex justify-end gap-3'>
                    <Button
                    // onClick={() => {
                    // router.push("/admin/court/" + c?.id)
                    // }}
                    // variant={"outline"} className='bg-emerald-400 text-white hover:bg-emerald-300 hover:text-white hover:cursor-pointer'
                    >
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
                          {/* <AlertDialogAction onClick={() => handleDelete(c?.id)}
                            className='w-[100px] bg-rose-500 text-white hover:bg-rose-300 hover:text-white hover:cursor-pointer'>
                            Xóa dữ liệu
                          </AlertDialogAction> */}
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

export default AccountManagerTable