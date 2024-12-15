'use client'

import { useState, useCallback } from "react"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { EyeIcon as EyeDropper, Check } from 'lucide-react'

const presetColors = [
  "#000000", "#ef4444", "#f97316", "#f59e0b", "#84cc16", "#22c55e",
  "#06b6d4", "#3b82f6", "#6366f1", "#8b5cf6", "#d946ef", "#ec4899",
]

type ColorFormat = 'hex' | 'rgb' | 'hsl'

export default function IconCustomizer() {
  const [fill, setFill] = useState(false)
  const [fillColor, setFillColor] = useState("#000000")
  const [colorFormat, setColorFormat] = useState<ColorFormat>('hex')

  const handleColorChange = useCallback((color: string) => {
    setFillColor(color)
  }, [])

  const formatColor = useCallback((color: string, format: ColorFormat): string => {
    const ctx = document.createElement('canvas').getContext('2d');
    if (!ctx) return color;

    ctx.fillStyle = color;
    const rgbMatch = ctx.fillStyle.match(/\d+/g);
    if (!rgbMatch || rgbMatch.length < 3) return color;

    const [r, g, b] = rgbMatch.map(Number);

    switch (format) {
      case 'rgb':
        return `rgb(${r}, ${g}, ${b})`;
      case 'hsl':
        const [h, s, l] = rgb2hsl(r, g, b);
        return `hsl(${h}, ${s}%, ${l}%)`;
      default:
        return ctx.fillStyle; // hex
    }
  }, []);

  const rgb2hsl = (r: number, g: number, b: number): [number, number, number] => {
    r /= 255;
    g /= 255;
    b /= 255;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0;
    let s = 0;
    let l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0);
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }

    return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex text-lg justify-center">Customize</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="fill" className="font-medium">Custom Colors</Label>
            <Switch 
              id="fill" 
              checked={fill}
              onCheckedChange={setFill}
            />
          </div>
          <p className="text-sm text-gray-500">Add a custom color to component</p>
          {fill && (
            <div className="flex items-center space-x-2 mt-2">
              <Label htmlFor="fillColor" className="text-sm">Color:</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <button
                    className="w-8 h-8 rounded-md border border-input overflow-hidden shadow-sm"
                    style={{ background: fillColor }}
                  >
                    <span className="sr-only">Pick a color</span>
                  </button>
                </PopoverTrigger>
                <PopoverContent className="w-64">
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Color Picker</span>
                      <button className="text-muted-foreground hover:text-foreground">
                        <EyeDropper className="h-4 w-4" />
                      </button>
                    </div>
                    <div
                      className="w-full aspect-square rounded-md border border-input mb-2 cursor-pointer"
                      style={{
                        background: `linear-gradient(to bottom, transparent, #000),
                                   linear-gradient(to right, #fff, ${fillColor})`
                      }}
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const x = e.clientX - rect.left;
                        const y = e.clientY - rect.top;
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        if (ctx) {
                          ctx.fillStyle = fillColor;
                          ctx.fillRect(0, 0, 1, 1);
                          const imageData = ctx.getImageData(0, 0, 1, 1);
                          const [r, g, b] = imageData.data;
                          const newColor = `rgb(${Math.round(r * (1 - y / rect.height) + 255 * y / rect.height)}, 
                                               ${Math.round(g * (1 - y / rect.height) + 255 * y / rect.height)}, 
                                               ${Math.round(b * (1 - y / rect.height) + 255 * y / rect.height)})`;
                          handleColorChange(newColor);
                        }
                      }}
                    />
                    <input
                      type="range"
                      className="w-full"
                      min="0"
                      max="360"
                      onChange={(e) => {
                        const hue = e.target.value
                        handleColorChange(`hsl(${hue}, 100%, 50%)`)
                      }}
                    />
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        className="flex-1 px-2 py-1 text-sm border rounded-md w-10"
                        value={formatColor(fillColor, colorFormat)}
                        onChange={(e) => handleColorChange(e.target.value)}
                      />
                      <Select value={colorFormat} onValueChange={(value: ColorFormat) => setColorFormat(value)}>
                        <SelectTrigger className="w-[70px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="hex">HEX</SelectItem>
                          <SelectItem value="rgb">RGB</SelectItem>
                          <SelectItem value="hsl">HSL</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid grid-cols-6 gap-1">
                      {presetColors.map((color) => (
                        <button
                          key={color}
                          className={cn(
                            "w-full aspect-square rounded-md border border-input overflow-hidden",
                            "flex items-center justify-center",
                            "transition-colors hover:border-primary"
                          )}
                          style={{ background: color }}
                          onClick={() => handleColorChange(color)}
                        >
                          {color === fillColor && (
                            <Check className="h-4 w-4 text-white" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              <span className="text-sm font-mono">{formatColor(fillColor, colorFormat)}</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Edge</Label>
          <RadioGroup defaultValue="sharp" className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-2 bg-gray-100 rounded-md p-2">
              <RadioGroupItem value="sharp" id="sharp" />
              <Label htmlFor="sharp">Sharp</Label>
            </div>
            <div className="flex items-center space-x-2 bg-gray-100 rounded-md p-2">
              <RadioGroupItem value="rounded" id="rounded" />
              <Label htmlFor="rounded">Rounded</Label>
            </div>
          </RadioGroup>
        </div>

        <div className="space-y-2">
          <Label className="font-medium">Stroke</Label>
          <Slider 
            defaultValue={[1]} 
            max={3} 
            step={0.5} 
            className="w-full" 
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>0.5px</span>
            <span>1px</span>
            <span>2px</span>
            <span>3px</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

