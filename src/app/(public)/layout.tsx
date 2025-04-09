import { useAppContext } from "@/components/app-provider";
import { FooterWithSocialLinks } from "@/components/FooterWithSocialLinks";
import Header from "@/components/Header";

export default function RootLayout({
     children,
}: Readonly<{
     children: React.ReactNode;
}>) {
     return (
          <>
               {children}
               <FooterWithSocialLinks></FooterWithSocialLinks>

          </>
     );
}
