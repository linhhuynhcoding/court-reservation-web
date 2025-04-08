"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
const LINK_HOVER_STYLE = "hover:border-b-2 hover:text-black hover:font-semibold hover:border-sky-500 hover:text-sky-500 transition-colors";
const LINK_FOCUS_STLYE = "border-b-2 text-black font-semibold border-sky-500 text-sky-500 transition-colors";

export default function NavLink({ hrefs, style, hover_style = LINK_HOVER_STYLE, focus_style = LINK_FOCUS_STLYE }: {
     hrefs: { name: string, href: string }[],
     hover_style?: string,
     focus_style?: string,
     style?: string,

}) {
     const pathname = usePathname();

     return (
          hrefs.map((link, index) => {
               return <li key={index} >
                    <Link
                         className={`${style} ${pathname === link.href ? focus_style : ""} ${hover_style}`}
                         href={link.href}>{link.name}</Link>
               </li>
          })
     );
}