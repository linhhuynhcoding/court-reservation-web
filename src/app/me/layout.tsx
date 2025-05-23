import { NavBar } from "./nav-bar"

export const metadata = {
  title: 'Next.js',
  description: 'Generated by Next.js',
}


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <main className="flex justify-center w-full p-5">
      <div className="w-[60%] flex justify-between gap-4 min-h-[800px]">
        <NavBar></NavBar>
        <div className="w-full basis-2/3 border rounded-lg">
          {children}
        </div>
      </div>
    </main>
  )
}
