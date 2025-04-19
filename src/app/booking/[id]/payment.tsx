import { CardSelect } from "@/components/ui/cart-select"
import { PaymentMethod } from "@/constants/types"
import { useState } from "react"
import { useInfoContext } from "./info-provider"

export const PaymentForm: React.FC = () => {
     const [value, setValue] = useState<string>(PaymentMethod.COD)
     const {info, setInfo} = useInfoContext();

     const handleOnClick = (newValue: string) => {
          console.log(newValue);
          setValue(() => newValue);

          if (!info) return;
          
          setInfo({
               ...info,
               payment: {
                    ...info!.payment!,
                    paymentMethod: value
               }
          })
     }

     return (
          <div className="w-full">
               <div>
                    <div className="flex gap-4 p-4">
                         <CardSelect value={PaymentMethod.COD} isSelected={value === PaymentMethod.COD} onClick={handleOnClick} title="Thanh toán online" ></CardSelect>
                         <CardSelect value={PaymentMethod.VNPAY} isSelected={value === PaymentMethod.VNPAY} onClick={handleOnClick} title="Thanh toán tại sân" ></CardSelect>
                    </div>
               </div>
          </div>
     )
}