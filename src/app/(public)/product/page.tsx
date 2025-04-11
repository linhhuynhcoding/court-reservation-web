import ProductCart from '@/components/product-cart'
import { Pagination, PaginationContent, PaginationItem, PaginationPrevious } from '@/components/ui/pagination'
import React from 'react'

export default function ProductPage() {
  return (
    <div className='flex flex-col'>
      <div className='grid grid-cols-3 gap-8'>
        <ProductCart />
        <ProductCart />
        <ProductCart />
        <ProductCart />
        <ProductCart />
        <ProductCart />
        <ProductCart />
        <ProductCart />
        <ProductCart />
        <ProductCart />
        <ProductCart />
      </div>
      <Pagination className="mt-10">
        <PaginationContent>
          <PaginationItem className="hover:cursor-pointer">
            {/* <PaginationFirst onClick={() => handlePaging(0)} /> */}
          </PaginationItem>
          <PaginationItem className="hover:cursor-pointer" >
            <PaginationPrevious  />
          </PaginationItem>
          {/* {
            data?.payload?.data
              ?
              range(Math.max(filter.page - 2, 0), Math.min(filter.page + 2, data?.payload?.data?.totalPages - 1)).map((p, index) => {
                return <PaginationItem key={index} className="hover:cursor-pointer">
                  <PaginationLink onClick={() => handlePaging(p)} >{p + 1}</PaginationLink>
                </PaginationItem>
              })
              : null
          } */}

          <PaginationItem className="hover:cursor-pointer">
            {/* <PaginationNext onClick={() => handlePaging(filter.page + 1)} /> */}
          </PaginationItem>
          <PaginationItem className="hover:cursor-pointer">
            {/* <PaginationLast onClick={() => handlePaging(data?.payload?.data.totalPages - 1)} /> */}
          </PaginationItem>
        </PaginationContent>
      </Pagination>

    </div>
  )
}
