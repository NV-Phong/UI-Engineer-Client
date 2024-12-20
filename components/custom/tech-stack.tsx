"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { FaReact, FaAndroid, FaVuejs, FaAngular } from "react-icons/fa"; // Import icon từ react-icons

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
   Command,
   CommandEmpty,
   CommandGroup,
   CommandInput,
   CommandItem,
   CommandList,
} from "@/components/ui/command";
import {
   Popover,
   PopoverContent,
   PopoverTrigger,
} from "@/components/ui/popover";
import { SiFlutter } from "react-icons/si";

const frameworks = [
   {
      value: "next.js",
      label: "Next.JS",
      icon: <FaReact color="#61DAFB" />,
      disabled: false,
   },
   {
      value: "flutter",
      label: "Flutter",
      icon: <SiFlutter color="#02569B" />,
      disabled: false,
   },
   {
      value: "vue.js",
      label: "Vue.JS",
      icon: <FaVuejs color="#42B883" />,
      disabled: true,
   },
   {
      value: "angular",
      label: "Angular",
      icon: <FaAngular color="#DD0031" />,
      disabled: true,
   },
];

interface TechStackProps {
   value: string[]; // Change value to an array of strings
   onChange: (value: string[]) => void; // onChange still expects an array
}

export function TechStack({ value, onChange }: TechStackProps) {
   const [open, setOpen] = React.useState(false);

   const selectedFramework = frameworks.find(
      (framework) => framework.value === value[0] // Use the first item in the array
   );

   return (
      <Popover open={open} onOpenChange={setOpen}>
         <PopoverTrigger asChild>
            <Button
               variant="outline"
               role="combobox"
               aria-expanded={open}
               className="justify-between"
            >
               {selectedFramework ? (
                  <span className="flex items-center">
                     <span className="mr-2">{selectedFramework.icon}</span>
                     {selectedFramework.label}
                  </span>
               ) : (
                  "Select framework..."
               )}
               <ChevronsUpDown className="opacity-50" />
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-[250px] p-0">
            <Command>
               <CommandInput placeholder="Search framework..." />
               <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                     {frameworks.map((framework) => (
                        <CommandItem
                           key={framework.value}
                           value={framework.value}
                           onSelect={(currentValue) => {
                              if (!framework.disabled) {
                                 onChange([currentValue]);
                                 setOpen(false);
                              }
                           }}
                           className={cn(
                              framework.disabled ? "cursor-not-allowed" : ""
                           )}
                        >
                           <span className="flex items-center w-full">
                              <span className="mr-2">{framework.icon}</span>
                              <span className="flex-1">{framework.label}</span>
                              {framework.disabled && (
                                 <span className="text-xs text-[#85dacc] ml-2">
                                    Is Coming
                                 </span>
                              )}
                           </span>
                           <Check
                              className={cn(
                                 "ml-auto",
                                 value[0] === framework.value
                                    ? "opacity-100"
                                    : "opacity-0"
                              )}
                           />
                        </CommandItem>
                     ))}
                  </CommandGroup>
               </CommandList>
            </Command>
         </PopoverContent>
      </Popover>
   );
}
