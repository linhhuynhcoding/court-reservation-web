"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
const LINK_HOVER_STYLE = "hover:border-b-2 hover:text-black hover:font-semibold hover:border-sky-500 hover:text-sky-500 transition-colors";
const LINK_FOCUS_STLYE = "border-b-2 text-black font-semibold border-sky-500 text-sky-500 transition-colors";

export default function NavLink({ hrefs }: {
     hrefs: { name: string, href: string }[]
}) {
     const pathname = usePathname();

     return (
          hrefs.map((link, index) => {
               return <li key={index} >
                    <Link 
                    className={`font-light ${pathname === link.href ? LINK_FOCUS_STLYE : ""} ${LINK_HOVER_STYLE}`}  
                    href={link.href}>{link.name}</Link>
               </li>
          })
     );
}