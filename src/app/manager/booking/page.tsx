import React from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";

const TAG_TRIGGER_STYLE = `inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background w-fit
transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none
 disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm`;
const TAG_LIST_STYLE = `h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full grid-cols-5`;

const TABS = [
  { value: "1", name: "Tp Hồ Chí Minh" },
  { value: "2", name: "Tp Hồ Chí Minh" },
  { value: "3", name: "Tp Hồ Chí Minh" },
  { value: "4", name: "Tp Hồ Chí Minh" },
  { value: "5", name: "Tp Hồ Chí Minh" },
];

export function BookingPage() {
  return (
    <div >
      <div className="flex flex-col pl-5 pr-5 gap-4">
        <h1 className="text-3xl font-bold">Booking</h1>
        <div className=" flex justify-stretch bg-white w-fit">
          <Tabs defaultValue="account" className="w-fit">
            <TabsList className={TAG_LIST_STYLE + ` `}>
              {
                TABS.map((tab, index) => {
                  return <TabsTrigger key={index} value={tab.value} className={`${TAG_TRIGGER_STYLE}`}>{tab.name}</TabsTrigger>

                })
              }
            </TabsList>
            <TabsContent value="account">Make changes to your account here.</TabsContent>
            <TabsContent value="password">Change your password here.</TabsContent>
          </Tabs>
        </div>
        <div className="border bg-white rounded-lg w-full p-10 overflow-auto max-h-[800px]">
          {/* <ScheduelBooking></ScheduelBooking> */}
        </div>
      </div>

    </div>
  )
}

export default BookingPage