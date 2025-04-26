import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { ScheduelBooking } from './schedule';
import { BookingList } from './booking-list';

const TAG_TRIGGER_STYLE = `inline-flex w-full items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background w-fit
transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none
 disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm`;
const TAG_LIST_STYLE = `h-10 items-center w-full flex justify-stretch rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-5`;

const TABS = [
  { value: "1", name: "Danh sách" },
  { value: "2", name: "Lịch" },
];

export default function BookingPage() {
  return (
    <div >
      <div className="flex flex-col pl-5 pr-5 gap-4">
        <h1 className="text-3xl font-bold">Booking</h1>
        <Tabs defaultValue="account" className="w-full flex flex-col gap-4">
          <div className=" flex justify-stretch bg-white w-fit">
            <TabsList className={TAG_LIST_STYLE + ` `}>
              {
                TABS.map((tab, index) => {
                  return <TabsTrigger key={index} value={tab.value} className={`${TAG_TRIGGER_STYLE}`}>{tab.name}</TabsTrigger>

                })
              }
            </TabsList>

          </div>
          <div className="border bg-white rounded-lg w-full p-10 overflow-auto max-h-[800px]">
            <TabsContent value="1">
              <BookingList></BookingList>
            </TabsContent>
            <TabsContent value="2">
              <ScheduelBooking></ScheduelBooking>
            </TabsContent>
          </div>
        </Tabs>
      </div>

    </div>
  )
}