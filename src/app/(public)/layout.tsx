import { useAppContext } from "@/src/components/app-provider";
import { FooterWithSocialLinks } from "@/src/components/FooterWithSocialLinks";
import Header from "@/src/components/Header";

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
