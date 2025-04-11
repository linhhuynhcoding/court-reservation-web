import { HiOutlineShoppingBag } from "react-icons/hi2";
import React from 'react'
import Image from "next/image";
import product from '@/assets/product.avif'

const SAMPLE_IMAGE = product.src

function ProductCart() {
     return (
          <div className={`relative bg-white flex flex-col justify-self-stretch border border-xs border-gray-200
 md:w-3xs w-xs p-3 gap-2 max-h-[500px] hover:cursor-pointer`}>

               <div className={`relative flex justify-items-stretch w-auto h-52 overflow-hidden`}>
                    <Image className="rounded-sm h-full" src={SAMPLE_IMAGE} objectFit="cover" sizes="" fill={true} alt="" />
               </div>

               <div className="flex flex-col gap-2">
                    <div className="flex items-end">
                         <span className="font-normal text-lg">1.100.000<u>đ</u></span>
                    </div>
                    <h3 className="font-bold tracking-wide lg:text-md">
                         Vợt Pickleball - 500 xanh dương
                    </h3>
                    <span className="flex text-xs font-semibold items-center gap-2 content-self-end">
                         {/* <FaLocationArrow /> */}
                         {/* {orga.address?.city} */}
                    </span>
                    <div className="flex justify-between text-xs font-semibold pt-6 pr-2">
                         <span className="flex items-center gap-2 font-bold text-lg">
                              ADIASS
                         </span>
                         <span className="flex items-center gap-2">
                              <HiOutlineShoppingBag className="text-2xl" />
                         </span>
                    </div>
               </div>
          </div>)
}

export default ProductCart