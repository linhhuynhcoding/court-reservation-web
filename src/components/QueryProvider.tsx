"use client";

import { useState } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export function QueryProvider({ children }: { children: React.ReactNode }) {
     const [queryClient] = useState(() => new QueryClient({
          defaultOptions: {
               queries: {
                    staleTime: Infinity,
                    refetchOnWindowFocus: false,
                    refetchOnMount: false,
               },
               
          },
     }));
     return (
          <>
               <QueryClientProvider client={queryClient}>
                    {children}
                    <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
               </QueryClientProvider>
          </>
     )
}