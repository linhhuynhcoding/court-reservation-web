import { Backgound } from "@/components/Backgound";
import { FooterWithSocialLinks } from "@/components/FooterWithSocialLinks";
// import { HomeBookingForm } from "@/components/HomeBookingForm";


export default function Home() {
  return (
    <div className="overflow-hidden h-full font-display">

      <main className="relative h-dvh flex flex-col gap-[32px] ">
        <div className="h-dvh flex xl:flex-row flex-col  w-full gap-10 pt-[14rem] p-12">
          <div className="z-1 flex-2 text-xl w-fit h-hit">
            <ol className="flex flex-col xl:gap-10 lg:gap-6 gap-4">
              <li className={`w-fit bg-green-100 text-sm text-green-900 rounded-md`}>
                <p className={`pl-4 pr-4 pt-1 pb-1 font-semibold`}>Chào mừng đến với <strong><i>PickleBanh</i></strong></p>
              </li>
              <li className="italic w-fit xl:text-5xl lg:text-3xl font-medium text-gray-100 capitalize drop-shadow-lg">
                <h1>Ta chỉ chơi Pickcleball</h1>
              </li>
              <li className="italic w-fit xl:text-5xl lg:text-3xl font-medium text-gray-100 capitalize drop-shadow-lg">
                <h1>Không nên vượt mức Pickleball!</h1>
              </li>
              <li className="w-fit xl:text-base lg:text-sm font-xs text-gray-100 drop-shadow-lg">
                <p>Thiên lý ơi em có thể ở lại đây không biết chăng ngoài trời mưa giông nhiều cô đơn lắm em!</p>
              </li>
            </ol>
          </div>
          <Backgound />

        </div>
        <div>
          <h1>Court here</h1>
        </div>
        <div className="flex-1 relative xl:w-[500px] lg:w-[400px] w-full h-fit">
          {/* <HomeBookingForm>

            </HomeBookingForm> */}
        </div>

      </main>
      <FooterWithSocialLinks></FooterWithSocialLinks>
    </div>
  );
}
