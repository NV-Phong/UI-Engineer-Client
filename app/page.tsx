"use client";
import Header from "@/components/layout/header";
import Particles from "@/components/ui/particles";
import { Spotlight } from "@/components/ui/spotlight";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function Home() {
   const { resolvedTheme } = useTheme();
   const [color, setColor] = useState("#ffffff");

   useEffect(() => {
      setColor(resolvedTheme === "dark" ? "#ffffff" : "#000000");
   }, [resolvedTheme]);

   return (
      <div className="">
         <div className="flex items-center justify-center z-0 h-screen w-full rounded-md bg-background antialiased bg-grid-white/[0.02] relative overflow-hidden">
            <Spotlight
               className="-top-40 left-0 md:left-60 md:-top-20"
               fill="white"
            />
            {/* <Header /> */}
            <div className="flex flex-col items-center justify-center">
               <div className="mb-9 max-w-7xl mx-auto relative z-10 w-full pt-20 md:pt-0 text-center">
                  <h1 className="h-40 text-4xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 bg-opacity-50">
                     UI Engineer
                     <br />
                     The website for front-end developer
                  </h1>
                  <p className="mt-4 font-normal text-base text-neutral-300 max-w-lg mx-auto">
                     Spotlight effect is a great way to draw attention to a
                     specific part of the page. Here, we are drawing the
                     attention towards the text section of the page. I
                     don&apos;t know why but I&apos;m running out of copy.
                  </p>
               </div>
            </div>
            <Particles
               className="absolute inset-0"
               quantity={100}
               ease={80}
               color={color}
               refresh
            />
         </div>
      </div>
   );
}
