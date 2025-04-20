/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCity, useDistrict, useWard } from "@/queries/useLocation";
import { Label } from "@radix-ui/react-label";
import {
     Select,
     SelectTrigger,
     SelectValue,
     SelectContent,
     SelectItem,
} from "@/components/ui/select"; import { Control, Controller, useForm, UseFormRegister, UseFormWatch } from "react-hook-form";
import { Input } from "./ui/input";
import { PlaceOrderPayload, PlaceOrderPayloadSchema } from "@/schemas/order.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaymentMethod } from "@/constants/types";
import { DistrictResponseSchemaType, ProvinceResponseSchemaType, WardResponseSchemaType } from "@/schemas/location.schemas";

interface Props {
     watch: UseFormWatch<any>;
     control: Control<any, any, any>;
     register: UseFormRegister<any>;
}

// TODO: refactor
export const AddressForm: React.FC<Props> = ({watch, control, register}) => {
     const { data: cityData, isLoading: cityLoading } = useCity();
     const { data: districtData, isLoading: districtLoading } = useDistrict(Number(watch("createAddressPayload.city")?.split(",")[1]));
     const { data: wardData, isLoading: wardLoading } = useWard(Number(watch("createAddressPayload.district")?.split(",")[1]));

     return (
          <div className="grid grid-cols-3 gap-4 justify-stretch justify-items-stretch text-xs">
               <div className="flex flex-col gap-1">
                    <Label className="font-normal">Tỉnh / Thành</Label>
                    <Controller
                         name="createAddressPayload.city"
                         control={control}
                         render={({ field }) => (
                              <Select
                                   // disabled={isDisabled}
                                   onValueChange={field.onChange}
                                   value={field.value ?? undefined}
                                   defaultValue={field.value ?? undefined} >
                                   <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Tỉnh / Thành" />
                                   </SelectTrigger>
                                   <SelectContent>
                                        {
                                             !cityLoading ?
                                                  cityData?.payload.data?.map((city: ProvinceResponseSchemaType, index: number) => {
                                                       return <SelectItem key={index} value={`${city?.name},${city?.code}`}>{city.name}</SelectItem>
                                                  })
                                                  : null
                                        }
                                   </SelectContent>
                              </Select>

                         )}
                    />


               </div>
               <div className="flex flex-col gap-1">
                    <Label className="font-normal">Quận / Huyện</Label>
                    <Controller
                         name="createAddressPayload.district"
                         control={control}
                         render={({ field }) => (
                              <Select
                                   // disabled={isDisabled}
                                   onValueChange={field.onChange}
                                   value={field.value ?? undefined}
                                   defaultValue={field.value ?? undefined} >
                                   <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Quận / Huyện" />
                                   </SelectTrigger>
                                   <SelectContent>
                                        {
                                             !districtLoading ?
                                                  districtData?.payload?.data?.[0]?.map((district: DistrictResponseSchemaType, index: number) => {
                                                       return <SelectItem key={index} value={`${district?.name},${district?.code}`}>{district.name}</SelectItem>
                                                  })
                                                  : null
                                        }
                                   </SelectContent>
                              </Select>
                         )}

                    />
               </div>
               <div className=" flex flex-col gap-1">
                    <Label className="font-normal">Phường / Xã</Label>
                    <Controller
                         name="createAddressPayload.ward"
                         control={control}
                         render={({ field }) => (
                              <Select 
                              // disabled={isDisabled}
                                   onValueChange={field.onChange}
                                   value={field.value ?? undefined}
                                   defaultValue={field.value ?? undefined} >
                                   <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Phường / Xã" />
                                   </SelectTrigger>
                                   <SelectContent>
                                        {
                                             !wardLoading ?
                                                  wardData?.payload?.data?.[0]?.map((ward: WardResponseSchemaType, index: number) => {
                                                       return <SelectItem key={index} value={`${ward?.name},${ward?.code}`}>{ward.name}</SelectItem>
                                                  })
                                                  : null
                                        }
                                   </SelectContent>
                              </Select>
                         )}

                    />
               </div>
               <div className="flex flex-col gap-1">
                    <Label className="font-normal">Địa chỉ cụ thể</Label>
                    <Input {...register("createAddressPayload.addressLine")} className=""></Input>
               </div>
          </div>
     )
}