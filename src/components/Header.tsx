"use client";

import { JSX } from "react"
import logo from '@/assets/logotitle.png'
import { GiHamburgerMenu } from "react-icons/gi";

// Import Components 
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import NavLink from "./NavLink";
import { AccountType } from "../schemas/account.schema";
import { usePathname } from "next/navigation";
import { useAppContext } from "./app-provider";
import { HiOutlineShoppingBag } from "react-icons/hi2";

// const GLASS_MORPHISM_TAILWIND = "h-full w-full bg-white-100 rounded-md bg-clip-padding backdrop-filter backdrop-blur-xl bg-opacity-20 border border-gray-100";

const HREFS = [
     { name: "Trang chủ", href: "/" },
     { name: "Đặt sân", href: "/court" },
     { name: "Dụng cụ thể thao", href: "/product" },
     { name: "Liên hệ", href: "/contact" },
];

const ADMIN_STYLES = `p-0`;

const HOME_PATHS = ['', '/', '/login', '/register'];

export default function Header({ }): JSX.Element {
     const { account } = useAppContext();
     const pathname = usePathname();
     const isAdmin = pathname.startsWith('/admin') || pathname.startsWith('/manager');
     const isHome = HOME_PATHS.includes(pathname);
     console.log("account: ", account);

     return <>
          <header className={`${!isHome ? ADMIN_STYLES : `p-8 absolute`}  w-dvw z-10 `}>
               <nav className={`${!isHome ? ADMIN_STYLES : `rounded-xl`} p-2 min-h-8  border-solid border-gray-300 border-1 shadow-sm ${'bg-white'} `}>
                    <ul className="pl-0 flex justify-center items-center xl:gap-8">
                         <li className="min-h-10 flex-1 flex items-center ">
                              <Link href="/" className="">
                                   <div className="pl-6 pr-10 h-max">
                                        <Image src={logo.src} className="size-auto" width="100" height="100" alt="" priority />
                                   </div>
                              </Link>
                         </li>
                         {
                              isAdmin ? null
                                   :
                                   <li className="xl:order-2 order-first justify-self-stretch">
                                        <div className="xl:hidden block items-center pl-4 text-2xl text-sky-600">
                                             <GiHamburgerMenu />
                                        </div>
                                        <ol className="xl:flex hidden flex-1 flex justify-center items-center gap-8">
                                             <NavLink hrefs={HREFS} style="font-light"></NavLink>
                                        </ol>
                                   </li>

                         }

                         <li className="md:flex order-last p-2 pl-10 min-h-10 flex-1 flex items-center justify-end gap-2 hidden">

                              {
                                   (pathname.startsWith('/product') && account) &&
                                   <Link href={"/cart"} className="flex items-center gap-2 transition delay-50 duration-200 ease-in-out hover:bg-blue-800 hover:text-white p-2 rounded-3xl ">
                                        <HiOutlineShoppingBag className="text-2xl " />
                                        Giỏ hàng
                                   </Link >
                              }
                              {
                                   account
                                        ? <>
                                             <Button className={`hover:border-b-1 h-full items-stretch`} asChild>
                                                  <Link href="/me">Hi, <i><strong>{account.username}</strong>!</i></Link>
                                             </Button>
                                        </>
                                        : <>
                                             <Button className="hover:border-b-1   h-full items-stretch" variant={`secondary`} asChild>
                                                  <Link href="/login">Đăng nhập</Link>
                                             </Button>
                                             <Button className={`hover:border-b-1 h-full items-stretch`} asChild>
                                                  <Link href="/register">Đăng ký tài khoản</Link>
                                             </Button>
                                        </>
                              }
                         </li>
                    </ul>
               </nav>
          </header>
     </>
}