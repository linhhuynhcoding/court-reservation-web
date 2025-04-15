'use client'

import { useNextCalendarApp, ScheduleXCalendar } from '@schedule-x/react'
import {
     createViewDay,
     createViewMonthAgenda,
     createViewMonthGrid,
     createViewWeek,
} from '@schedule-x/calendar'
import { createEventsServicePlugin } from '@schedule-x/events-service'

import '@schedule-x/theme-default/dist/index.css'
import { useEffect, useState } from "react";

export function ScheduelBooking() {
     const eventsService = useState(() => createEventsServicePlugin())[0];

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
          events: [
               {
                    id: '1',
                    title: 'Event 1',
                    start: '2025-04-12 14:00',
                    end: '2025-04-12 15:00',
                    calendarId: "personal"
               },
               {
                    id: '2',
                    title: 'Event 1',
                    start: '2025-04-12 14:00',
                    end: '2025-04-12 15:00',
                    calendarId: "personal"
               },
          ],
          plugins: [eventsService],
          callbacks: {
               onRender: () => {
                    // get all events
                    eventsService.getAll()
               }
          },

          theme: 'shadcn'
     })

     return (
          <div>
               <ScheduleXCalendar calendarApp={calendar} />
          </div>
     );
}