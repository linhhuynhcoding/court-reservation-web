"use client";
import { motion } from "framer-motion";

const TEXT_GRADIENT = `bg-gradient-to-b from-amber-100 to-orange-300`
const GROWING_TEXT_GRADIENT = `bg-gradient-to-b from-white to-amber-300`

function TypoMotion() {
     return (
          <>
               <h1 className="text-white text-shadow-lg text-shadow-black scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-8xl italic">
                    Vượt mức <br />
                    <span className={`${GROWING_TEXT_GRADIENT} absolute blur-lg text-transparent bg-clip-text scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-9xl`}>
                         Pickleball!
                    </span>
                    <span className={`${TEXT_GRADIENT} text-transparent bg-clip-text scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-9xl`}>
                         Pickleball! &nbsp;
                    </span>
               </h1>
               <motion.div
                    initial={
                         {
                              opacity: 0,
                              y: 10
                         }
                    }

                    animate={
                         {
                              opacity: 1,
                              y: 0,
                              transition: {
                                   type: "spring",
                                   damping: 12,
                                   stiffness: 200,
                                   duration: 1

                              }

                         }
                    }
               >
                    <h2 className="order-last w-fit scroll-m-20 border-b-8 border-teal-400 
                    bg-gradient-to-r from-teal-400 to-yellow-200
                    text-transparent bg-clip-text pb-2 text-3xl font-bold tracking-tight first:mt-0 italic">
                         <span className={`absolute 
                         bg-gradient-to-r from-teal-400 to-yellow-200
                         blur-lg text-transparent bg-clip-text pb-2 text-3xl font-bold tracking-tight first:mt-0 italic`}>
                              Vượt qua mọi giới hạn!
                         </span>
                         Vượt qua mọi giới hạn! &nbsp; &nbsp;
                    </h2>

               </motion.div>

          </>
     );
}

export default TypoMotion;