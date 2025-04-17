

export default function RootLayout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <>
               <main className="flex justify-center">
                    {children}
               </main>
          </>
     );
}
