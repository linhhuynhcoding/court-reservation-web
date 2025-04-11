import React from 'react'

export default function Layout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <div className='grid min-h-screen grid-cols-4 p-10 gap-6'>
               <aside className='col-span-1 border-b'>
                    <div className='border-b pb-8'>
                         <h2 className='text-xl font-light '>BỘ LỌC</h2>
                    </div>
                    <div className='border-b pt-4 pb-8'>
                         <h2 className='text-lg font-semibold '>CHỌN GIÁ</h2>
                    </div>
               </aside>
               <main className='col-span-3 pl-4'>
                    {children}
               </main>
          </div>
     )}