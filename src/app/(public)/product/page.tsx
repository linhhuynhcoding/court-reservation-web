"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Slider, } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import ProductView from './pageview';

export default function ProductPage() {
     const [range, setRange] = useState<number[]>([0, 100])

     console.log(range);

     return (
          <div className='grid min-h-screen grid-cols-4 p-10 gap-6'>
               <aside className='col-span-1 border-b'>
                    <div className='border-b pb-8'>
                         <h2 className='text-xl font-light '>BỘ LỌC</h2>
                    </div>
                    <div className='flex flex-col border-b pt-4 pb-6 h-fit gap-10'>
                         <h2 className='text-lg font-semibold '>CHỌN GIÁ</h2>
                         <div className='flex flex-col gap-4 w-full'>
                              <Slider onValueChange={(value: number[]) => setRange(value)} defaultValue={[0, 100]} max={100} step={10} />
                              <div className='flex justify-between gap-6 '>
                                   <Input className='w-[100px]' value={(range[0] * 5000000 / 100).toLocaleString("vi")} disabled></Input>
                                   <Input className='w-[100px]' value={(range[1] * 5000000 / 100).toLocaleString("vi")} disabled></Input>
                              </div>
                         </div>
                    </div>
               </aside>
               <main className='col-span-3 pl-4'>
                    <ProductView _range={range}></ProductView>
               </main>
          </div>
     )
}