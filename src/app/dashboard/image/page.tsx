"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ImageIcon, Palette, Circle, Sparkles, Plus, X } from "lucide-react"
import { useState, useRef } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Cpu } from "lucide-react"
import { generateImage, generateRunwayImage, generateFluxImage, type GeneratedImage } from "@/lib/api/image-generation"
import Image from "next/image"
import { Dialog, DialogContent } from "@/components/ui/dialog"

interface UploadedImage {
  id: string;
  base64: string;
  tag: string;
}

export default function ImagePage() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedModel, setSelectedModel] = useState('gpt-image-1')
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([])
  const [error, setError] = useState<string>('')
  const [aspectRatio, setAspectRatio] = useState("1:1")
  const [numImages, setNumImages] = useState("1")
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([])
  const [selectedImage, setSelectedImage] = useState<UploadedImage | null>(null)
  const [showAutocomplete, setShowAutocomplete] = useState(false)
  const [cursorPosition, setCursorPosition] = useState({ top: 0, left: 0 })
  const [filteredImages, setFilteredImages] = useState<UploadedImage[]>([])
  const fileInputRef = useRef<HTMLInputElement>(null)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const models = [
    { value: "gpt-image-1", label: "GPT Image 1", description: "Advanced AI image generation" },
    { value: "imagen-4", label: "Imagen 4", description: "Google's latest image model" },
    { value: "flux", label: "Flux", description: "High-quality image generation" },
    { value: "runway", label: "Runway", description: "Reference-based image generation" },
  ]

  const getAspectRatio = (aspectRatio: string) => {
    switch (aspectRatio) {
      case '1024x1024':
        return '1:1'
      case '1024x1536':
        return '16:9'
      case '1536x1024':
        return '9:16'
      default:
        return ''
    }
  }

  const getAspectRatioValue = (ratio: string) => {
    switch (ratio) {
      case '1:1':
        return '1024x1024';
      case '16:9':
        return '1024x1536';
      case '9:16':
        return '1536x1024';
      default:
        return '1024x1024';
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        const nextId = uploadedImages.length + 1;
        setUploadedImages(prev => [...prev, {
          id: `IMG_${nextId}`,
          base64: base64.split(',')[1],
          tag: `IMG_${nextId}`
        }]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    setIsGenerating(true)
    setError('')
    try {
      if (selectedModel === 'runway') {
        // Extract referenced images from the prompt
        const referenceImages = uploadedImages
          .filter(img => prompt.includes(`@${img.tag}`))
          .map(img => ({
            uri: `data:image/png;base64,${img.base64}`,
            tag: img.tag
          }));

        const response = await generateRunwayImage({
          model: 'gen4_image',
          ratio: '1920:1080',
          promptText: prompt,
          referenceImages
        });
        setGeneratedImages(response.imageData);
        return;
      }

      const imageRequest = {
        prompt: prompt,
        aspectRatio: getAspectRatioValue(aspectRatio),
        model: selectedModel,
        n: parseInt(numImages)
      };

      const response = selectedModel === 'flux'
        ? await generateFluxImage(imageRequest)
        : await generateImage(imageRequest);

      setGeneratedImages(response.imageData)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate image')
    } finally {
      setIsGenerating(false)
    }
  }

  const styleOptions = [
    { icon: Palette, label: "Style", active: true },
    { icon: ImageIcon, label: "Image prompt", active: true },
    { icon: Circle, label: "Image style", active: true },
  ]


  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-screen p-6">
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleImageUpload}
      />
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl">
          {selectedImage && (
            <div className="relative aspect-video">
              <Image
                src={`data:image/png;base64,${selectedImage.base64}`}
                alt={selectedImage.tag}
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
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
            {selectedModel === 'runway' && uploadedImages.length > 0 && (
              <div className="flex gap-2 overflow-x-auto py-2">
                {uploadedImages.map((img) => (
                  <div key={img.id} className="relative group">
                    <div className="flex flex-col items-center gap-1">
                      <div 
                        className="w-16 h-16 relative cursor-pointer"
                        onClick={() => setSelectedImage(img)}
                      >
                        <Image
                          src={`data:image/png;base64,${img.base64}`}
                          alt={img.tag}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <span className="text-xs text-gray-600">{img.tag}</span>
                    </div>
                    <button
                      className="absolute -top-2 -right-2 bg-black rounded-full p-1 hidden group-hover:block"
                      onClick={() => setUploadedImages(prev => prev.filter(i => i.id !== img.id))}
                    >
                      <X className="w-3 h-3 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}
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
                          value={model.value}
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
                ref={textareaRef}
                placeholder="Describe the image you want to generate..."
                className="min-h-[100px] resize-none"
                value={prompt}
                onChange={(e) => {
                  setPrompt(e.target.value);
                  const lastAtSymbol = e.target.value.lastIndexOf('@');
                  if (lastAtSymbol !== -1) {
                    const searchTerm = e.target.value.slice(lastAtSymbol + 1).toLowerCase();
                    const filtered = uploadedImages.filter(img => 
                      img.tag.toLowerCase().includes(searchTerm)
                    );
                    setFilteredImages(filtered);
                    setShowAutocomplete(true);
                    
                    // Calculate cursor position
                    const textarea = textareaRef.current;
                    if (textarea) {
                      const { selectionStart } = textarea;
                      const textBeforeCursor = e.target.value.substring(0, selectionStart);
                      const lines = textBeforeCursor.split('\n');
                      const currentLineNumber = lines.length - 1;
                      const currentLine = lines[currentLineNumber];
                      
                      const lineHeight = 24; // Approximate line height in pixels
                      const charWidth = 8;  // Approximate character width in pixels
                      
                      setCursorPosition({
                        top: (currentLineNumber + 1) * lineHeight,
                        left: currentLine.length * charWidth
                      });
                    }
                  } else {
                    setShowAutocomplete(false);
                  }
                }}
              />
              {showAutocomplete && (
                <div 
                  className="absolute bg-white shadow-lg rounded-md p-2 z-50 max-h-48 overflow-y-auto"
                  style={{ top: cursorPosition.top, left: cursorPosition.left }}
                >
                  {filteredImages.map((img) => (
                    <div
                      key={img.id}
                      className="flex items-center gap-2 p-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        const lastAtSymbol = prompt.lastIndexOf('@');
                        const newPrompt = prompt.substring(0, lastAtSymbol) + '@' + img.tag + ' ' + prompt.substring(lastAtSymbol + img.tag.length + 1);
                        setPrompt(newPrompt);
                        setShowAutocomplete(false);
                      }}
                    >
                      <div className="w-8 h-8 relative">
                        <Image
                          src={`data:image/png;base64,${img.base64}`}
                          alt={img.tag}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <span>{img.tag}</span>
                    </div>
                  ))}
                </div>
              )}
              {selectedModel === 'runway' && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="absolute bottom-3 left-3 rounded-full"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              )}
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
        ) : generatedImages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {generatedImages.map((image, index) => (
              <div key={index} className="bg-white shadow-md overflow-hidden">
                <div className="aspect-square relative">
                  <Image
                    src={`data:image/png;base64,${image.b64_json}`}
                    alt={image.prompt}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-sm text-gray-600">Prompt: {image.prompt}</p>
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Aspect Ratio: {getAspectRatio(image.aspectRatio)}</span>
                    <span>Model: {image.model}</span>
                  </div>
                  <p className="text-xs text-gray-500">
                    Generated: {new Date(image.generatedAt).toLocaleString()}
                  </p>
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = `data:image/png;base64,${image.b64_json}`;
                      link.download = `generated-image-${image.group}-${index + 1}.png`;
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                    }}
                    className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2 bg-black text-white hover:bg-black/90 cursor-pointer text-sm font-medium transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
