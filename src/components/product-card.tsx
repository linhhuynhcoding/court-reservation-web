import { HiOutlineShoppingBag } from "react-icons/hi2";
import React from 'react'
import Image from "next/image";
import product from '@/assets/product.avif'
import { ProductResponse } from "@/schemas/product.schema";

const SAMPLE_IMAGE = product.src

interface Props {
     product?: ProductResponse;
     onAddToCart: (id: number) => void;
}

const ProductCard: React.FC<Props> = ({
     product = {
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
     },
     onAddToCart = (id: number) => { },
}) => {

     return (
          <div className={`relative bg-white flex flex-col justify-self-stretch border border-xs border-gray-200
 md:w-3xs w-xs p-3 gap-2 max-h-[500px] hover:cursor-pointer`}>

               <div className={`relative flex justify-items-stretch w-auto h-52 overflow-hidden`}>
                    <Image className="rounded-sm h-full" src={product?.image?.image_url ?? SAMPLE_IMAGE} objectFit="cover" sizes="" fill={true} alt="" />
               </div>

               <div className="flex flex-col gap-2">
                    <div className="flex items-end">
                         <span className="font-normal text-lg">
                              {Math.round(product.price).toLocaleString("vi")} <u>đ</u>
                         </span>
                    </div>
                    <h3 className="font-bold tracking-wide lg:text-md">
                         {product.name}
                    </h3>
                    <span className="flex text-xs font-semibold items-center gap-2 content-self-end">
                         {/* <FaLocationArrow /> */}
                         {/* {orga.address?.city} */}
                    </span>
                    <div className="flex justify-between text-xs font-semibold pt-6 pr-2">
                         <span className="flex items-center gap-2 font-bold text-lg">
                              ADIASS
                         </span>
                         <span onClick={() => onAddToCart(product.id)} className="flex items-center gap-2 transition delay-50 duration-200 ease-in-out hover:bg-blue-800 hover:text-white p-2 rounded-3xl ">
                              <HiOutlineShoppingBag className="text-2xl " />
                         </span>
                    </div>
               </div>
          </div>)
}

export default ProductCard