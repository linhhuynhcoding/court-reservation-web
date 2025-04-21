import BadgeCustom from "@/components/ui/badge-custom"
import Image from "next/image";
import product from '@/assets/product.avif'
import { OrderItemResponse, OrderResponse } from "@/schemas/order.schema";
const SAMPLE_IMAGE = product.src

interface Props {
     order: OrderResponse;
}

export const OrderItem: React.FC<Props> = ({ order }) => {
     return (
          <div className="w-full min-h-32 rounded-md border flex flex-col items-stretch p-1 gap-2">
               <div className="h-16 w-full rounded-md bg-blue-200/10 p-2 flex items-center gap-2">
                    <div>
                         <h1 className="font-semibold text-blue-900">MÃ ĐƠN HÀNG: {'0001215'}</h1>
                    </div>
                    <div className="pl-4">
                         <BadgeCustom variant="success"></BadgeCustom>
                    </div>
                    <div className="flex-1">

                    </div>
                    <div className="w-[30%]">
                         <div className="flex gap-2 font-semibold text-blue-900 justify-between">
                              <h1>Tổng cộng</h1>
                              <span>{order.total?.toLocaleString("vi-VN")}đ</span>
                         </div>
                         <div className="flex gap-2 font-light text-blue-900 justify-between">
                              <h1>Phí ship</h1>
                              <span>{order.shipFee?.toLocaleString("vi-VN")}đ</span>
                         </div>
                    </div>
               </div>
               {
                    order.orderItems?.map((item, index: number) => {
                         return <div key={index} className="h-16 w-full bg-white last:border-none border-b p-2 flex items-center gap-2">
                              <div className="relative w-14 h-14">
                                   <Image src={SAMPLE_IMAGE} fill objectFit="cover" alt=""></Image>
                              </div>
                              <div className="flex flex-1 flex-col pt-4 pl-2 ">
                                   <h1 className="font-bold">{item.product.name}</h1>
                              </div>
                              <div className="pr-6">
                                   <h1>{item.quantity}</h1>
                              </div>
                              <div >
                                   <h1>{((item.quantity ?? 0) * item.product.price).toLocaleString("vi-VN")}đ</h1>
                              </div>
                         </div>
                    })
               }
          </div>
     )
}