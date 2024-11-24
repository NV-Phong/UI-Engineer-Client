import React, { ReactNode } from "react";

interface WhiteRainbowButtonProps {
   children: ReactNode;
   size?: "small" | "medium" | "large";
}

export default function WhiteRainbowButton({
   children,
   size = "medium",
}: WhiteRainbowButtonProps) {
   const sizeClasses = {
      small: "h-6 px-4 text-xs",
      medium: "h-10 px-6 text-sm",
      large: "h-12 px-8 text-lg",
   };

   return (
      <div>
         <a
            className={`active:scale-95 inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 group relative animate-rainbow border-input shadow-sm cursor-pointer border-0 bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] dark:bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] bg-[length:200%] text-foreground [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] before:absolute before:bottom-[-20%] before:left-1/2 before:z-[0] before:h-[20%] before:w-[60%] before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))] ${sizeClasses[size]} rounded-full gap-2`}
            href="/auth"
         >
            {children}
            <svg
               xmlns="http://www.w3.org/2000/svg"
               width="32"
               height="32"
               viewBox="0 0 24 24"
               fill="none"
               stroke="currentColor"
               strokeWidth="2"
               strokeLinecap="round"
               strokeLinejoin="round"
               className="ml-1 h-4 w-4 text-muted-foreground"
            >
               <path d="m9 18 6-6-6-6"></path>
            </svg>
         </a>
      </div>
   );
}
