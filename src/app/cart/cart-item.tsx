"use client";
import Image from "next/image";
import product from '@/assets/product.avif'
import { Checkbox } from "@/components/ui/checkbox"
import { NumberInput } from "@/components/ui/number-input";
import { CartItemResponse, UpdateItemPayload } from "@/schemas/cart.schema";
const SAMPLE_IMAGE = product.src

interface Props {
     item: CartItemResponse,
     onUpdateItem: (item: UpdateItemPayload) => void;
     onDeleteItem: (itemId: number) => void;
}

export const CartItem: React.FC<Props> = ({ item, onUpdateItem = (item) => { }, onDeleteItem = (itemId) => { } }) => {
     return (
          <div className="w-full bg-white grid grid-cols-[0.5fr_1fr_2fr_1fr_1fr_1fr_0.3fr] border min-h-32 p-4  items-center">
               <div className="flex justify-center justify-content-stretch ">
                    <Checkbox defaultChecked={item.selected}
                         onCheckedChange={(checked) => {
                              onUpdateItem({
                                   productId: item.product.id,
                                   quantity: item.quantity,
                                   selected: checked as boolean
                              })
                         }} />

               </div>
               <div className="relative h-32 w-32">
                    <Image className="rounded-sm h-full" src={SAMPLE_IMAGE} objectFit="cover" sizes="" fill={true} alt="" />
               </div>
               <div className="pl-4">
                    <span>{item.product.name}</span>
               </div>
               <div className="w-[100px]      ">
                    <NumberInput defaultValue={item.quantity} min={1} onValueChange={(value) => {
                         if (!value) return;
                         onUpdateItem({
                              productId: item.product.id,
                              quantity: value,
                              selected: item.selected,
                         })
                    }}></NumberInput>
               </div>
               <div>
                    <span>{item.product.price.toLocaleString("vi-VN")}đ</span>
               </div>
               <div>
                    <span>{(item.product.price * item.quantity).toLocaleString("vi-VN")}đ</span>
               </div>
               <div >
                    <span onClick={() => onDeleteItem(item.id)} className="text-red-400 ">Xóa</span>
               </div>
          </div>
     )
}