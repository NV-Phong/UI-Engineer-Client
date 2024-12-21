'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AlertCircle, FileCode, FileText } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function CodeUploadPage() {
  const [htmlFile, setHtmlFile] = useState<File | null>(null)
  const [cssFile, setCssFile] = useState<File | null>(null)
  const [htmlContent, setHtmlContent] = useState<string>('')
  const [cssContent, setCssContent] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleFileChange = (fileType: 'html' | 'css') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const expectedType = fileType === 'html' ? 'text/html' : 'text/css'
      if (file.type !== expectedType) {
        setError(`Invalid file type. Please upload a ${fileType.toUpperCase()} file.`)
        return
      }
      setError('')
      const reader = new FileReader()
      reader.onload = (event) => {
        const content = event.target?.result as string
        if (fileType === 'html') {
          setHtmlFile(file)
          setHtmlContent(content)
        } else {
          setCssFile(file)
          setCssContent(content)
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Upload HTML and CSS files</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <label htmlFor="html-upload" className="block text-sm font-medium text-gray-700 mb-2">
                Upload HTML File
              </label>
              <div className="flex items-center space-x-2">
                <Button asChild variant="outline">
                  <label htmlFor="html-upload" className="cursor-pointer">
                    <FileCode className="mr-2 h-4 w-4" />
                    Choose HTML File
                  </label>
                </Button>
                <input
                  id="html-upload"
                  type="file"
                  accept=".html"
                  onChange={handleFileChange('html')}
                  className="sr-only"
                />
                {htmlFile && <span className="text-sm text-gray-500">{htmlFile.name}</span>}
              </div>
            </div>
            <div>
              <label htmlFor="css-upload" className="block text-sm font-medium text-gray-700 mb-2">
                Upload CSS File
              </label>
              <div className="flex items-center space-x-2">
                <Button asChild variant="outline">
                  <label htmlFor="css-upload" className="cursor-pointer">
                    <FileText className="mr-2 h-4 w-4" />
                    Choose CSS File
                  </label>
                </Button>
                <input
                  id="css-upload"
                  type="file"
                  accept=".css"
                  onChange={handleFileChange('css')}
                  className="sr-only"
                />
                {cssFile && <span className="text-sm text-gray-500">{cssFile.name}</span>}
              </div>
            </div>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {(htmlContent || cssContent) && (
            <div className="mt-8 [width:1175px]">
              <Tabs defaultValue="preview" className="">
                <TabsList>
                  <TabsTrigger value="preview">Preview</TabsTrigger>
                  <TabsTrigger value="html">HTML</TabsTrigger>
                  <TabsTrigger value="css">CSS</TabsTrigger>
                </TabsList>
                <TabsContent value="preview" className="mt-4">
                  <div className="border rounded-lg p-4 min-h-[300px]">
                    <style>{cssContent}</style>
                    <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
                  </div>
                </TabsContent>
                <TabsContent value="html" className="mt-4">
                  <pre className="border rounded-lg p-4 bg-gray-100 overflow-x-auto">
                    <code>{htmlContent}</code>
                  </pre>
                </TabsContent>
                <TabsContent value="css" className="mt-4">
                  <pre className="border rounded-lg p-4 bg-gray-100 overflow-x-auto">
                    <code>{cssContent}</code>
                  </pre>
                </TabsContent>
              </Tabs>
              <Button variant={'outline'} className='mt-3'>Upload</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}