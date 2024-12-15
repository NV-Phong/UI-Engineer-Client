import React, { useState } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const initialFiles = {
  "/App.js": `export default function App() {
  return <h1>Hello, Sandpack!</h1>
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
    <SandpackLayout>
      <SandpackFileExplorer />
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
      <h1 className="text-2xl font-bold mb-4">Online Code Editor</h1>
      <div className="mb-4">
        <Select onValueChange={(value) => setTheme(value === 'light' ? githubLight : monokaiPro)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select theme" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dark">Dark Theme</SelectItem>
            <SelectItem value="light">Light Theme</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <SandpackProvider 
        template="react" 
        theme={theme}
        files={initialFiles}
      >
        <SandpackWrapper />
      </SandpackProvider>
    </div>
  );
};

export default OnlineCodeEditor;

