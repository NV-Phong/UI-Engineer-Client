import { Plus, CreditCard, ChevronLeft, ChevronRight, ChevronRightIcon as ChevronNext } from 'lucide-react'
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function BankingCard() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            <h2 className="text-xl font-semibold">My Cards</h2>
          </div>
          <Button variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            Add Card
          </Button>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Card Display */}
          <div className="relative bg-white rounded-lg p-6 border">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 bg-blue-500 rounded-full flex items-center justify-center">
                  <div className="h-4 w-4 bg-white rounded-full" />
                </div>
                <div className="w-4 h-4 flex flex-col justify-between">
                  <div className="h-0.5 bg-gray-400 rounded" />
                  <div className="h-0.5 bg-gray-400 rounded" />
                  <div className="h-0.5 bg-gray-400 rounded" />
                </div>
                <Badge variant="secondary" className="bg-green-100 text-green-700 hover:bg-green-100">
                  Active
                </Badge>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-8 h-8 rounded-full bg-red-500" />
                <div className="w-8 h-8 rounded-full bg-orange-500 opacity-80 -ml-4" />
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <div className="text-gray-600">Savings Card</div>
              <div className="text-3xl font-bold">
                $16,058<span className="text-gray-400">.94</span>
              </div>
            </div>
            <div className="absolute bottom-4 right-4 flex gap-1">
              <Button variant="outline" size="icon" className="h-6 w-6">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" className="h-6 w-6">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Time Period Selector */}
          <Tabs defaultValue="weekly" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
            </TabsList>
          </Tabs>

          {/* Spending Limit */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-4">
              <div className="relative h-12 w-12">
                <svg className="w-full h-full" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#eee"
                    strokeWidth="3"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="3"
                    strokeDasharray="75, 100"
                  />
                </svg>
              </div>
              <div>
                <div className="text-gray-600">Spending Limit</div>
                <div className="text-lg font-semibold">
                  $1,500.00 <span className="text-gray-400 text-sm font-normal">/ week</span>
                </div>
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <ChevronNext className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

