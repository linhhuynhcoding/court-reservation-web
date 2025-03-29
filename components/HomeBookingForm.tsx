"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
     Form,
     FormControl,
     FormDescription,
     FormField,
     FormItem,
     FormLabel,
     FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

interface FieldsProperties {
     label: string,
     description: string,
     placeholder: string,
     style?: string,
}

const formSchema = z.object({
     location: z.string().min(2, {
          message: "Username must be at least 2 characters.",
     }),
     date: z.string().min(2, {
          message: "Username must be at least 2 characters.",
     }),
     time: z.string().min(2, {
          message: "Username must be at least 2 characters.",
     }),
     duration: z.string().min(2, {
          message: "Username must be at least 2 characters.",
     }),
})

const fields : {
     [index: string] : FieldsProperties
} = {
     location: {
          label: "Location",
          description: "This is your public display name.",
          placeholder: "Select your location",
     },
     date: {
          label: "Date",
          description: "This is your public display name.",
          placeholder: "Choose date",
     },
     time: {
          label: "Time",
          description: "This is your public display name.",
          placeholder: "Choose time",
     },
     duration: {
          label: "Duration",
          description: "This is your public display name.",
          placeholder: "Select duration",
     },
}


export function HomeBookingForm() {
     // 1. Define your form.
     const form = useForm<z.infer<typeof formSchema>>({
          resolver: zodResolver(formSchema),
          defaultValues: {
               location: "",
               date: "",
               time: "",
               duration: "",
          },
     })

     // 2. Define a submit handler.
     function onSubmit(values: z.infer<typeof formSchema>) {
          // Do something with the form values.
          // ✅ This will be type-safe and validated.
          console.log(values)
     }

     return (
          <div className="flex flex-col gap-4 w-full h-full bg-white rounded-lg shadow-lg p-8 ">
               <div className="text-left text-2xl font-lg">
                    Khám phá và đặt sân pickleball chất lượng cao một cách dễ dàng với PickleBanh.
               </div>
               <div className="flex flex-col gap-2 w-full h-full">
                    <div className="flex flex-col gap-2 w-full h-full">
                         <h1 className="text-3xl font-bold text-center">Đặt sân</h1>
                         <p className="text-center">Chọn thời gian và sân chơi mà bạn muốn đặt</p>
                    </div>
                    <div className="flex flex-col gap-2 w-full h-full">
                         <Form {...form}>
                              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                   {(formSchema.keyof().options).map((field, index) =>
                                   (<FormField key={index}
                                        control={form.control}
                                        name={field} 
                                        render={({ field }) => (
                                             <FormItem>
                                                  <FormLabel>{fields[(field.name)].label}</FormLabel>
                                                  <FormControl>
                                                       <Input placeholder={fields[field.name].placeholder} {...field} />
                                                  </FormControl>
                                                  <FormMessage />
                                             </FormItem>
                                        )}
                                   />
                                   ))
                                   }
                                   <Button type="submit">Submit</Button>
                              </form>
                         </Form>
                    </div>
               </div>
          </div>
     );
}