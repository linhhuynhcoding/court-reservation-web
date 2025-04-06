import { Backgound } from "@/src/components/Backgound";

export default function Layout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <>
               <main className="
               relative z-1 flex flex-col items-center 
               justify-center min-h-screen p-24 ">
                    {children}
               </main>
               <Backgound></Backgound>
          </>
     );
}