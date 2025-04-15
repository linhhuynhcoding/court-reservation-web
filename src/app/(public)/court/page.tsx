"use client";

import cover from "@/assets/cover.jpg";
import Image from "next/image";
import { CourtView } from "./court-view";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useCity } from "@/queries/useLocation";
import { ProvinceResponseSchemaType } from "@/schemas/location.schemas";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns";

function CourtPage() {
     const [name, setName] = useState<string>();
     const [location, setLocation] = useState<string>();
     const [date, setDate] = useState<Date | undefined>(new Date())
     const { data } = useCity();

     return (
          <div className="w-full h-fit bg-slate-50 pb-10">
               <div className="relative hidden w-full justify-center lg:flex">
                    <div className="relative h-[600px] w-full">
                         <span className="absolute w-full h-full" >
                              <Image alt="homepage_cover_image" src={cover.src} fill objectFit="cover" />
                         </span>
                         <div className="absolute bg-black opacity-30 w-full h-full bg-gradient-to-t from-[#00000080] to-[#00000080]">
                         </div>
                    </div>
                    <div className="absolute top-[320px] mx-auto flex w-full flex-col items-center gap-8">
                         <div className="flex flex-col items-center gap-3">
                              <div className="text-5xl font-bold text-white">Book Sân Ngay Nào</div>
                              <div className="text-2xl text-center text-white">Từ khắp nơi trên mọi miền đất nước, tham gia cùng với chúng tôi để nhận được ưu đãi!</div>
                         </div>
                         <div className="w-full lg:max-w-[1056px]">
                              <div className="hidden justify-center lg:flex">
                                   <form className="shadow-2xl shadow-teal-200/40 relative max-h-[120px] w-full max-w-[1056px] rounded-[60px] bg-white py-4 pl-10 pr-32 shadow-lg">
                                        <div className="grid w-full grid-cols-[200px_1px_300px_1px_300px] items-start gap-4">

                                             <div className="flex items-center gap-3 py-2 cursor-pointer">
                                                  <div className="w-full">
                                                       <div className="typography-main mb-1 text-left font-bold text-blue-grey-900 pb-2">Vị trí</div>
                                                       <div className="typography-main flex w-full flex-nowrap items-center justify-between text-nowrap text-left text-blue-grey-400 placeholder:text-blue-grey-400">
                                                            <div className="relative w-full">
                                                                 <div className="flex h-6 items-center gap-3 bg-white">
                                                                      <div className="flex w-full items-center border-none bg-transparent p-0 outline-none" id="headlessui-combobox-button-10">
                                                                           {/* <input autocomplete="off" className="typography-main w-full border-none p-0 outline-none text-blue-grey-400 placeholder:text-blue-grey-400" placeholder="Search venue name, city, or state" id="headlessui-combobox-input-11" role="combobox" type="text" aria-expanded="false" aria-autocomplete="list" data-headlessui-state="" value=""> */}
                                                                           <Select onValueChange={(value) => setLocation(value)} >
                                                                                <SelectTrigger className="w-full border-none shadow-none">
                                                                                     <SelectValue className="text-stone-900" placeholder="Chọn nơi bạn sống" />
                                                                                </SelectTrigger>
                                                                                <SelectContent>
                                                                                     {
                                                                                          data?.payload.data.map((city: ProvinceResponseSchemaType, index: number) => {
                                                                                               return <SelectItem key={index} value={city?.name}>{city.name}</SelectItem>
                                                                                          })
                                                                                     }
                                                                                </SelectContent>
                                                                           </Select>
                                                                      </div>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div data-orientation="vertical" role="none" className="shrink-0 bg-blue-grey-100 h-full w-[1px] mt-5 !h-8"></div>
                                             <div className="flex items-center gap-3 py-2 cursor-pointer">
                                                  <div className="w-full">
                                                       <div className="typography-main mb-1 text-left font-bold text-blue-grey-900 pb-2">Tên sân</div>
                                                       <div className="typography-main flex w-full flex-nowrap items-center justify-between text-nowrap text-left text-blue-grey-400 placeholder:text-blue-grey-400">
                                                            <div className="relative w-full">
                                                                 <div className="flex h-6 items-center gap-3 bg-white">
                                                                      <button className="flex w-full items-center border-none bg-transparent p-0 outline-none" id="headlessui-combobox-button-10" type="button" aria-haspopup="listbox" aria-expanded="false" data-headlessui-state="">
                                                                           {/* <input autocomplete="off" className="typography-main w-full border-none p-0 outline-none text-blue-grey-400 placeholder:text-blue-grey-400" placeholder="Search venue name, city, or state" id="headlessui-combobox-input-11" role="combobox" type="text" aria-expanded="false" aria-autocomplete="list" data-headlessui-state="" value=""> */}
                                                                           <Input onChange={(e) => setName(e.target.value)} className="border-none shadow-none" placeholder="Hãy chọn sân bạn muốn">
                                                                           </Input>
                                                                      </button>
                                                                 </div>
                                                            </div>
                                                       </div>
                                                  </div>
                                             </div>
                                             <div data-orientation="vertical" role="none" className="shrink-0 bg-blue-grey-100 h-full w-[1px] mt-5 !h-8"></div>
                                             <div>
                                                  <div className="my-2 flex h-[52px] items-center gap-3">
                                                       <div className="w-full">
                                                            <div className="typography-main mb-0.5 text-left font-bold text-blue-grey-100 pb-2">Ngày</div>
                                                            <div className="typography-main flex w-full flex-nowrap items-center justify-between text-nowrap text-left text-blue-grey-100 placholder:text-blue-grey-100">
                                                                 <Popover>
                                                                      <PopoverTrigger asChild>
                                                                           <Button
                                                                                variant={"outline"}
                                                                                className={cn(
                                                                                     "w-[240px] pl-3 text-left font-normal border-none shadow-none justify-start",
                                                                                     // !field.value && "text-muted-foreground"
                                                                                )}
                                                                           >
                                                                                <CalendarIcon className="mr-2 h-4 w-4" />
                                                                                {date ? format(date, "PPP") : <span>Chọn ngày</span>}
                                                                           </Button>
                                                                      </PopoverTrigger>
                                                                      <PopoverContent className="w-auto p-0" align="start">
                                                                           <Calendar
                                                                                className="grid"
                                                                                mode="single"
                                                                                selected={date}
                                                                                onSelect={(selected) => setDate(selected)}
                                                                           />
                                                                      </PopoverContent>
                                                                 </Popover>
                                                            </div>
                                                       </div>
                                                  </div>
                                                  <div data-show="false" className="typography-tiny border-0 border-t border-solid pt-1 text-left font-bold text-destructive-600 data-[show=true]:block data-[show=false]:hidden data-[show=false]:border-transparent data-[show=true]:border-destructive"></div>
                                             </div>
                                        </div>
                                        {/* <button className="typography-sub remove-styles-a flex cursor-pointer items-center justify-center rounded border border-solid text-center outline-none transition active:shadow-none disabled:cursor-not-allowed disabled:shadow-none border-transparent bg-primary text-white hover:text-white hover:shadow-md focus:border-primary-700 active:border-transparent active:bg-primary-800 disabled:bg-blue-grey-50 disabled:text-blue-grey-200 h-10 py-2.5 typography-main absolute bottom-6 end-4 top-6 flex h-[52px] w-[104px] gap-2 rounded-[30px] font-bold">
                                             <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="size-6 text-white">
                                                  <path d="M17 17L12.3333 12.3333M13.8889 8.44444C13.8889 11.4513 11.4513 13.8889 8.44444 13.8889C5.43756 13.8889 3 11.4513 3 8.44444C3 5.43756 5.43756 3 8.44444 3C11.4513 3 13.8889 5.43756 13.8889 8.44444Z" stroke="currentColor" strokeWidth="1.67" stroke-linecap="round" stroke-linejoin="round"></path>
                                             </svg>
                                             Search
                                        </button> */}
                                   </form>
                              </div>
                         </div>
                    </div>
               </div>
               <div className="md:w-fit md:min-w-[1000px] w-full bg-white h-auto justify-self-center rounded-xl m-10 p-2 pb-5 gap-4 justify-center">
                    <CourtView date={date ?? new Date()} location={location} name={name} >

                    </CourtView>
               </div>
          </div>
     );
}

export default CourtPage;