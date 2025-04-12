"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
const LINK_HOVER_STYLE = "hover:border-b-2 hover:text-black hover:font-semibold hover:border-sky-500 hover:text-sky-500 transition-colors";
const LINK_FOCUS_STLYE = "border-b-2 text-black font-semibold border-sky-500 text-sky-500 transition-colors";

export default function NavLink({ hrefs, style, hover_style = LINK_HOVER_STYLE, focus_style = LINK_FOCUS_STLYE }: {
     // eslint-disable-next-line @typescript-eslint/no-explicit-any
     hrefs: { name: string, href: string, children?: any }[],
     hover_style?: string,
     focus_style?: string,
     style?: string,

}) {
     const pathname = usePathname();

     return (
          hrefs.map((link, index) => {
               return <li key={index} >
                    <Link
                         // eslint-disable-next-line @typescript-eslint/no-explicit-any
                         className={`${style} ${(pathname === link.href || link?.children?.find((i: any) => i.href === pathname)) ? focus_style : ""} ${hover_style}`}
                         href={link.href}>{link.name}
                    </Link>

                    {
                         // eslint-disable-next-line @typescript-eslint/no-explicit-any
                         ((link?.children && pathname === link.href) || link?.children?.find((i: any) => i.href === pathname))
                              ?
                              <ul className="flex flex-col bg-orange-100 text-orange-800 font-semibold">
                                   {
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        // link?.children.map((c: any, i: number) => {
                                        //      return <Link key={i} href={c.href} className="p-2 pl-4 hover: border-b border-white ">
                                        //           {c.name}
                                        //      </Link>
                                        // })
                                        <NavLink hrefs={link?.children} 
                                             style="flex items-center p-2 pl-4 border-b border-white"
                                             hover_style="hover:border-b hover:border-orange-800 hover:bg-orange-300"
                                             focus_style="border-b border-orange-800 bg-orange-300"
                                             >

                                        </NavLink>
                                   }
                              </ul>

                              : null
                    }
                   
               </li>
          })
     );
}