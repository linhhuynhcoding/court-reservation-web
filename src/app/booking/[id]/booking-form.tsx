"use client";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button";
import { cn, getAccessTokenFromLocalStorage, handleErrorApi, processTimeBooking, range } from "@/lib/utils";
import { format } from "date-fns";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BookingFormPayload, BookingFormSchema, PlaceBookingPayload, PlaceBookingPayloadSchema } from "@/schemas/booking.schema";
import { OrgaResponse } from "@/schemas/court.schema";
import { useBookingMutation } from "@/queries/useBooking";
import { useAppContext } from "@/components/app-provider";
import { toast } from "sonner";
import { HttpError } from "@/lib/http";
import { CalendarIcon } from "lucide-react";
import log from "@/lib/logger";
import { FormInfoLifting, useInfoContext } from "./info-provider";
import { PaymentFor, PaymentMethod } from "@/constants/types";

interface Props {
     court: OrgaResponse;
}

const BookingForm: React.FC<Props> = ({ court }) => {
     const { data, mutateAsync, isPending } = useBookingMutation();
     const { account } = useAppContext();
     const { info, setInfo, changeProcess } = useInfoContext();

     const form = useForm<BookingFormPayload>({
          resolver: zodResolver(BookingFormSchema),
          defaultValues: {
               time: "",
               duration: "0.5",
               date: new Date()
          }
     })

     const allValues = form.watch();

     useEffect(() => {
          setInfo({ booking: allValues } as FormInfoLifting);
     }, [JSON.stringify(allValues)])

     async function handleSubmit(values: BookingFormPayload) {
          try {

               const token = getAccessTokenFromLocalStorage();
               if (!account || !token) {
                    log.warn("Chưa xác thực tài khoản!");
                    return;
               };

               values.date.setHours(Number(values.time.split(":")[0]));
               values.date.setMinutes(Number(values.time.split(":")[1]));
               values.date.setSeconds(0);
               console.log(values);

               if (values.date < new Date()) {
                    toast.error("Ngày đặt sân không hợp lệ!");
                    return;
               }

               const payload: PlaceBookingPayload = {
                    courtId: Number(values.courtId),
                    duration: values.duration,
                    orgaId: court.id,
                    timeStart: values.date.toISOString(),
                    accountId: account.id,
               }

               console.log(payload);

               const response = await mutateAsync({ payload, token });

               toast.success(response.payload.message);
               changeProcess(2);
               setInfo({
                    ...info!,
                    order: {
                         bookingId: response.payload.data.id,
                         items: []
                    },
                    payment: {
                         id: response.payload.data.id,
                         paymentFor: PaymentFor.BOOKING,
                         paymentMethod: PaymentMethod.COD
                    }
               })
          }
          catch (e) {
               handleErrorApi({ error: e });
          }
     }

     return (
          <>
               <Form  {...form}>
                    <form id="form-booking" className="" onSubmit={form.handleSubmit(handleSubmit)}>
                         <div className="flex flex-col items-center text-center min-h-[100px] gap-4">

                              {/* DATE FIELD */}
                              <FormField
                                   control={form.control}
                                   name="date"
                                   render={({ field }) => (
                                        <FormItem className="flex flex-col w-full items-start gap-2">
                                             <div className="flex w-full">
                                                  <h3 className="text-md text-blue-900 font-bold text-left">
                                                       Chọn ngày
                                                  </h3>
                                             </div>
                                             <FormControl>
                                                  <Popover {...field}>
                                                       <PopoverTrigger asChild>
                                                            <Button
                                                                 variant={"outline"}
                                                                 className={cn(
                                                                      "w-[90%]  pl-3 text-center items-center font-normal border-gray-300 hover:bg-white hover:border-blue-700 shadow-none justify-start",
                                                                      // !field.value && "text-muted-foreground"
                                                                 )}
                                                            >
                                                                 <CalendarIcon className="mr-2 h-4 w-4" />
                                                                 {field.value ? format(field.value, "PPP") : <span>Chọn ngày</span>}
                                                            </Button>
                                                       </PopoverTrigger>
                                                       <PopoverContent className="w-full p-0" align="start">
                                                            <Calendar
                                                                 className="grid w-full"
                                                                 mode="single"
                                                                 selected={field.value}
                                                                 onSelect={(selected) => field.onChange(selected)}
                                                            />
                                                       </PopoverContent>
                                                  </Popover>
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />

                              {/* TIME START FIELD */}
                              <FormField
                                   control={form.control}
                                   name="time"
                                   render={({ field }) => (
                                        <FormItem className="flex flex-col w-full items-start gap-2">
                                             <div className="flex w-full">
                                                  <h3 className="text-md text-blue-900 font-bold text-left">Thời gian đặt sân</h3>
                                             </div>
                                             <FormControl>
                                                  <Select value={field.value} onValueChange={field.onChange} >
                                                       <SelectTrigger className="w-[90%]  pl-3 text-center items-center font-normal border-gray-300 hover:bg-white hover:border-blue-700 shadow-none ">
                                                            <SelectValue className="text-stone-900" placeholder="Chọn thời gian" />
                                                       </SelectTrigger>
                                                       <SelectContent>
                                                            {
                                                                 range(0, 23).map((i) => {
                                                                      const valueHour = i.toString().padStart(2, "0");
                                                                      const valueMinute = ":00"
                                                                      const valueMinuteHalf = ":30";
                                                                      return (
                                                                           <div key={i}>
                                                                                <SelectItem value={valueHour + valueMinute}>
                                                                                     <div>{valueHour + valueMinute}</div>
                                                                                </SelectItem>
                                                                                <SelectItem value={valueHour + valueMinuteHalf}>
                                                                                     <div>{valueHour + valueMinuteHalf}</div>
                                                                                </SelectItem>
                                                                           </div>

                                                                      )
                                                                 })
                                                            }
                                                       </SelectContent>
                                                  </Select>
                                             </FormControl>
                                             <FormMessage />
                                        </FormItem>
                                   )}
                              />


                              {/* DURATION FIELD */}
                              <FormField
                                   control={form.control}
                                   name="duration"
                                   render={({ field }) => (
                                        <FormItem className="flex flex-col w-full items-start gap-2">
                                             <div className="flex w-full">
                                                  <h3 className="text-md text-blue-900 font-bold text-left">Giờ thuê</h3>
                                             </div>
                                             <FormControl>
                                                  <Input {...field} placeholder="Điền giờ thuê sân" type="number" min={0.5} step={0.5} className="w-[90%]  pl-3 text-left items-center font-normal border-gray-300 hover:bg-white hover:border-blue-700 shadow-none justify-start">
                                                  </Input>
                                             </FormControl>
                                             <FormMessage></FormMessage>
                                        </FormItem>
                                   )}
                              />


                              {/* COURT SELECTION FIELD */}
                              <FormField
                                   control={form.control}
                                   name="courtId"
                                   render={({ field }) => (
                                        <FormItem className="flex flex-col w-full items-start gap-2">
                                             <div className="flex w-full">
                                                  <h3 className="text-md text-blue-900 font-bold text-left">Chọn sân</h3>
                                             </div>
                                             <FormControl>
                                                  <Select {...field} onValueChange={field.onChange}>
                                                       <SelectTrigger className="w-[90%]  pl-3 text-center items-center font-normal border-gray-300 hover:bg-white hover:border-blue-700 shadow-none ">
                                                            <SelectValue className="text-stone-900" placeholder="Chọn sân" />
                                                       </SelectTrigger>
                                                       <SelectContent>
                                                            {
                                                                 court.courts?.map((c, index) => {
                                                                      return (
                                                                           <SelectItem key={index} value={c?.id ? c.id.toString() : ""}>
                                                                                <div>{c.name}</div>
                                                                           </SelectItem>
                                                                      )
                                                                 })
                                                            }
                                                       </SelectContent>
                                                  </Select>
                                             </FormControl>
                                             <FormMessage></FormMessage>
                                        </FormItem>
                                   )}
                              />

                         </div>

                    </form>
               </Form>

          </>
     )
}

export default BookingForm;