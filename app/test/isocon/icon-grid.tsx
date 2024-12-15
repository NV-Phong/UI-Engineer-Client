'use client'

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Clipboard } from 'lucide-react'

const ICONS = [
  { id: '123', name: '123'},
  { id: 'abc', name: 'ABC' },
  { id: 'action-key', name: 'ACTION KEY' },
  { id: 'acute', name: 'ACUTE' },
  { id: 'add-box', name: 'ADD BOX' },
  { id: 'add-circle', name: 'ADD CIRCLE' },
  { id: 'add-task', name: 'ADD TASK' },
  { id: 'all-match', name: 'ALL MATCH' },
  { id: 'alt-clock-45', name: 'ALT CLOCK LOADER 45' },
  { id: 'alt-clock-60', name: 'ALT CLOCK LOADER 60' },
  { id: 'alt-clock-90', name: 'ALT CLOCK LOADER 90' },
  { id: 'amend', name: 'AMEND' },
  { id: 'app-badging', name: 'APP BADGING' },
  { id: 'app-registration', name: 'APP REGISTRATION' },
  { id: 'apps', name: 'APPS' },
]

export default function IconGrid() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4">
      {ICONS.map((icon) => (
        <Card key={icon.id} className="p-4 hover:border-purple-500 cursor-pointer transition-all duration-300 group">
          
          <div className="aspect-square mb-2 flex items-center justify-center relative">
            <div className="w-16 h-16 bg-purple-100 rounded-lg" />
            <Button 
              size="icon" 
              variant="ghost" 
              className="absolute top-0 right-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              {/* <Download className="h-4 w-4" /> */}
              <Clipboard />
              
            </Button>
          </div>
            {/* <Input placeholder="Enter your text"></Input> */}
          <div className="text-xs text-center text-gray-600 group-hover:text-purple-600 transition-colors">{icon.name}</div> 
        </Card>
      ))}
    </div>
  )
}

