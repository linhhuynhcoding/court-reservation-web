import { JSX } from "react"
import logo from '@/assets/logotitle.png'
import { GiHamburgerMenu } from "react-icons/gi";

// Import Components 
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import NavLink from "./NavLink";

// const GLASS_MORPHISM_TAILWIND = "h-full w-full bg-white-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border border-gray-100";

const HREFS = [
     { name: "Home", href: "/" },
     { name: "Cuộc tình", href: "/contact" },
     { name: "Contact", href: "/1" },
     { name: "Contact", href: "/2" },
];

export default function Header(): JSX.Element {

     return <>
          <header className={`p-12 w-dvw z-1 absolute`}>
               <nav className={`p-2 min-h-10 rounded-xl border-solid border-gray-300 border-1 shadow-xl ${'bg-white'} `}>
                    <ul className="pl-0 flex justify-center items-center xl:gap-8">
                         <li className="min-h-10 flex-1 flex items-center transition delay-150 duration-300 ease-in-out hover:scale-105">
                              <Link href="/" className="">
                                   <div className="pl-4 pr-10 h-max">
                                        <Image src={logo.src} className="size-auto" width="100" height="100" alt="" priority />
                                   </div>
                              </Link>
                         </li>
                         <li className="xl:order-2 order-first justify-self-stretch">
                              <div className="xl:hidden block items-center pl-4 text-2xl text-sky-600">
                                   <GiHamburgerMenu />
                              </div>
                              <ol className="xl:flex hidden flex-1 flex justify-center items-center gap-8">
                                   <NavLink hrefs={HREFS}></NavLink>
                              </ol>
                         </li>
                         <li className="order-last p-2 pl-10 min-h-10 flex-1 flex justify-end gap-2 ">
                              <Button className="hover:border-b-1  " variant={`secondary`} asChild>
                                   <Link href="/auth/login">Sign In</Link>
                              </Button>
                              <Button className={`hover:border-b-1`} asChild>
                                   <Link href="/auth/register">Join with us</Link>
                              </Button>
                         </li>
                    </ul>
               </nav>
          </header>
     </>
}