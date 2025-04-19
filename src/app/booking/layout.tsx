import { InfoContextProvider } from "./[id]/info-provider";


export default function RootLayout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <>
               <InfoContextProvider>
                    <main className="flex justify-center">
                         {children}
                    </main>
               </InfoContextProvider>
          </>
     );
}
