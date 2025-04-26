'use client'

import { useNextCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
     CalendarEventExternal,
     createViewDay,
     createViewMonthAgenda,
     createViewMonthGrid,
     createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'

import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useMemo, useState } from "react";
import { useAppContext } from '@/components/app-provider'
import { useManagerContext } from '@/components/manager-provider'
import { BookingFilter, BookingFilterSchema } from '@/schemas/filter.schemas'
import { getAccessTokenFromLocalStorage } from '@/lib/utils'
import { useGetCourtBookings } from '@/queries/useBooking'
import { BookingResponse } from '@/schemas/booking.schema'
import { toGMT7 } from '@/lib/date'
import { format } from 'date-fns'

import {
     Select,
     SelectContent,
     SelectItem,
     SelectTrigger,
     SelectValue,
} from "@/components/ui/select"

const durations: { [index: number]: string } = {
     1: "Hôm nay",
     7: "Tuần này",
     30: "30 ngày gần nhất",
     180: "6 tháng gần nhất",
     [-7]: "Tuần tới",
}

export function ScheduelBooking() {
     // === CONTEXT ===
     const { account } = useAppContext();
     const { org } = useManagerContext();

     // === STATES ===
     const [filter, setFilter] = useState<BookingFilter>(BookingFilterSchema.parse({ pageSize: 10, sort: "[[DATE,DESC]]", duration: 7 }));
     const eventsService = useState(() => createEventsServicePlugin())[0];

     // === VARIABLES ===
     const token = getAccessTokenFromLocalStorage();

     // === QUERIES ===
     const { data, isLoading } = useGetCourtBookings(org?.id ?? 0, filter, token ?? "");

     // === MEMO ===
     const bookings: BookingResponse[] = useMemo(() => data?.payload?.data?.content ?? [], [data]);

     const events: CalendarEventExternal[] = useMemo(() => {
          return bookings?.map((booking) => {
               const timeStart = format(new Date(toGMT7(booking.timeStart)), 'yyyy-MM-dd HH:mm')
               const timeEnd = format(new Date(toGMT7(booking.timeEnd)), 'yyyy-MM-dd HH:mm')

               return {
                    id: booking.id!,
                    title: booking.courtName + " " + (booking.account?.name ?? ""),
                    start: timeStart,
                    end: timeEnd
               }
          }) ?? []
     }, [bookings]);


     const calendar = useNextCalendarApp({
          views: [createViewDay(), createViewWeek(), createViewMonthGrid(), createViewMonthAgenda()],
          weekOptions: {
               gridHeight: 1500,
          },
          calendars: {
               personal: {
                    colorName: 'personal',
                    lightColors: {
                         main: '#f9d71c',
                         container: '#fff5aa',
                         onContainer: '#594800',
                    },
                    darkColors: {
                         main: '#fff5c0',
                         onContainer: '#fff5de',
                         container: '#a29742',
                    },
               },
          },
          events: events,
          plugins: [eventsService],
          callbacks: {
               onRender: () => {
                    // get all events
                    eventsService.getAll()
               }
          },

          theme: 'shadcn'
     })

     useEffect(() => {
          eventsService.set(events);
     }, [events])

     return (
          <div>
               <div className="flex justify-end border p-2 rounded-lg">
                    <div className="self-end">
                         <Select defaultValue="1" onValueChange={(value) => {
                              setFilter({
                                   ...filter,
                                   duration: Number(value)
                              })
                         }}>
                              <SelectTrigger className="w-full">
                                   <SelectValue placeholder="Chọn thời gian" />
                              </SelectTrigger>
                              <SelectContent>
                                   <SelectItem value="-7">{durations[-7]}</SelectItem>
                                   <SelectItem value="1">{durations[1]}</SelectItem>
                                   <SelectItem value="7">{durations[7]}</SelectItem>
                                   <SelectItem value="30">{durations[30]}</SelectItem>
                                   <SelectItem value="180">{durations[180]}</SelectItem>
                              </SelectContent>
                         </Select>
                    </div>
               </div>
               {
                    events.length && !isLoading
                         ?
                         <ScheduleXCalendar calendarApp={calendar} />
                         : null
               }
          </div>
     );
}