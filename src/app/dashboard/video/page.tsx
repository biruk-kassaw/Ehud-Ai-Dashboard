"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Video, Cpu, Sparkles, Upload, X, Clock } from "lucide-react"
import { useState, useRef } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"
import { generateVideo, generateVeoVideo, type GenerateVideoRequest, type GeneratedVideo } from "@/lib/api/video-generation"



export default function VideoPage() {
  const [prompt, setPrompt] = useState("")
  const [negativePrompt, setNegativePrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedModel, setSelectedModel] = useState('kling-ai')
  const [duration, setDuration] = useState('5')
  const [generatedVideos, setGeneratedVideos] = useState<GeneratedVideo[]>([])
  const [error, setError] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState<{ file: File; preview: string } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const models = [
    { value: "kling-ai", label: "Kling AI", description: "Advanced AI video generation" },
    { value: "veo-2", label: "Veo 2", description: "Veo's second generation model" },
    { value: "veo-3", label: "Veo 3", description: "Latest Veo model" },
  ]

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    if (selectedImage) {
      URL.revokeObjectURL(selectedImage.preview)
    }

    setSelectedImage({
      file,
      preview: URL.createObjectURL(file)
    })
    setError('')
  }

  const removeImage = () => {
    if (selectedImage) {
      URL.revokeObjectURL(selectedImage.preview)
      setSelectedImage(null)
      // Reset the file input so the same file can be selected again
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleGenerateVideo = async () => {
    setIsGenerating(true)
    setError('')

    try {
      let base64Image = '';
      if (selectedImage) {
        base64Image = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader()
          reader.onload = () => {
            const result = reader.result as string
            resolve(result.split(',')[1]) // Remove data URL prefix
          }
          reader.onerror = reject
          reader.readAsDataURL(selectedImage.file)
        })
      }
      const requestData: GenerateVideoRequest = {
        isImageToVideo: base64Image ? true : false,
        image: base64Image,
        prompt,
        model: selectedModel,
        duration: parseInt(duration),
      }

      if (negativePrompt) {
        requestData.negativePrompt = negativePrompt
      }

      const response = await (selectedModel === 'veo-2' || selectedModel === 'veo-3' 
        ? generateVeoVideo(requestData)
        : generateVideo(requestData))

      setGeneratedVideos(prev => [{
        ...response.videoData
      }, ...prev])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate video')
    } finally {
      setIsGenerating(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen p-6">
      <div className="w-full max-w-5xl space-y-6 sm:space-y-8 px-4 sm:px-0">
        {/* Header */}
        <div className="text-center px-4">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-400 flex items-center justify-center">
              <Video className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">Video</h1>
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
                    <SelectTrigger className="w-full sm:w-48 h-8 sm:h-9 bg-white/80 backdrop-blur-sm border border-gray-200/50 text-xs sm:text-sm font-medium hover:bg-white/90 focus:bg-white/90">
                      <SelectValue placeholder="Select model" />
                    </SelectTrigger>
                    <SelectContent>
                      {models.map((model) => (
                        <SelectItem key={model.value} value={model.value}>
                          <div className="flex flex-col">
                            <span className="font-medium">{model.label}</span>
                            <span className="text-xs text-gray-500">{model.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Duration Selection */}
              <div className="flex items-center gap-4 sm:gap-6">
                <div className="flex items-center gap-2 sm:gap-3">
                  <Clock className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600 flex-shrink-0" />
                  <Select value={duration} onValueChange={setDuration}>
                    <SelectTrigger className="w-full sm:w-32 h-8 sm:h-9 bg-white/80 backdrop-blur-sm border border-gray-200/50 text-xs sm:text-sm font-medium hover:bg-white/90 focus:bg-white/90">
                      <SelectValue placeholder="Duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="5">5 seconds</SelectItem>
                      <SelectItem value="10">10 seconds</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Image Upload Section */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {selectedImage ? (
                  <div className="relative aspect-square">
                    <Image
                      src={selectedImage.preview}
                      alt="Selected image"
                      fill
                      className="object-cover rounded-lg"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="aspect-square flex items-center justify-center border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
                  >
                    <Upload className="w-6 h-6 text-gray-400" />
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
            </div>

            {/* Prompt Inputs */}
            <div className="space-y-4">
              <Textarea
                placeholder="Describe the video you want to generate..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[100px] resize-none"
              />
              <Textarea
                placeholder="Negative prompt (optional)"
                value={negativePrompt}
                onChange={(e) => setNegativePrompt(e.target.value)}
                className="min-h-[60px] resize-none"
              />
            </div>

            {/* Generate Button */}
            <div className="flex justify-end">
              <Button
                onClick={handleGenerateVideo}
                disabled={prompt.trim().length < 5 || isGenerating}
                className="flex items-center justify-center gap-2 h-11 sm:h-12 px-6 sm:px-8 bg-black hover:bg-gray-800 text-white font-medium text-sm sm:text-base min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 p-4 mt-4">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {isGenerating ? (
          <div className="bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200 p-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse mx-auto"></div>
                <p className="text-sm sm:text-base text-gray-600">Using {selectedModel} model...</p>
              </div>
            </div>
          </div>
        ) : generatedVideos.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {generatedVideos.map((video, index) => (
              <div key={index} className="bg-white shadow-md overflow-hidden rounded-lg">
                <video
                  src={video.url}
                  controls
                  className="w-full aspect-video object-cover"
                />
                <div className="p-4 space-y-3">
                  <p className="text-sm text-gray-600">Prompt: {video.prompt}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Duration: {video.duration}s</span>
                    <span>Model: {video.model}</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Generated: {new Date(video.generatedAt).toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
