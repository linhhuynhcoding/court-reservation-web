import { Backgound } from "@/components/Backgound";
import { HomeBookingForm } from "@/components/HomeBookingForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// import { HomeBookingForm } from "@/components/HomeBookingForm";
import { cn } from "@/lib/utils"; // Make sure this exists
import CourtCart from "@/components/court-cart";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import TypoMotion from "@/components/typo-motion";



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

export default function Home() {
  return (
    <div className="overflow-hidden h-full font-display">

      <main className="relative z-1 h-full flex flex-col gap-[32px] ">

        <section className="h-dvh flex xl:flex-row flex-col w-full gap-10 pt-[10rem] p-12">
          <div className="z-1 flex-2 text-xl w-fit h-hit">
            <ol className="flex flex-col justify-around xl:gap-10 lg:gap-6 gap-4 h-full">
              <TypoMotion>

              </TypoMotion>
            </ol>
          </div>
          <Backgound />
        </section>
        <section className={`flex flex-col w-dvw p-20 gap-3`}>
          <span><strong>Thành phố nơi bạn sống </strong></span>
          <Tabs defaultValue="account" className="flex flex-col w-full gap-4">
            <div className="flex justify-between">
              <div>
                <TabsList className={`${TAG_LIST_STYLE} grid w-full grid-cols-2`}>
                  {
                    TABS.map((tab, index) => {
                      return <TabsTrigger key={index} value={tab.value} className={`${TAG_TRIGGER_STYLE}`}>{tab.name}</TabsTrigger>

                    })
                  }
                </TabsList>

              </div>
              <div className={`flex gap-1`}>

              </div>
            </div>
            <div>
              {
                TABS.map((tab, index) => {
                  return <TabsContent key={index} value={tab.value}
                    className=" h-fit ">
                    <Carousel className="relative overflow-visiable">
                      <CarouselContent className="relative overflow-visiable -ml-4 p-4">
                        <CarouselItem className="pl-1 2xl:basis-1/5 xl:basis-1/4 md:basis-1/3 2lg:basis-1/2"><CourtCart></CourtCart></CarouselItem>
                        <CarouselItem className="pl-1 2xl:basis-1/5 xl:basis-1/4 md:basis-1/3 2lg:basis-1/2"><CourtCart></CourtCart></CarouselItem>
                        <CarouselItem className="pl-1 2xl:basis-1/5 xl:basis-1/4 md:basis-1/3 2lg:basis-1/2"><CourtCart></CourtCart></CarouselItem>
                        <CarouselItem className="pl-1 2xl:basis-1/5 xl:basis-1/4 md:basis-1/3 2lg:basis-1/2"><CourtCart></CourtCart></CarouselItem>
                        <CarouselItem className="pl-1 2xl:basis-1/5 xl:basis-1/4 md:basis-1/3 2lg:basis-1/2"><CourtCart></CourtCart></CarouselItem>
                        <CarouselItem className="pl-1 2xl:basis-1/5 xl:basis-1/4 md:basis-1/3 2lg:basis-1/2"><CourtCart></CourtCart></CarouselItem>
                        <CarouselItem className="pl-1 2xl:basis-1/5 xl:basis-1/4 md:basis-1/3 2lg:basis-1/2"><CourtCart></CourtCart></CarouselItem>
                        <CarouselItem className="pl-1 2xl:basis-1/5 xl:basis-1/4 md:basis-1/3 2lg:basis-1/2"><CourtCart></CourtCart></CarouselItem>
                        <CarouselItem className="pl-1 2xl:basis-1/5 xl:basis-1/4 md:basis-1/3 2lg:basis-1/2"><CourtCart></CourtCart></CarouselItem>
                        <CarouselItem className="pl-1 2xl:basis-1/5 xl:basis-1/4 md:basis-1/3 2lg:basis-1/2"><CourtCart></CourtCart></CarouselItem>
                        <CarouselItem className="pl-1 2xl:basis-1/5 xl:basis-1/4 md:basis-1/3 2lg:basis-1/2"><CourtCart></CourtCart></CarouselItem>
                        <CarouselItem className="pl-1 2xl:basis-1/5 xl:basis-1/4 md:basis-1/3 2lg:basis-1/2"><CourtCart></CourtCart></CarouselItem>
                      </CarouselContent>
                      <CarouselPrevious />
                      <CarouselNext />
                    </Carousel>

                  </TabsContent>

                })
              }
            </div>
          </Tabs>

        </section>
        <section className="flex justify-center bg-gradient-to-r from-amber-500 to-pink-500 w-dvw p-20">
          <div className="relative xl:w-[500px] lg:w-[400px] w-full h-fit">
            <HomeBookingForm>

            </HomeBookingForm>
          </div>
        </section>


      </main>
    </div >
  );
}
