"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { BookingFormPayload } from "@/schemas/booking.schema";
import { PlaceOrderBookingPayload } from "@/schemas/order.schema";
import { PaymentPayload } from "@/schemas/payment.schema";

export interface FormInfoLifting {
     booking: BookingFormPayload;
     order: PlaceOrderBookingPayload & { productName?: string, productPrice?: number };
     payment: PaymentPayload;
}

interface ContextProps {
     children: React.ReactNode
}

// Khởi tạo context
const InfoContext = createContext<{
     info: FormInfoLifting | undefined;
     process: number;
     setInfo: (value: FormInfoLifting) => void;
     changeProcess: (value: number) => void;
     // bookingId: number | undefined;
     // setBookingId: (value: number | undefined) => void;
}>({
     info: undefined,
     process: 1,
     setInfo: () => { },
     changeProcess: () => { },
     // bookingId: undefined,
     // setBookingId: () => { },
});

// Custom hook 
export const useInfoContext = () => {
     return useContext(InfoContext);
};

// Định nghĩa Provider
export const InfoContextProvider: React.FC<ContextProps> = ({ children }) => {
     const [formInfo, setFormInfo] = useState<FormInfoLifting>();
     const [process, setProcess] = useState(1);
     const [bookingId, setBookingId] = useState<number>();

     return (
          <InfoContext value={{
               info: formInfo, process: process,
               // bookingId: bookingId, setBookingId: setBookingId,
               setInfo: setFormInfo, changeProcess: setProcess,
          }}>
               {children}
          </InfoContext>
     )
}