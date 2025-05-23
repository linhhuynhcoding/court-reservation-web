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
import { Loading } from "@/components/loading";

export const metadata: Metadata = {
  title: "PickleBanh - Nền tảng đặt sân Pickleball siêu rẻ, siêu tiện",
  description: "Đặt sân pickleball nhanh chóng và dễ dàng tại Picklebanh. Tìm sân gần bạn, xem lịch trống theo thời gian thực, đặt chỗ chỉ với vài cú nhấp. Đặt sân ngay hôm nay để không bỏ lỡ trận đấu!",
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
          <QueryProvider>
            <AppProvider>
              <Header />
              {children}
              <Toaster position="bottom-left" richColors />
            </AppProvider>
          </QueryProvider>
          {/* </ThemeProvider> */}
        </body>
      </html>
    </>
  );
}
