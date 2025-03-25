"use client";
import background from "@/assets/background.jpg";
import Image from "next/image";
import { motion } from "framer-motion"

export function Backgound() {
     return (
          <>
               <div
                    className="absolute top-0 w-fit h-fit overflow-hidden"
               >
                    <motion.div
                         animate={{
                              scale: 1.2,
                              transition: { duration: 10 }
                         }}
                    >
                         <Image src={background.src} className="z-0 w-dvw " width={`${500}`} height={background.height} alt="" />
                    </motion.div>
               </div>

          </>
     )
}