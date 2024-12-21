"use client";

import React, { useState } from "react";
import {
   SandpackProvider,
   SandpackLayout,
   SandpackCodeEditor,
   SandpackPreview,
   SandpackFileExplorer,
   useSandpack,
   SandpackStack,
} from "@codesandbox/sandpack-react";
import { monokaiPro, githubLight } from "@codesandbox/sandpack-themes";
import {
   Select,
   SelectContent,
   SelectItem,
   SelectTrigger,
   SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Moon, Sun } from "lucide-react";

const initialFiles = {
   "/App.js": `export default function App() {
  return <h1>Hello World</h1>
}`,
   "/styles.css": `body {
  font-family: sans-serif;
  -webkit-font-smoothing: auto;
  -moz-font-smoothing: auto;
  -moz-osx-font-smoothing: grayscale;
  font-smoothing: auto;
  text-rendering: optimizeLegibility;
  font-smooth: always;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
}

h1 {
  font-size: 1.5rem;
}`,
};

const SandpackWrapper = () => {
   const { sandpack } = useSandpack();
   return (
      <SandpackLayout className="rounded-lg overflow-hidden">
         <SandpackFileExplorer className="hidden md:block" />
         <SandpackStack>
            <SandpackCodeEditor showTabs showLineNumbers closableTabs />
            <SandpackPreview />
         </SandpackStack>
      </SandpackLayout>
   );
};

const OnlineCodeEditor = () => {
   const [theme, setTheme] = useState(monokaiPro);

   return (
      <div className="container mx-auto p-4">
         <Card className="w-full bg-background">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
               <CardTitle className="text-2xl font-bold">
						Create Component
               </CardTitle>
               <Select
                  onValueChange={(value) =>
                     setTheme(value === "light" ? githubLight : monokaiPro)
                  }
                  defaultValue="dark"
               >
                  <SelectTrigger className="w-[180px]">
                     <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                     <SelectItem value="dark">
                        <div className="flex items-center space-x-2">
                           <Moon className="w-4 h-4" />
                           <span>Dark Theme</span>
                        </div>
                     </SelectItem>
                     <SelectItem value="light">
                        <div className="flex items-center space-x-2">
                           <Sun className="w-4 h-4" />
                           <span>Light Theme</span>
                        </div>
                     </SelectItem>
                  </SelectContent>
               </Select>
            </CardHeader>
            <CardContent className="pt-4">
               <SandpackProvider
                  template="react"
                  theme={theme}
                  files={initialFiles}
               >
                  <SandpackWrapper />
               </SandpackProvider>
            </CardContent>
         </Card>
      </div>
   );
};

export default OnlineCodeEditor;
