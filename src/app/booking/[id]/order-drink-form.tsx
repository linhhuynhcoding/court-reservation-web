"use client";

import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { BookingFormPayload, BookingFormSchema, PlaceBookingPayloadSchema } from '@/schemas/booking.schema';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { CalendarIcon, FormInput } from "lucide-react";
import { Calendar } from "@/components/ui/calendar"
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { PlaceOrderBookingPayload, PlaceOrderBookingPayloadSchema } from '@/schemas/order.schema';
import React, { useContext, useMemo, useState } from 'react';
import { ProductFilter, ProductFilterSchema } from '@/schemas/filter.schemas';
import { useGetAllProducts } from '@/queries/useProduct';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import DrinkCart from './drink-cart';
import { ProductResponse } from '@/schemas/product.schema';
import { useInfoContext } from './info-provider';

// interface Props {

// }

export const OrderDrinkForm: React.FC = () => {
     const [filter, setFilter] = useState<ProductFilter>(ProductFilterSchema.parse({
          categoryName: "BEVERAGE",
          pageSize: 50
     }));
     const { data, isLoading } = useGetAllProducts(filter);
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     const products: ProductResponse[] = useMemo(() => (data?.payload?.data?.content ?? []), [data])
     const { info, setInfo } = useInfoContext()

     const handleQuantityCount = (value: number, productId: number, productName?: string, productPrice?: number) => {
          console.log("Change quantity!")
          if (!info?.order?.bookingId) return;

          setInfo({
               ...info!,
               order: {
                    bookingId: info?.order?.bookingId,
                    items: [...(info?.order?.items?.filter((i) => i.productId != productId) ?? []), {
                         productId,
                         productName,
                         productPrice,
                         quantity: value
                    }].filter((i) => i.quantity !== 0)
               }
          })

     }

     return (
          <div className="flex flex-col items-center text-centeDr min-h-[100px] gap-4 ">

               {/* ITEMS */}
               <div className='w-[80%] pl-3 pr-3'>
                    <Carousel
                         className=''
                    >
                         <CarouselContent className='relative flex overflow-visiable p-4'>
                              {
                                   isLoading ? "" :
                                        products?.map((product, index) => {
                                             return (
                                                  <CarouselItem key={index} className="w-fit 2xl:basis-1/3 basis-1/2">
                                                       <DrinkCart product={product} onQuantityChange={(quantity) => handleQuantityCount(quantity, product.id, product.name, product.price)} ></DrinkCart>
                                                  </CarouselItem>
                                             )
                                        })
                              }
                         </CarouselContent>
                         <CarouselPrevious />
                         <CarouselNext />
                    </Carousel>
               </div>
          </div>
     );
}