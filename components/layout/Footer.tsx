import React from "react";
import { RainbowButton } from "../ui/rainbow-button";

export default function Footer() {
   return (
      <div>
         <footer className="px-7 py-10 md:px-10">
            <div className="mx-auto flex max-w-6xl flex-col gap-x-5 gap-y-10 md:items-start md:justify-between lg:flex-row lg:px-10 xl:px-0">
               {/* Logo and description */}
               <div className="flex w-full flex-col items-start justify-start gap-y-5 md:w-1/2 lg:w-1/3">
                  <a href="/" className="flex items-center gap-x-2">
                     <img
                        className="h-8 w-8 rounded-md"
                        src="https://i.pinimg.com/280x280_RS/e8/aa/2c/e8aa2c902ba02c55efa670a4ee6aa98c.jpg"
                        alt="Magic UI Logo"
                     />
                     <h2 className="font-bold text-neutral-900 dark:text-white">
                        UI Engineer
                     </h2>
                  </a>
                  <p className="tracking-tight text-neutral-900 dark:text-white">
                     UI library for Design Engineers
                  </p>
               </div>

               {/* Navigation Links */}
               <div className="mt-2.5 flex items-center justify-start gap-x-10">
                  <ul className="flex flex-col gap-y-2">
                     {["About", "Contact", "Blog", "Story"].map((item) => (
                        <li
                           key={item}
                           className="text-[15px]/normal font-medium text-neutral-400 transition-all duration-100 ease-linear hover:text-neutral-900 hover:underline hover:underline-offset-4 dark:text-neutral-400 hover:dark:text-neutral-100"
                        >
                           <a href="#">{item}</a>
                        </li>
                     ))}
                  </ul>
                  <ul className="flex flex-col gap-y-2">
                     {["Company", "Product", "Press", "More"].map((item) => (
                        <li
                           key={item}
                           className="text-[15px]/normal font-medium text-neutral-400 transition-all duration-100 ease-linear hover:text-neutral-900 hover:underline hover:underline-offset-4 dark:text-neutral-400 hover:dark:text-neutral-100"
                        >
                           <a href="#">{item}</a>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* Contact Section */}
               <div className="mt-2.5 flex items-center justify-between">
                  <div className="flex flex-col gap-y-1">
                     <p className="text-lg font-bold">Contact us</p>
                     <p className="font-normal text-neutral-500 dark:text-neutral-400">
                        We have a great support team to help you
                     </p>
                     <div className="flex items-center gap-x-2 pt-2">
                        <form className="flex items-center gap-x-2">
                           <input
                              className="w-full rounded-lg border bg-neutral-50 p-2 placeholder:text-sm placeholder:text-neutral-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300 focus-visible:ring-offset-0 dark:bg-neutral-900 dark:placeholder:text-neutral-600 dark:focus-visible:ring-neutral-700"
                              placeholder="Email Address"
                              required
                              type="email"
                           />
                           {/* <button
                              type="submit"
                              className="w-48 rounded-lg bg-neutral-900 px-5 py-2 text-white transition-all ease-out hover:ring-1 hover:ring-neutral-800 hover:ring-offset-2 hover:ring-offset-current active:scale-95 dark:bg-white dark:text-neutral-900 dark:hover:ring-neutral-50"
                           >
                              Subscribe
                           </button> */}

                           <RainbowButton
                              type="submit"
                              className="active:scale-95 hover:ring-1 hover:ring-neutral-800 hover:ring-offset-2 hover:ring-offset-current"
                           >
                              Subscribe
                           </RainbowButton>
                        </form>
                     </div>
                  </div>
               </div>
            </div>
         </footer>
      </div>
   );
}
