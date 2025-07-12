"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, Palette, Circle, Sparkles } from "lucide-react"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Cpu } from "lucide-react"

export default function ImagePage() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedModel, setSelectedModel] = useState("Flux")
  const [aspectRatio, setAspectRatio] = useState("1:1")
  const [numImages, setNumImages] = useState("1")

  const models = [
    { value: "chatgpt-image", label: "ChatGPT Image", description: "Advanced AI image generation" },
    { value: "imagen-4", label: "Imagen 4", description: "Google's latest image model" },
    { value: "flux", label: "Flux", description: "High-quality image generation" },
  ]

  const handleGenerate = async () => {
    if (prompt.trim()) {
      setIsGenerating(true)
      setTimeout(() => {
        setIsGenerating(false)
        console.log("Generating image with prompt:", prompt)
        console.log("Using model:", selectedModel)
      }, 3000)
    }
  }

  const styleOptions = [
    { icon: Palette, label: "Style", active: true },
    { icon: ImageIcon, label: "Image prompt", active: true },
    { icon: Circle, label: "Image style", active: true },
  ]


  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-5xl space-y-6 sm:space-y-8 px-4 sm:px-0">
        {/* Header */}
        <div className="text-center px-4">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-400 flex items-center justify-center">
              <ImageIcon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">Image</h1>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200 p-4 sm:p-6 lg:p-8">
          <div className="space-y-4 sm:space-y-6">
            {/* Top Controls Row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
              {/* Model Selection */}
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Cpu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="w-full sm:w-48 h-8 sm:h-9 bg-white/80 backdrop-blur-sm border border-gray-200/50  text-xs sm:text-sm font-medium hover:bg-white/90 focus:bg-white/90">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm border border-gray-200/50 shadow-xl">
                      {models.map((model) => (
                        <SelectItem
                          key={model.value}
                          value={model.label}
                          className="cursor-pointer hover:bg-gray-50/80 focus:bg-gray-50/80  mx-1 my-0.5"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium text-sm">{model.label}</span>
                            {/* <span className="text-xs text-gray-500">{model.description}</span> */}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-sm font-medium text-gray-600">Aspect:</span>
                  <Select value={aspectRatio} onValueChange={setAspectRatio}>
                    <SelectTrigger className="w-full sm:w-32 h-8 sm:h-9 bg-white/80 backdrop-blur-sm border border-gray-200/50  text-xs sm:text-sm font-medium hover:bg-white/90 focus:bg-white/90">
                      <SelectValue placeholder="Aspect ratio" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm border border-gray-200/50 shadow-xl">
                      {["1:1", "9:16", "16:9"].map((ratio) => (
                        <SelectItem
                          key={ratio}
                          value={ratio}
                          className="cursor-pointer hover:bg-gray-50/80 focus:bg-gray-50/80  mx-1 my-0.5"
                        >
                          <span className="font-medium text-sm">{ratio}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center gap-2 sm:gap-3">
                  <span className="text-sm font-medium text-gray-600">Images:</span>
                  <Select value={numImages} onValueChange={setNumImages}>
                    <SelectTrigger className="w-full sm:w-32 h-8 sm:h-9 bg-white/80 backdrop-blur-sm border border-gray-200/50  text-xs sm:text-sm font-medium hover:bg-white/90 focus:bg-white/90">
                      <SelectValue placeholder="# of images" />
                    </SelectTrigger>
                    <SelectContent className="bg-white/95 backdrop-blur-sm border border-gray-200/50 shadow-xl">
                      {Array.from({length: 8}, (_, i) => (i + 1).toString()).map((num) => (
                        <SelectItem
                          key={num}
                          value={num}
                          className="cursor-pointer hover:bg-gray-50/80 focus:bg-gray-50/80  mx-1 my-0.5"
                        >
                          <span className="font-medium text-sm">{num}</span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="relative">
              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe an image and click generate..."
                className="min-h-24 sm:min-h-32 text-sm sm:text-base bg-gray-50 border-gray-200  sm resize-none placeholder:text-gray-400 focus:bg-white focus:border-gray-300 w-full"
              />
            </div>

            <div className="space-y-4">
              {/* Style Options Row */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <span className="text-sm font-medium text-gray-700 mb-1 sm:mb-0 w-full sm:w-auto">Style:</span>
                {styleOptions.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    className={`flex items-center gap-1.5 h-8 sm:h-9 px-2 sm:px-3  text-xs sm:text-sm min-w-0 flex-shrink-0 ${
                      option.active ? "bg-gray-100 border-gray-300" : "bg-white border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <option.icon className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                    <span className="truncate">{option.label}</span>
                  </Button>
                ))}
              </div>

              {/* Aspect Ratio Row */}

              {/* Resolution Row */}

              {/* Raw Option and Generate Button Row */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
                <Button
                  onClick={handleGenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="flex items-center justify-center gap-2 h-11 sm:h-12 px-6 sm:px-8 bg-black hover:bg-gray-800 text-white font-medium text-sm sm:text-base w-full sm:w-auto min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                  {isGenerating ? "Generating..." : "Generate"}
                </Button>
              </div>
            </div>
          </div>
        </div>

        {isGenerating && (
          <div className="bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200 p-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse mx-auto"></div>
                <p className="text-sm sm:text-base text-gray-600">Using {selectedModel} model...</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
