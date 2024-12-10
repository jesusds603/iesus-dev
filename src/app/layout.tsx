import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LanguageProvider from "@/hooks/useLanguage";
import MenuProvider from "@/hooks/useMenu";
import ThemeProvider from "@/hooks/useTheme";
import LayoutContent from "./LayoutContent";
import HeaderApp from "@/components/HeaderApp";
import { ShipProvider } from "../hooks/useShip";
import { SphereProvider } from "../hooks/useSphere";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Iesus Dev",
  description:
    "I'm a Mathematician, Web and App Developer, and Data Analyst. I specialize in Next.js, React, React Native, Python for data analysis, SQL, and 3D development with Three.js.",
  robots: {
    index: true,
    follow: true,
  },
  keywords: [
    "Mathematics",
    "Web Development",
    "App Development",
    "Next.js",
    "React",
    "React Native",
    "Data Analysis",
    "Python",
    "SQL",
    "Three.js",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider>
      <MenuProvider>
        <LanguageProvider>
          <ShipProvider>
            <SphereProvider>
              <html lang="en">
                <body
                  className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >
                  <HeaderApp />
                  <LayoutContent> {children}</LayoutContent>
                </body>
              </html>
            </SphereProvider>
          </ShipProvider>
        </LanguageProvider>
      </MenuProvider>
    </ThemeProvider>
  );
}
