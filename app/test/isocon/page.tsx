import { Search, Filter, ExternalLink, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import IconGrid from './icon-grid'
import IconCustomizer from './icon-customizer'

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="container mx-auto px-4 py-8">
        <div className="flex gap-8 mb-8">
          <div className="w-64 space-y-6">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full justify-between">
                  Categories
                  <ChevronDown className="h-4 w-4 opacity-50" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuItem>UI Actions</DropdownMenuItem>
                <DropdownMenuItem>Devices</DropdownMenuItem>
                <DropdownMenuItem>Shapes</DropdownMenuItem>
                <DropdownMenuItem>Tools</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <IconCustomizer />
          </div>

          <div className="flex-1">
            <div className="flex gap-4 mb-8">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input 
                  className="pl-10" 
                  placeholder="Search by descriptors like 'add', or 'check'" 
                />
              </div>
              <Button variant="outline">
                Checkout
              </Button>
            </div>

            <Tabs defaultValue="ui-actions" className="mb-8">
              <TabsList>
                <TabsTrigger value="ui-actions">UI Actions</TabsTrigger>
                <TabsTrigger value="devices">Devices</TabsTrigger>
                <TabsTrigger value="shapes">Shapes</TabsTrigger>
                <TabsTrigger value="tools">Tools</TabsTrigger>
              </TabsList>
              <TabsContent value="ui-actions">
                <IconGrid />
              </TabsContent>
              <TabsContent value="devices">Device icons content</TabsContent>
              <TabsContent value="shapes">Shape icons content</TabsContent>
              <TabsContent value="tools">Tool icons content</TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
    </div>
  )
}

