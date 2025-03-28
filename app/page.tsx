import { Backgound } from "@/components/Backgound";
import { FooterWithSocialLinks } from "@/components/FooterWithSocialLinks";


export default function Home() {
  return (
    <div className="overflow-hidden h-full font-display">
      <Backgound />

      <main className="relative h-dvh flex flex-col gap-[32px] ">
        <div className="h-fit flex p-12 w-full">
          <div className="flex-2 text-xl">
            <ol className="flex flex-col xl:gap-10 lg:gap-6  gap-4">
              <li className={`w-fit bg-green-100 text-green-900 rounded-md `}>
                  <p className={`pl-4 pr-4 pt-1 pb-1 text-sm font-semibold`}>Chào mừng đến với <strong><i>PickleBanh</i></strong></p>
              </li>
              <li className="italic w-fit xl:text-5xl lg:text-3xl font-medium text-gray-100 capitalize drop-shadow-lg">
                <h1>Ta chỉ chơi Pickcleball</h1>
              </li>
              <li className="italic w-fit xl:text-5xl lg:text-3xl font-medium text-gray-100 capitalize drop-shadow-lg">
                <h1>Không nên vượt mức Pickleball!</h1>
              </li>
            </ol>
          </div>
          <div className="flex-1 "></div>
        </div>

      </main>
      
      <FooterWithSocialLinks></FooterWithSocialLinks>
    </div>
  );
}
