import type { Metadata } from "next";
import "./globals.css";

// Import Components
import Header from "@/components/Header";
import { FooterWithSocialLinks } from "@/components/FooterWithSocialLinks";
import { QueryProvider } from "../components/QueryProvider";
import { Toaster } from "@/components/ui/sonner"
import { AccountResType, AccountType } from "../schemas/account.schema";
import authApi from "../apis/auth";
import { cookies } from "next/headers";
import { handleErrorApi } from "../lib/utils";
import { AppProvider } from "../components/app-provider";
import { ThemeProvider } from "next-themes";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <html lang="en" className="mdl-js">
        <body
          data-new-gr-c-s-check-loaded="14.1229.0"
          data-gr-ext-installed=""
          className="text-sm items-center"
        >
          {/* <ThemeProvider> */}
            <AppProvider>
              <QueryProvider>
                <Header />
                {children}
              </QueryProvider>
            </AppProvider>
          {/* </ThemeProvider> */}
          <Toaster position="bottom-left" richColors />
        </body>
      </html>
    </>
  );
}
