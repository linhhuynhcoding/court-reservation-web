"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useCity, useDistrict, useWard } from "@/queries/useLocation";
import { CreateCourtPayload, CreateCourtPayloadSchema } from "@/schemas/court.schema"
import { DistrictResponseSchemaType, ProvinceResponseSchemaType, WardResponseSchemaType } from "@/schemas/location.schemas";
import { zodResolver } from "@hookform/resolvers/zod"
import { Label } from "@radix-ui/react-label";
import {
     Select,
     SelectTrigger,
     SelectValue,
     SelectContent,
     SelectItem,
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form"
import { cn, genCourtName, getAccessTokenFromLocalStorage } from "@/lib/utils";
import { useEffect, useState } from "react";
import Image from "next/image";
import imgApi from "@/apis/image";
import { FormMessage } from "@/components/ui/form";
import { useUploadImageMutation } from "@/queries/useMedia";
import { useUploadCourtMutation } from "@/queries/useCourt";
import { toast } from "sonner";
import { ImageResponse } from "@/schemas/orther.schema";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

// TODO: HANDLE FORM ERRORS
export default function FormAddCourt() {
     const router = useRouter();
     const [files, setFiles] = useState<FileList>();
     const [isDisabled, setIsDisabled] = useState(false);
     const useUploadCourtImgMutation = useUploadImageMutation();
     const useCreateCourtMutation = useUploadCourtMutation();

     const {
          register,
          handleSubmit,
          watch,
          formState: { errors },
          control
     } = useForm<CreateCourtPayload>({
          resolver: zodResolver(CreateCourtPayloadSchema),
          defaultValues: {
               address: {
                    longitude: 0,
                    latitude: 0
               },
               courtNames: [],
          },
     })

     const { data: cityData, isLoading: cityLoading } = useCity();
     const { data: districtData, isLoading: districtLoading } = useDistrict(Number(watch("address.city")?.split(",")[1]));
     const { data: wardData, isLoading: wardLoading } = useWard(Number(watch("address.district")?.split(",")[1]));

     async function handleSubmitForm(values: CreateCourtPayload) {
          console.log("payload: ", values)
          setIsDisabled(true);
          try {
               const token = getAccessTokenFromLocalStorage();
               let body = {
                    ...values,
                    address: {
                         ...values?.address,
                         city: values?.address?.city?.split(',')[0] ?? "",
                         district: values?.address?.district?.split(',')[0] ?? "",
                         ward: values?.address?.ward?.split(',')[0] ?? "",
                    },
                    courtNames: genCourtName(values.numberOfCourts)
               };

               if (files) {

                    const formData = new FormData();

                    Array.from(files).forEach((file) => {
                         formData.append("images", file as Blob);
                    })
                    const updateImagesResponse = await useUploadCourtImgMutation.mutateAsync(formData);

                    body = {
                         ...body,
                         imageCourts: updateImagesResponse.payload.map(({ image_url, width, height, type }: ImageResponse) => ({ image_url, width, height, type }))
                    }
               }

               const uploadCourtResponse = await useCreateCourtMutation.mutateAsync({ payload: body, token: token! });

               console.log(uploadCourtResponse);

               toast.success("Tạo sân thành công!", { duration: 4000 });

               setTimeout(() => { }, 2000);

               router.push("/admin");
          }
          catch (e) {
               console.log(e);
          }
     }

     useEffect(() => {
          console.log(errors)
     }, [errors])

     return (
          <form onSubmit={handleSubmit(handleSubmitForm)} className="flex flex-col gap-8">
               <div className="flex flex-col gap-4" >
                    <div className="pb-6 border-b">
                         <h2 className="text-2xl font-semibold">Thông tin cơ bản</h2>
                    </div>
                    <div className="flex gap-6 justify-stretch justify-items-stretch">
                         <div className="flex flex-col gap-1">
                              <Label className="font-normal">Tên sân</Label>
                              <Input disabled={isDisabled} {...register("name")} className="w-[200px]" ></Input>
                         </div>
                         <div className="flex flex-col gap-1">
                              <Label className="font-normal">Số điện thoại</Label>
                              <Input disabled={isDisabled} {...register("phone")} type="phone"></Input>
                         </div>
                         <div className=" flex flex-col gap-1">
                              <Label className="font-normal">Số lượng sân bóng</Label>
                              <Input disabled={isDisabled} {...register("numberOfCourts")} className="w-[150px]" type="number"></Input>
                         </div>
                         <div className="flex flex-col gap-1">
                              <Label className="font-normal">Giá</Label>
                              <Input disabled={isDisabled} {...register("price")} className="w-[100px]" type="number"></Input>
                         </div>
                    </div>
               </div>
               <div className="flex flex-col gap-4">
                    <div className="pb-6 border-b">
                         <h2 className="text-2xl font-semibold">Thông tin địa chỉ</h2>
                    </div>
                    <div className="grid grid-cols-3 gap-4 justify-stretch justify-items-stretch">
                         <div className="flex flex-col gap-1">
                              <Label className="font-normal">Tỉnh / Thành</Label>
                              <Controller
                                   name="address.city"
                                   control={control}
                                   render={({ field }) => (
                                        <Select disabled={isDisabled}
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
                                   name="address.district"
                                   control={control}
                                   render={({ field }) => (
                                        <Select
                                             disabled={isDisabled}
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
                                   name="address.ward"
                                   control={control}
                                   render={({ field }) => (
                                        <Select disabled={isDisabled}
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

                              />                         </div>
                         <div className="flex flex-col gap-1">
                              <Label className="font-normal">Địa chỉ cụ thể</Label>
                              <Input disabled={isDisabled} {...register("address.addressLine")} className=""></Input>
                         </div>
                    </div>
               </div>
               <div className="flex flex-col gap-4">
                    <div className="pb-6 border-b">
                         <h2 className="text-2xl font-semibold">Ảnh</h2>
                    </div>
                    <div className="flex flex-col gap-6 justify-stretch justify-items-stretch items-stretch">
                         <Input disabled={isDisabled} onChange={(e) => {
                              if (e.target.files) {
                                   setFiles(e.target.files)
                              }
                         }} type="file" height={""} className="" multiple ></Input>

                         <div className="flex gap-5">
                              {
                                   files ?
                                        Array.from(files).map((file: File, index: number) => {
                                             return <div key={index} className="relative w-[200px] h-[200px] border shadow-lg border-orange-300 p-1">
                                                  <Image src={URL.createObjectURL(file)} objectFit="cover" fill alt="">
                                                  </Image>
                                             </div>

                                        })
                                        : null
                              }
                         </div>

                    </div>
               </div>
               <div>
                    <Button type="submit" className="pl-5 pr-5" disabled={useUploadCourtImgMutation.isPending || useCreateCourtMutation.isPending}>
                         {useUploadCourtImgMutation.isPending || useCreateCourtMutation.isPending ?
                              <Loader2 className="animate-spin" />
                              : null
                         }
                         Tạo sân
                    </Button>
               </div>
          </form>
     )
}