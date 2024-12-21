"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import {
   FaReact,
   FaAndroid,
   FaVuejs,
   FaAngular,
   FaBan,
   FaTerminal,
} from "react-icons/fa"; // Import icons from react-icons

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

import { SiTailwindcss, SiCss3, SiBootstrap } from "react-icons/si";

const frameworks = [
   {
      value: "Tailwind",
      label: "Tailwind",
      icon: <SiTailwindcss color="#38B2AC" />,
      disabled: false,
   },
   {
      value: "CSS",
      label: "CSS",
      icon: <SiCss3 color="#1572B6" />,
      disabled: false,
   },
   {
      value: "Bootstrap",
      label: "Bootstrap",
      icon: <SiBootstrap color="#7952B3" />,
      disabled: true,
   },
];

interface SelectStyleProps {
   value: string;
   onChange: (value: string) => void;
}

export function SelectStyle({ value, onChange }: SelectStyleProps) {
   const [open, setOpen] = React.useState(false);

   const selectedFramework = frameworks.find(
      (framework) => framework.value === value
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
                  "Select style..."
               )}
               <ChevronsUpDown className="opacity-50" />
            </Button>
         </PopoverTrigger>
         <PopoverContent className="w-[250px] p-0">
            <Command>
               <CommandInput placeholder="Search style..." />
               <CommandList>
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                     {frameworks.map((framework) => (
                        <CommandItem
                           key={framework.value}
                           value={framework.value}
                           onSelect={(currentValue) => {
                              if (!framework.disabled) {
                                 onChange(
                                    currentValue === value ? "" : currentValue
                                 );
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
                                 value === framework.value
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
