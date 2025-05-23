import { ReactNode } from "react";
import { Badge } from "./badge";

interface VariantType {
     [index: string]: {
          content: string;
          style: string;
     };
}

const Variants: VariantType = {
     "success": {
          content: "Thành công",
          style: "bg-green-500"
     },
     "failed": {
          content: "Thất bại",
          style: "bg-red-500"
     },
     "paying": {
          content: "Đang chờ thanh toán",
          style: "bg-yellow-500"
     },
     "pending": {
          content: "Đang xử lý",
          style: "bg-blue-700"
     },
     "waiting": {
          content: "Đang chờ nhận sân",
          style: "bg-teal-700"
     },
} as const;

interface Props {
     variant: string;
     children?: ReactNode
}

const BadgeCustom: React.FC<Props> = ({variant, children}) => {
     return (
          <Badge variant="outline" className={`border-none bg-yellow-500 text-white font-light ${Variants[variant].style}`}>
               {children ?? Variants[variant].content}
          </Badge>

     )
}

export default BadgeCustom;