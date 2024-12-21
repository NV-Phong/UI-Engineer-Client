"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import UploadCode from "@/components/custom/upload-code"
import useGetComponentsByUILibrary from "@/hooks/workspace/component/get-component"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ChevronLeft, AlertCircle } from 'lucide-react'
import { CodeModal } from "@/components/custom/CodeModal"

export default function UILibrary({
  params,
}: {
  params: Promise<{ uilibrary: string }>
}) {
  const [uilibrary, setUILibrary] = useState<string>("")
  const { data, loading, error } = useGetComponentsByUILibrary(uilibrary)
  const router = useRouter()

  useEffect(() => {
    const fetchUILibrary = async () => {
      const result = await params
      setUILibrary(result.uilibrary)
    }

    fetchUILibrary()
  }, [params])

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="container mx-auto">
      <UploadCode />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {data?.map((component) => (
          <Card key={component._id} className="overflow-hidden">
            <CardHeader>
              <CardTitle>{component.componentName}</CardTitle>
              <CardDescription>{component.componentDescription}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-100 p-4 rounded-md mb-4">
                <div
                  dangerouslySetInnerHTML={{
                    __html: component.codeHTML,
                  }}
                />
                <style>{component.codeCSS}</style>
              </div>
            </CardContent>
            <CardFooter>
              <CodeModal
                componentName={component.componentName}
                htmlCode={component.codeHTML}
                cssCode={component.codeCSS}
              />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="container mx-auto py-8">
      <Skeleton className="h-8 w-32 mb-4" />
      <Skeleton className="h-12 w-64 mb-2" />
      <Skeleton className="h-4 w-48 mb-8" />
      <Skeleton className="h-32 w-full mb-8" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <Card key={index} className="overflow-hidden">
            <CardHeader>
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-4 w-full" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-32 w-full mb-4" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-32" />
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}

