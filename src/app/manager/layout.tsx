import NavLink from "@/components/NavLink";

const herfs = [
     { name: 'Trang chủ', href: '/manager' },
     {
          name: 'Booking', href: '/manager/booking', children: [
               { name: 'Add Organisation', href: '/manager/court/   ' },
               { name: 'Add Organisation', href: '/manager/court/   ' },
               { name: 'Add Organisation', href: '/manager/court/   ' },
          ]
     },
     { name: 'Thông tin', href: '/manager/about' },
]

export default function Layout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <>
               <div className='grid min-h-screen grid-cols-6'>
                    <aside className='z-1 col-span-1' aria-label='Sidebar'>
                         <div className='flex h-full flex-col white py-4 px-3 shadow-lg'>
                              <ul className='space-y-2'>
                                   <NavLink hrefs={herfs}
                                        hover_style="hover:bg-orange-300 hover:text-white rounded-sm"
                                        focus_style="bg-orange-400 text-white  rounded-sm"
                                        style="flex items-center p-2 pl-3 font-semibold" />
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
                    <main className='col-span-5 h-full py-4 px-3 bg-gray-50'>{children}</main>
               </div>
          </>
     );
}