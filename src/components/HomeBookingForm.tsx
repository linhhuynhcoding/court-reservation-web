"use client";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/src/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/src/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "./ui/calendar";
import { format } from "date-fns";
import { cn } from "@/src/lib/utils";


const formSchema = z.object({
  location: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  date: z.date(),
  time: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  duration: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})

type FormFields = z.infer<typeof formSchema>;

export function HomeBookingForm() {
  // 1. Define your form.
  const form = useForm<FormFields>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      location: "dark",
      date: undefined,
      time: "",
      duration: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: FormFields) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log("values: ", values);
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
              {/* LOCATION */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Location</FormLabel>
                    <FormControl>
                      <div className={``}>
                        <Select {...field} onValueChange={field.onChange} >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* DATE */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <div className={``} onChange={field.onChange} >
                        <Popover {...field} >
                          <PopoverTrigger asChild>
                            <Button
                              variant={"outline"}
                              className={cn(
                                "w-full justify-start text-left font-normal",
                                !field.value && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {field.value ? format(field.value, "PPP") : <span>Choose a date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* TIME */}
              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Time</FormLabel>
                    <FormControl>
                      <div className={``}>
                        <Select {...field} onValueChange={field.onChange} >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* DURATION */}
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <div className={``}>
                        <Select {...field} onValueChange={field.onChange} >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Theme" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="light">Light</SelectItem>
                            <SelectItem value="dark">Dark</SelectItem>
                            <SelectItem value="system">System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="w-full" type="submit" >Booking now</Button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}