import { Badge } from "@/components/ui/badge";
import BadgeCustom from "@/components/ui/badge-custom";
import { toGMT7 } from "@/lib/date";
import { BookingResponse } from "@/schemas/booking.schema";
import Image from "next/image";
import { useMemo } from "react";

const BOOKING_BAGDE_MAPPING: { [index: string]: string } = {
     "PENDING": "pending",
     "BOOKED": "success",
     "WAITING": "waiting",
     "FAILED": "failed",
     "PAYING": "paying",

} as const;

interface Props {
     booking: BookingResponse
}

export const BookingItem: React.FC<Props> = ({ booking }) => {

     // === MEMO ===
     const timeStart = useMemo(() => {
          return new Date(toGMT7(booking.timeStart)).toLocaleDateString("vi-VN", {
               hour: "2-digit",
               minute: "2-digit"
          })
     }, []);

     const duration = useMemo(() => {
          const dateStart = new Date(booking.timeStart);
          const dateEnd = new Date(booking.timeEnd);

          return (dateEnd.getHours() + dateEnd.getMinutes() / 60.0) - (dateStart.getHours() + dateStart.getMinutes() / 60.0);
     }, [])

     return (
          <div className="w-full min-h-32 rounded-md border flex items-stretch p-2 gap-2">
               <div className="relative w-30 h-30 p-1">
                    <Image
                         alt="" fill objectFit="cover" className="rounded-lg"
                         src={booking?.image?.[0]?.image?.image_url ?? "https://res.cloudinary.com/dnoq9necr/image/upload/v1745151475/j8i2mjbzq1k0qknxgusu.webp"} />
               </div>
               <div className="flex flex-1 flex-col pt-4 pl-2 ">
                    <div>
                         <h1 className="font-bold">{booking.orgaName}</h1>
                    </div>
                    <div>
                         <h2 className="font-semibold">{booking.courtName}</h2>
                    </div>
                    <div>
                         <h2 className="font-nomrmal text-xs">Thời gian: {timeStart}</h2>
                    </div>
                    <div>
                         <h2 className="font-nomrmal text-xs">Giờ: {duration}</h2>
                    </div>
               </div>
               <div className="flex flex-col justify-between">
                    <div className="flex flex-col items-end gap-1">
                         <BadgeCustom variant={BOOKING_BAGDE_MAPPING[booking.status ?? "PENDING"]}>
                         </BadgeCustom>
                    </div>
                    <div className="self-end">
                         <h1 className="font-semibold text-2xl text-blue-800">{(booking.payment?.amount ?? 0).toLocaleString("vi-VN")}đ</h1>
                    </div>
               </div>
          </div>
     )
}