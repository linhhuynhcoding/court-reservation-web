"use client";

import { PaginationFirst, PaginationLast } from '@/components/paginaiton';
import ProductCard from '@/components/product-card'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { getAccessTokenFromLocalStorage, handleErrorApi, range } from '@/lib/utils';
import { useGetAllProducts } from '@/queries/useProduct'
import { CourtFilterSchema, ProductFilter, ProductFilterSchema } from '@/schemas/filter.schemas';
import { ProductResponse } from '@/schemas/product.schema';
import React, { useEffect, useState } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaSort } from "react-icons/fa";
import { useCreateOrUpdateCartItemMutation } from '@/queries/useCart';
import { useAppContext } from '@/components/app-provider';
import { useRouter } from 'next/navigation';
import { UpdateItemPayload } from '@/schemas/cart.schema';
import { toast } from 'sonner';

export default function ProductView({ _range = [0, 100] }: { _range: number[] }) {
  const router = useRouter();
  const [filter, setFilter] = useState<ProductFilter>(ProductFilterSchema.parse({}));
  const { data, isLoading } = useGetAllProducts(filter);
  const { account } = useAppContext();
  const useAddCart = useCreateOrUpdateCartItemMutation();

  const handlePaging = (page: number) => {
    if (page < 0 || page >= data?.payload?.data?.totalPages) return;

    setFilter(() => ({
      ...filter,
      page
    }));
  }

  const handleAddToCart = async (productId: number) => {
    try {
      const token = getAccessTokenFromLocalStorage();

      if (!account || !token) {
        router.push("/login");
      }

      const payload: UpdateItemPayload = {
        productId,
        quantity: 1,
        selected: false,
      }

      const response = await useAddCart.mutateAsync({ id: account!.cartId!, payload, token: token! });
      
      toast.success(response.payload.message);
      
    } catch (error) {
      handleErrorApi({ error });
    }

  }

  useEffect(() => {
    setFilter(() => ({
      ...filter,
      priceMin: _range[0] * 5000000 / 100,
      priceMax: _range[1] * 5000000 / 100
    }))
  }, [_range])

  console.log(filter)

  return (
    <div className='flex flex-col'>
      <div className="gap-4 p-4 justify-around">
        <div className="flex justify-end p-2 rounded-lg">
          <div className="self-end">
            <Select onValueChange={(value) => {
              setFilter({
                ...filter,
                sort: `[[PRICE,${value}]]`
              })
            }}>
              <SelectTrigger className="w-fit border-none shadow-none text-blue-900 font-bold">
                <FaSort className='text-blue-900' />
                <SelectValue placeholder="Sắp xếp theo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ASC">Giá từ thấp đến cao</SelectItem>
                <SelectItem value="DESC">Giá từ cao đến thấp</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

      </div>
      <div className='grid 2xl:grid-cols-4 lg:grid-cols-3 gap-8'>
        {
          data?.payload?.data?.content?.map((p: ProductResponse, i: number) => {
            return <ProductCard onAddToCart={handleAddToCart} key={i} product={p} ></ProductCard>
          })
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

    </div>
  )
}
