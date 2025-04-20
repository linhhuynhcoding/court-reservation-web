"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

export const queryClient = new QueryClient({
     defaultOptions: {
          queries: {
               staleTime: Infinity,
               refetchOnWindowFocus: false,
               refetchOnMount: true,
          },
     },
});

export function QueryProvider({ children }: { children: React.ReactNode }) {

     return (
          <>
               <QueryClientProvider client={queryClient}>
                    {children}
                    <ReactQueryDevtools initialIsOpen={false}></ReactQueryDevtools>
               </QueryClientProvider>
          </>
     )
}