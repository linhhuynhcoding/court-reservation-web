import { Backgound } from "@/src/components/Backgound";
import { HomeBookingForm } from "@/src/components/HomeBookingForm";
// import { HomeBookingForm } from "@/components/HomeBookingForm";


const TEXT_GRADIENT = `bg-gradient-to-b from-amber-100 to-orange-300`
const GROWING_TEXT_GRADIENT = `bg-gradient-to-b from-white to-amber-300`

export default function Home() {
  return (
    <div className="overflow-hidden h-full font-display">

      <main className="relative z-1 h-full flex flex-col gap-[32px] ">

        <section className="h-dvh flex xl:flex-row flex-col w-full gap-10 pt-[10rem] p-12">
          <div className="z-1 flex-2 text-xl w-fit h-hit">
            <ol className="flex flex-col justify-around xl:gap-10 lg:gap-6 gap-4 h-full">
              {/* <li className={`w-fit bg-green-100 text-sm text-green-900 rounded-md`}>
                  <p className={`pl-4 pr-4 pt-1 pb-1 font-semibold`}>Chào mừng đến với <strong><i>PickleBanh</i></strong></p>
                </li> */}
              {/* <li className="italic w-fit xl:text-5xl lg:text-3xl font-medium text-gray-100 capitalize drop-shadow-lg">
                <h1>Ta chỉ chơi Pickcleball</h1>
              </li>
              <li className="italic w-fit xl:text-5xl lg:text-3xl font-medium text-gray-100 capitalize drop-shadow-lg">
                <h1>Không nên vượt mức Pickleball!</h1>
              </li> */}
              <h1 className="text-white text-shadow-lg text-shadow-black scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-6xl italic">
                Vượt mức <br />
                <span className={`${GROWING_TEXT_GRADIENT} absolute blur-lg text-transparent bg-clip-text scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-8xl`}>
                  Pickleball!
                </span>
                <span className={`${TEXT_GRADIENT} text-transparent bg-clip-text scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-8xl`}>
                  Pickleball! &nbsp;
                </span>

              </h1>

              <h2 className="order-last w-fit
              scroll-m-20 border-b-8 border-teal-400
              bg-gradient-to-r from-teal-400 to-yellow-200
              text-transparent bg-clip-text pb-2 text-3xl font-bold tracking-tight first:mt-0 italic">
                <span className={`absolute 
                  bg-gradient-to-r from-teal-400 to-yellow-200
                  blur-lg text-transparent bg-clip-text pb-2 text-3xl font-bold tracking-tight first:mt-0 italic`}>
                  Vượt qua mọi giới hạn!
                </span>
                Vượt qua mọi giới hạn! &nbsp; &nbsp;
              </h2>
              {/* <li className="w-fit xl:text-base lg:text-sm font-xs text-gray-100 drop-shadow-lg">
                <p>Thiên lý ơi em có thể ở lại đây không biết chăng ngoài trời mưa giông nhiều cô đơn lắm em!</p>
              </li> */}
            </ol>
          </div>
          <Backgound />
        </section>
        <section className="flex justify-center bg-gradient-to-r from-amber-500 to-pink-500 w-dvw p-20">
          <div className="relative xl:w-[500px] lg:w-[400px] w-full h-fit">
            <HomeBookingForm>

            </HomeBookingForm>
          </div>
        </section>


      </main>
    </div>
  );
}
