import type { Metadata } from "next";
import { Playfair_Display, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Preloader from "@/components/Preloader";
import { Providers } from "./providers";
import AIAssistant from "@/components/Bot";

const playfairDisplay = Playfair_Display({ subsets: ['cyrillic'] });
const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata: Metadata = {
  title: "SkillsConnect",
  description: "It's just for fun",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfairDisplay.className} ${poppins.className} bg-[#000] overflow-y-scroll overflow-x-hidden`}
      >
        <Preloader />
        <Providers>
        <Navbar/>
          {children}
          <AIAssistant/>
        </Providers>
        <Footer />
      </body>
    </html>
  );
}