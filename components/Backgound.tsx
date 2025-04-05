// "use client";
import background from "@/assets/background.jpg";
import Image from "next/image";
// import { motion } from "framer-motion"

export function Backgound() {
     return (
          <>
               <div
                    className="absolute z-0 top-0 left-0 w-dvw h-dvh overflow-hidden"
               >
                    {/* <motion.div
                         animate={{
                              scale: 1.2,
                              transition: { duration: 10 }
                         }}
                         className="absolute w-full h-full"
                    > */}
                    <Image
                         src={background.src}
                         className="z-0 w-full h-full opacity-50"
                         // width={`${background.width}`} height={background.height} 
                         objectFit="cover"
                         quality={100}
                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"

                         fill={true}
                         alt=""
                    />
                    <div className="
                         w-full h-full 
                         
                         bg-gradient-to-b from-blue-950/0 to-blue-950
                         ">

                    </div>
                    {/* </motion.div> */}
               </div>

          </>
     )
}