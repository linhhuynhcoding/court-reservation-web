"use client";

import { PaginationFirst, PaginationLast } from '@/components/paginaiton';
import ProductCart from '@/components/product-cart'
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination'
import { range } from '@/lib/utils';
import { useGetAllProducts } from '@/queries/useProduct'
import { CourtFilterSchema, ProductFilter, ProductFilterSchema } from '@/schemas/filter.schemas';
import { ProductResponse } from '@/schemas/product.schema';
import React, { useEffect, useState } from 'react'

export default function ProductView({_range = [0, 100]}: {_range: number[]}) {
  const [filter, setFilter] = useState<ProductFilter>(ProductFilterSchema.parse({}));
  const { data, isLoading } = useGetAllProducts(filter);

  const handlePaging = (page: number) => {
    if (page < 0 || page >= data?.payload?.data?.totalPages) return;

    setFilter(() => ({
      ...filter,
      page
    }));
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
      <div className='grid 2xl:grid-cols-4 lg:grid-cols-3 gap-8'>
        {
          data?.payload?.data?.content?.map((p: ProductResponse, i: number) => {
            return <ProductCart key={i} product={p} ></ProductCart>
          })
        }
      </div>
      <Pagination className="mt-10">
        <PaginationContent>
          <PaginationItem className="hover:cursor-pointer">
            <PaginationFirst onClick={() => handlePaging(0)} />
          </PaginationItem>
          <PaginationItem className="hover:cursor-pointer" >
            <PaginationPrevious onClick={() => handlePaging(filter.page - 1)}/>
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
