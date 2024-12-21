import { useState } from "react";
import {
   Dialog,
   DialogContent,
   DialogHeader,
   DialogTitle,
   DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Code, Copy, Download } from "lucide-react";

interface CodeModalProps {
   componentName: string;
   htmlCode: string;
   cssCode: string;
}

export function CodeModal({
   componentName,
   htmlCode,
   cssCode,
}: CodeModalProps) {
   const [isOpen, setIsOpen] = useState(false);

   const copyToClipboard = (code: string) => {
      navigator.clipboard.writeText(code).then(() => {
         alert("Code copied to clipboard!");
      });
   };

   const downloadFile = (code: string, fileName: string) => {
      const blob = new Blob([code], { type: "text/plain" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();
   };

   return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
         <DialogTrigger asChild>
            <Button variant="outline" onClick={() => setIsOpen(true)}>
               <Code className="mr-2 h-4 w-4" /> View Code
            </Button>
         </DialogTrigger>
         <DialogContent className="sm:max-w-[600px] max-h-[80vh] overflow-auto flex flex-col scrollbar-hide">
            <DialogHeader>
               <DialogTitle>{componentName} Code</DialogTitle>
            </DialogHeader>
            <Tabs defaultValue="html">
               <TabsList>
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="css">CSS</TabsTrigger>
               </TabsList>
               <TabsContent value="html" className="flex-1 overflow-auto">
                  <div className="relative">
                     <pre className="bg-gray-100 p-4 rounded-md h-full">
                        <code className="block whitespace-pre-wrap">
                           {htmlCode}
                        </code>
                     </pre>
                     <Button
                        variant="ghost"
                        className="absolute top-2 right-2 p-2"
                        onClick={() => copyToClipboard(htmlCode)}
                     >
                        <Copy className="h-4 w-4" />
                     </Button>
                     <Button
                        variant="ghost"
                        className="absolute top-10 right-2 p-2"
                        onClick={() =>
                           downloadFile(htmlCode, `${componentName}.html`)
                        }
                     >
                        <Download className="h-4 w-4" />
                     </Button>
                  </div>
               </TabsContent>
               <TabsContent value="css" className="flex-1 overflow-auto">
                  <div className="relative">
                     <pre className="bg-gray-100 p-4 rounded-md h-full">
                        <code className="block whitespace-pre-wrap">
                           {cssCode}
                        </code>
                     </pre>
                     <Button
                        variant="ghost"
                        className="absolute top-2 right-2 p-2"
                        onClick={() => copyToClipboard(cssCode)}
                     >
                        <Copy className="h-4 w-4" />
                     </Button>
                     <Button
                        variant="ghost"
                        className="absolute top-10 right-2 p-2"
                        onClick={() =>
                           downloadFile(cssCode, `${componentName}.css`)
                        }
                     >
                        <Download className="h-4 w-4" />
                     </Button>
                  </div>
               </TabsContent>
            </Tabs>
         </DialogContent>
      </Dialog>
   );
}
