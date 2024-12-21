import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface IdeaCardProps {
  ideaName: string
  ideaDescription: string
  ideaURL?: string
}

export function IdeaCard({ ideaName, ideaDescription, ideaURL }: IdeaCardProps) {
  return (
    <Card className="w-full mb-4">
      <CardHeader>
        <CardTitle>{ideaName}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-2">{ideaDescription}</p>
        {ideaURL && (
          <div className="mt-2 p-2 bg-gray-100 rounded-md">
            <div dangerouslySetInnerHTML={{ __html: ideaURL }} />
          </div>
        )}
      </CardContent>
    </Card>
  )
}

