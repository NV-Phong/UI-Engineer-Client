import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";
import { MusicPlayer } from "@/components/custom/music-player";
import HeaderDisplay from "@/components/custom/header-display";

export const metadata: Metadata = {
   title: "UI Engineer",
   description: "Generated by NV-Phong",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en" className="scrollbar-hide selection:bg" suppressHydrationWarning>
         <body >
            <ThemeProvider
               attribute="class"
               defaultTheme="dark"
               enableSystem
               disableTransitionOnChange
            >
               <HeaderDisplay />
               {children}
               <Toaster />
               <MusicPlayer />
            </ThemeProvider>
         </body>
      </html>
   );
}
