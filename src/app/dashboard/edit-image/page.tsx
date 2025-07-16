"use client"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ImageUpscale, Sparkles } from "lucide-react"
import { useState, useRef } from "react"
import Image from "next/image"
import { editImage, type EditImageResponse } from "@/lib/api/edit-image"

export default function EditImagePage() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [error, setError] = useState<string>('')
  const [uploadedImage, setUploadedImage] = useState<string>('')
  const [generatedImages, setGeneratedImages] = useState<EditImageResponse['imageData']>([])
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        // Store only the base64 data without the data:image prefix
        setUploadedImage(base64.split(',')[1]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGenerate = async () => {
    if (!uploadedImage) {
      setError('Please upload an image first');
      return;
    }
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setError('');
    setIsGenerating(true);
    
    try {
      const response = await editImage({
        prompt: prompt.trim(),
        image: uploadedImage
      });
      
      if (!response.success) {
        throw new Error('Failed to edit image');
      }
      
      setGeneratedImages(response.imageData);
    } catch (err) {
      console.error('Error editing image:', err);
      setError(err instanceof Error ? err.message : 'Failed to edit image');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col max-w-6xl mx-auto px-4 py-4">
      <div className="w-full max-w-5xl space-y-6 sm:space-y-8 px-4 sm:px-0">
        {/* Header */}
        <div className="text-center px-4">
          <div className="flex items-center justify-center gap-2 sm:gap-3 mb-2">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-400 flex items-center justify-center">
              <ImageUpscale className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-black">Edit Image</h1>
          </div>
        </div>

        <div className="bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200 p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            {/* Image Upload Section */}
            <div className="space-y-3">
                  {uploadedImage && (
                    <div className="relative w-32 h-32 border rounded-lg overflow-hidden bg-gray-50">
                      <Image
                        src={`data:image/png;base64,${uploadedImage}`}
                        alt="Uploaded image"
                        fill
                        className="object-cover"
                      />
                    </div>
                  )}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  ref={fileInputRef}
                  className="hidden"
                />
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-2 h-11 px-4 bg-black text-white hover:bg-gray-800 border border-gray-300"
                  variant="outline"
                >
                  <ImageUpscale className="w-4 h-4" />
                  Choose Image
                </Button>
              </div>
            </div>

            {/* Prompt Input */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-sm font-medium text-gray-900">
                  Edit Instructions
                </label>
              </div>
              <Textarea
                placeholder="Describe how you want to edit the image..."
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="min-h-[120px] resize-none bg-white border-gray-300 focus:border-black focus:ring-black"
              />
            </div>

            {/* Generate Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || !uploadedImage || isGenerating}
                className="flex items-center justify-center gap-2 h-11 sm:h-12 px-6 sm:px-8 bg-black hover:bg-gray-800 text-white font-medium text-sm sm:text-base w-full sm:w-auto min-w-[140px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                {isGenerating ? "Processing..." : "Generate Edit"}
              </Button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {isGenerating && (
          <div className="bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200 p-8 rounded-xl">
            <div className="flex items-center justify-center h-64">
              <div className="text-center space-y-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse mx-auto"></div>
                <p className="text-sm sm:text-base text-gray-600">Processing your image...</p>
              </div>
            </div>
          </div>
        )}

        {generatedImages.length > 0 && (
          <div className="bg-white/95 backdrop-blur-sm shadow-lg border border-gray-200 p-8 rounded-xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
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
                      <span>Aspect Ratio: {image.aspectRatio}</span>
                      <span>Generated: {new Date(image.generatedAt).toLocaleString()}</span>
                    </div>
                    <button
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = `data:image/png;base64,${image.b64_json}`;
                        link.download = `edited-image-${image.group}-${index + 1}.png`;
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
          </div>
        )}
      </div>
    </div>
  );
}
