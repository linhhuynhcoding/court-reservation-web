"use client";
import { JSX,  useRef } from "react"
import logo from '@/assets/logotitle.png'

// Import Components 
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation";

// const GLASS_MORPHISM_TAILWIND = "h-full w-full bg-white-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border border-gray-100";
const LINK_HOVER_STYLE = "hover:border-b-2 hover:text-black hover:font-semibold hover:border-sky-500 hover:text-sky-500 transition-colors";
const LINK_FOCUS_STLYE = "border-b-2 text-black font-semibold border-sky-500 text-sky-500 transition-colors";

const LINKS = [
     { name: "Home", href: "/" },
     { name: "Cuộc tình", href: "/contact" },
     { name: "Contact", href: "/1" },
     { name: "Contact", href: "/2" },
];

export default function Header(): JSX.Element {

     const linkRefs = useRef<{ [index: string]: HTMLAnchorElement }>({});
     const pathname = usePathname();

     return <>
          <header className={`p-12 w-dvw z-1 relative`}>
               <nav className={`p-2 min-h-10  rounded-xl border-solid border-gray-300 border-1 shadow-xl ${'bg-white'} `}>
                    <ul className="pl-0 flex justify-center items-center gap-8">
                         <li className="min-h-10 flex-1 flex items-center transition delay-150 duration-300 ease-in-out hover:scale-105">
                              <Link href="/" className="">
                                   <div className="pl-4 pr-10 h-max">
                                        <Image src={logo.src} className="size-auto" width="100" height="100" alt="" priority />
                                   </div>
                              </Link>
                         </li>
                         {
                              LINKS.map((link, index) => {
                                   return <li key={link.href} >
                                        <Link className={`font-light ${pathname === link.href ? LINK_FOCUS_STLYE : ""} ${LINK_HOVER_STYLE}`} ref={(elm) => { if (elm) linkRefs.current[index] = elm }} href={link.href}>{link.name}</Link>
                                   </li>
                              })
                         }
                         <li className="p-2 pl-10 min-h-10 flex-1 flex justify-end gap-2">
                              <Button className="hover:border-b-1  " variant={`secondary`} asChild>
                                   <Link href="/login">Sign In</Link>
                              </Button>
                              <Button className={`hover:border-b-1`} asChild>
                                   <Link href="/register">Join with us</Link>
                              </Button>
                         </li>
                    </ul>
               </nav>



          </header>
     </>
}