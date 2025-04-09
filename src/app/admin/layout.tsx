import NavLink from "@/components/NavLink";

const herfs = [
     { name: 'Dashboard', href: '/admin' },
     { name: 'Court Management', href: '/admin/court' },
     { name: 'About', href: '/admin/about' },
]

export default function Layout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <>
               <div className='grid min-h-screen grid-cols-6'>
                    <aside className='col-span-1' aria-label='Sidebar'>
                         <div className='flex h-full flex-col overflow-y-auherf bg-gray-100 py-4 px-3 shadow-lg'>
                              <ul className='space-y-2'>
                                   <NavLink hrefs={herfs}
                                        hover_style="hover:bg-gray-300 hover:border-1"
                                        focus_style="bg-gray-300 border-1"
                                        style="flex items-center rounded-lg p-2 font-normal text-gray-900 " />
                                   {/* <li>
                                        <Link
                                             herf='/'
                                             
                                             className={({ isActive }) => {
                                                  const activeClass = isActive ? 'bg-gray-300' : ''
                                                  return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`
                                             }}
                                        >
                                             {({ isActive }) => <span className={`ml-3 ${isActive ? 'font-bold' : ''}`}>Dashboard</span>}
                                        </Link>
                                   </li>
                                   <li>
                                        <Link
                                             herf='/students'
                                             className={({ isActive }) => {
                                                  const activeClass = isActive ? 'bg-gray-300' : ''
                                                  return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`
                                             }}
                                        >
                                             {({ isActive }) => <span className={`ml-3 ${isActive ? 'font-bold' : ''}`}>Students</span>}
                                        </Link>
                                   </li>
                                   <li>
                                        <Link
                                             herf='/about'
                                             className={({ isActive }) => {
                                                  const activeClass = isActive ? 'bg-gray-300' : ''
                                                  return `flex items-center rounded-lg ${activeClass} p-2 text-base font-normal text-gray-900 hover:bg-gray-300`
                                             }}
                                        >
                                             {({ isActive }) => <span className={`ml-3 ${isActive ? 'font-bold' : ''}`}>About</span>}
                                        </Link>
                                   </li> */}
                              </ul>
                         </div>
                    </aside>
                    <main className='col-span-5 h-full py-4 px-3'>{children}</main>
               </div>
          </>
     );
}