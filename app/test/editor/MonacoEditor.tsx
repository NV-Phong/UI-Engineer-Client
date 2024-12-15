'use client'

import React, { useState, useCallback, useRef, useEffect } from 'react'
import Editor, { OnMount, OnChange } from '@monaco-editor/react'
import { GripVertical, Play, Folder, Code2, Eye } from 'lucide-react'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileTree } from './file-tree'
import { motion } from "framer-motion"

const themes = [
  { value: 'vs', label: 'Light' },
  { value: 'vs-dark', label: 'Dark' },
  { value: 'hc-black', label: 'High Contrast' },
]

const defaultReactCode = `
import React from 'react';

function App() {
  return (
    <div className="p-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <img className="h-48 w-full object-cover md:w-48" src="/placeholder.svg" alt="Example" />
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">Example Component</div>
          <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">Incredible Rendering</a>
          <p className="mt-2 text-gray-500">This is a simple React component styled with Tailwind CSS.</p>
        </div>
      </div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
`

const initialFileSystem = {
  name: 'project',
  type: 'directory' as const,
  children: [
    {
      name: 'src',
      type: 'directory' as const,
      children: [
        { name: 'App.js', type: 'file' as const },
        { name: 'index.js', type: 'file' as const },
        { name: 'styles.css', type: 'file' as const },
      ],
    },
    { name: 'package.json', type: 'file' as const },
    { name: 'README.md', type: 'file' as const },
  ],
}

export default function OnlineEditor() {
  const [code, setCode] = useState(defaultReactCode)
  const [output, setOutput] = useState('')
  const [theme, setTheme] = useState('vs-dark')
  const [fileSystem, setFileSystem] = useState(initialFileSystem)
  const [currentFile, setCurrentFile] = useState('/project/src/App.js')
  const iframeRef = useRef<HTMLIFrameElement>(null)

  const handleEditorDidMount: OnMount = (editor) => {
    editor.focus()
  }

  const handleEditorChange: OnChange = useCallback((value) => {
    setCode(value || '')
  }, [])

  const compileAndRun = useCallback(() => {
   if (iframeRef.current) {
     const iframe = iframeRef.current;
     const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
 
     if (iframeDoc) {
       iframeDoc.open();
       iframeDoc.write(`
         <html>
           <head>
             <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
             <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
             <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
             <script src="https://cdn.tailwindcss.com"></script>
           </head>
           <body>
             <div id="root"></div>
             <script type="text/babel">
               ${code}
             </script>
           </body>
         </html>
       `);
       iframeDoc.close();
     }
   }
 }, [code]);
 

  const handleRunCode = useCallback(() => {
    try {
      compileAndRun()
      setOutput('React component rendered successfully!')
    } catch (error) {
      setOutput(String(error))
    }
  }, [compileAndRun])

  const handleThemeChange = useCallback((value: string) => {
    setTheme(value)
  }, [])

  const handleSelectFile = useCallback((path: string) => {
    setCurrentFile(path)
    // In a real application, you would load the file content here
    setCode(`// Content of ${path}\n\n${defaultReactCode}`)
  }, [])

  useEffect(() => {
    compileAndRun()
  }, [compileAndRun])

  return (
    <div className="h-screen bg-background p-4">
      <ResizablePanelGroup direction="horizontal" className="h-full rounded-lg border">
        <ResizablePanel defaultSize={20} minSize={15}>
          <Card className="h-full rounded-none border-0">
            <CardHeader className="p-2">
              <CardTitle className="text-lg flex items-center">
                <Folder className="mr-2" size={18} />
                File Explorer
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2">
              <FileTree data={fileSystem} onSelectFile={handleSelectFile} currentFile={currentFile} />
            </CardContent>
          </Card>
        </ResizablePanel>
        <ResizableHandle withHandle>
          <GripVertical className="h-4 w-4" />
        </ResizableHandle>
        <ResizablePanel defaultSize={40} minSize={30}>
          <Card className="h-full rounded-none border-0">
            <CardHeader className="p-2 flex flex-row items-center justify-between">
              <CardTitle className="text-lg flex items-center">
                <Code2 className="mr-2" size={18} />
                Editor: {currentFile.split('/').pop()}
              </CardTitle>
              <div className="flex items-center space-x-2">
                <Select value={theme} onValueChange={handleThemeChange}>
                  <SelectTrigger className="w-[150px]">
                    <SelectValue placeholder="Select theme" />
                  </SelectTrigger>
                  <SelectContent>
                    {themes.map((theme) => (
                      <SelectItem key={theme.value} value={theme.value}>
                        {theme.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button onClick={handleRunCode} size="sm" className="flex items-center">
                  <Play className="mr-1" size={14} />
                  Run
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0 border-t">
              <Editor
                height="calc(100vh - 160px)"
                defaultLanguage="javascript"
                value={code}
                onChange={handleEditorChange}
                onMount={handleEditorDidMount}
                theme={theme}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  padding: { top: 16 },
                }}
                className="border-0"
              />
            </CardContent>
          </Card>
        </ResizablePanel>
        <ResizableHandle withHandle>
          <GripVertical className="h-4 w-4" />
        </ResizableHandle>
        <ResizablePanel defaultSize={40} minSize={30}>
          <Card className="h-full rounded-none border-0">
            <CardHeader className="p-2">
              <CardTitle className="text-lg flex items-center">
                <Eye className="mr-2" size={18} />
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="p-2 border-t">
              <Tabs defaultValue="preview" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="console">Console</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="border rounded-md mt-2">
                  <div className="bg-white rounded-md overflow-hidden">
                    <iframe ref={iframeRef} title="preview" className="w-full h-[calc(100vh-240px)] border-0" />
                  </div>
                </TabsContent>
                <TabsContent value="console" className="border rounded-md p-4 mt-2 bg-black text-green-400 font-mono text-sm">
                  <pre className="overflow-auto h-[calc(100vh-240px)]">
                    {output || 'Console output will appear here after running the code.'}
                  </pre>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  )
}

