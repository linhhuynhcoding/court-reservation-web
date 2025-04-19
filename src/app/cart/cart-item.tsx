"use client";
import Image from "next/image";
import product from '@/assets/product.avif'
import { Checkbox } from "@/components/ui/checkbox"
import { NumberInput } from "@/components/ui/number-input";
const SAMPLE_IMAGE = product.src

export const CartItem: React.FC = () => {
     return (
          <div className="w-full bg-white justify-between border min-h-32 p-4 flex items-center">
               <div className="">
                    <Checkbox />

               </div>
               <div className="relative h-32 w-32">
                    <Image className="rounded-sm h-full" src={SAMPLE_IMAGE} objectFit="cover" sizes="" fill={true} alt="" />
               </div>
               <div className="pl-4">
                    <span>Tên sản phẩm</span>
               </div>
               <div className="w-[100px]      ">
                    <NumberInput></NumberInput>
               </div>
               <div>
                    <span>900.000đ</span>
               </div>
          </div>
     )
}