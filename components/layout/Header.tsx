"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const tabs = ["home", "about", "services", "contact","test", "auth"];

export default function Header() {
   const [activeTab, setActiveTab] = useState("home");
   const router = useRouter();

   const handleTabClick = (tab: string) => {
      setActiveTab(tab);
      router.push(tab === "home" ? "/" : `/${tab}`);
   };

   return (
      <div>
         <header className="fixed top-0 left-0 w-full z-10 py-3 rounded-full">
            <div className="mx-auto flex w-full items-center justify-center">
               <div className="relative flex w-fit items-center rounded-full border p-1.5 bg-white/50 backdrop-blur-md">
                  {tabs.map((tab) => (
                     <button
                        key={tab}
                        className={`relative z-[1] px-4 py-2 ${
                           activeTab === tab
                              ? "text-primary bg-white rounded-full"
                              : "text-primary/60"
                        }`}
                        onClick={() => handleTabClick(tab)}
                     >
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
