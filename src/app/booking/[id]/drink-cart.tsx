import { HiOutlineShoppingBag } from "react-icons/hi2";
import React from 'react'
import Image from "next/image";
import product from '@/assets/drink.jpg'
import { ProductResponse } from "@/schemas/product.schema";
import { Input } from "@/components/ui/input";
import { NumberInput } from "@/components/ui/number-input";

const SAMPLE_IMAGE = product.src

interface Props {
     product?: ProductResponse;
     quantity?: number,
     onQuantityChange: (quantity: number ) => void;
}

const DrinkCart: React.FC<Props> = ({ product = {
     id: 1,
     buyTurn: 0,
     category: {
          id: 0,
          name: "EQUIPMENT"
     },
     image: { image_url: SAMPLE_IMAGE, status: "ACTIVE", type: "ORGINAL", height: 10, width: 10, id: 1 },
     name: "Vợt Pickleball - 500 xanh dương",
     price: 1199000,
     stock: 100

}, onQuantityChange }) => {

     return (
          <div className={`relative bg-white flex flex-col justify-self-stretch border border-xs border-gray-200
 md:w-[150px] w-2xs p-3 gap-2 max-h-[500px] hover:cursor-pointer`}>

               <div className={`relative flex justify-items-stretch w-auto h-32 overflow-hidden`}>
                    <Image className="rounded-sm h-full" src={product?.image?.image_url ?? SAMPLE_IMAGE} objectFit="cover" sizes="" fill={true} alt="" />
               </div>

               <div className="flex flex-col gap-2">
                    <div className="flex items-end">
                         <span className="font-normal text-md">
                              {Math.round(product.price).toLocaleString("vi")} <u>đ</u>
                         </span>
                    </div>
                    <h3 className="font-bold tracking-wide text-xs">
                         {product.name}
                    </h3>
                    <div className="flex justify-between text-xs font-semibold p-4">
                         <NumberInput min={0} onValueChange={(value) => {
                              if (typeof value === 'undefined') return;
                              onQuantityChange(value);
                         }} />
                    </div>
               </div>
          </div>
     )
}

export default DrinkCart