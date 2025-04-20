"use client";
import Image from "next/image";
import product from '@/assets/product.avif'
import { Checkbox } from "@/components/ui/checkbox"
import { NumberInput } from "@/components/ui/number-input";
import { CartItemResponse, UpdateItemPayload } from "@/schemas/cart.schema";
const SAMPLE_IMAGE = product.src

interface Props {
     item: CartItemResponse,
     disabled?: boolean,
     onUpdateItem?: (item: UpdateItemPayload) => void;
     onDeleteItem?: (itemId: number) => void;
}

export const CartItem: React.FC<Props> = ({ item, disabled, onUpdateItem = (item) => { }, onDeleteItem = (itemId) => { } }) => {
     return (
          <div className={`w-full bg-white grid grid-cols-[${!disabled ? '0.5fr_' : ''}1fr_2fr_1fr_1fr_1fr${!disabled ? '_0.3fr' : ''}] border min-h-32 p-4  items-center`}>

               {
                    !disabled ?
                         <div className="flex justify-center justify-content-stretch ">
                              <Checkbox defaultChecked={item.selected} disabled={disabled}
                                   onCheckedChange={(checked) => {
                                        onUpdateItem({
                                             productId: item.product.id,
                                             quantity: item.quantity,
                                             selected: checked as boolean
                                        })
                                   }} />

                         </div>
                         : null
               }
               <div className="relative h-32 w-32">
                    <Image className="rounded-sm h-full" src={SAMPLE_IMAGE} objectFit="cover" sizes="" fill={true} alt="" />
               </div>
               <div className="pl-4">
                    <span>{item.product.name}</span>
               </div>
               <div className="w-[80px] pr-2">
                    <NumberInput disabled={disabled}
                         max={disabled ? item.quantity : 10}
                         defaultValue={item.quantity} min={disabled ? item.quantity : 1} onValueChange={(value) => {
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
               {
                    !disabled ?
                         <div >
                              <span onClick={() => onDeleteItem(item.id)} className="text-red-400 ">Xóa</span>
                         </div>
                         : null
               }

          </div>
     )
}