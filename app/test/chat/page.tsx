import Image from "next/image"
import { ArrowLeft, ChevronDown, MoreHorizontal, Plus, Smile, Paperclip, Play } from 'lucide-react'
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function ConferenceChat() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full max-w-md bg-white overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="font-semibold">Conference Meeting</h1>
              <p className="text-sm text-muted-foreground">4h left</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex -space-x-2">
              <Avatar className="border-2 border-white">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
              </Avatar>
              <Avatar className="border-2 border-white">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
              </Avatar>
              <Avatar className="border-2 border-white">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
              </Avatar>
            </div>
            <span className="text-sm text-muted-foreground">+8</span>
          </div>
        </div>

        {/* Time Selection */}
        <div className="flex justify-center p-4 border-b">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">6:00</div>
              <div className="text-sm text-muted-foreground">Sat, Dec 11</div>
            </div>
            <div className="text-2xl text-muted-foreground">→</div>
            <div className="text-center">
              <div className="text-2xl font-bold">7:00</div>
              <div className="text-sm text-muted-foreground">Sat, Dec 11</div>
            </div>
          </div>
        </div>

        {/* Chat Area */}
        <ScrollArea className="h-[400px] p-4">
          <div className="space-y-4">
            {/* Message */}
            <div className="flex items-start gap-2 max-w-[80%]">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
              </Avatar>
              <div className="bg-secondary rounded-2xl p-3">
                <p>It's an evening. Let's do that</p>
                <p className="text-xs text-muted-foreground mt-1">23:40</p>
              </div>
            </div>

            {/* Question Message */}
            <div className="flex items-start gap-2 max-w-[80%]">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
              </Avatar>
              <div className="bg-secondary rounded-2xl p-3">
                <p>Where do we want to meet guys? I need to know before</p>
              </div>
            </div>

            {/* Voice Message */}
            <div className="flex justify-end">
              <div className="bg-primary/10 rounded-2xl p-3 max-w-[80%]">
                <p className="mb-2">Hm ... Let me think</p>
                <div className="flex items-center gap-2 bg-white rounded-full p-2">
                  <Button size="icon" variant="ghost" className="h-6 w-6 rounded-full">
                    <Play className="h-4 w-4" />
                  </Button>
                  <div className="h-0.5 bg-primary/50 w-32 rounded-full" />
                  <span className="text-xs">0:30</span>
                </div>
              </div>
            </div>

            {/* Poll */}
            <div className="flex items-start gap-2 max-w-[80%]">
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
              </Avatar>
              <div className="space-y-2">
                <p>What do you want to eat?</p>
                <div className="space-y-2">
                  <Button variant="outline" className="w-full justify-start">
                    Pizza
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    Burgers
                  </Button>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>8 votes</span>
                  <span>•</span>
                  <button className="text-primary">Vote to see results</button>
                </div>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="border-t p-4">
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost">
              <Plus className="h-4 w-4" />
            </Button>
            <input
              type="text"
              placeholder="Message to Conference Meeting"
              className="flex-1 bg-transparent focus:outline-none"
            />
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost">
                <Smile className="h-4 w-4" />
              </Button>
              <Button size="icon" variant="ghost">
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button className="bg-black text-white hover:bg-black/90">
                Send now
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

