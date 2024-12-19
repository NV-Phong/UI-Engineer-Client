"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const tabs = ["home", "about", "project", "blog", "test", "auth"];

export default function Header() {
   const [activeTab, setActiveTab] = useState("home");
   const router = useRouter();

   const handleTabClick = (tab: string) => {
      setActiveTab(tab);
      router.push(tab === "home" ? "/" : `/${tab}`);
   };

   return (
      <div>
         <header className="fixed top-0 left-0 w-full py-3 rounded-full mb-60 z-50">
            <div className="mx-auto flex w-full items-center justify-center">
               <div className="relative flex w-fit items-center rounded-full border p-1.5 bg-black/33 backdrop-blur-[9px]">
                  <span className="absolute inset-x-0 w-2/4 mx-auto -top-px bg-gradient-to-r from-transparent via-white/30 to-transparent h-px" />
                  {/* <span className="absolute inset-x-0 w-2/4 mx-auto mr-10 -bottom-px bg-gradient-to-r from-transparent via-white/30 to-transparent h-px" /> */}
                  {tabs.map((tab) => (
                     <button
                        key={tab}
                        className={`relative z-[1] px-4 py-2 ${
                           activeTab === tab
                              ? "border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-2 rounded-full"
                              : "text-primary/60"
                        }`}
                        onClick={() => handleTabClick(tab)}
                     >
                        <span
                           className={`${
                              activeTab === tab
                                 ? "absolute inset-x-0 w-1/2 mx-auto -bottom-px bg-gradient-to-r from-transparent via-blue-500 to-transparent  h-px"
                                 : ""
                           }`}
                        />
                        <span className="relative block text-sm font-medium transition-colors duration-200 hover:text-primary tracking-tight">
                           {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </span>
                     </button>
                  ))}
               </div>
            </div>
         </header>
      </div>
   );
}
