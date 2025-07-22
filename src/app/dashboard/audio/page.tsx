"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Upload, Headphones, Play, Pause, Download, Music } from "lucide-react"
import { useState, useRef } from "react"
import { generateSoundEffect } from "@/lib/api/sound-effect"

export default function AudioPage() {
  const [prompt, setPrompt] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null)
  const [duration, setDuration] = useState<number>(5)
  const [isAutoDuration, setIsAutoDuration] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [audioDuration, setAudioDuration] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("video/")) {
      setUploadedFile(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const handleGenerate = async () => {
    if (!prompt.trim()) return

    setIsGenerating(true)
    try {
      const response = await generateSoundEffect({
        text: prompt,
        duration: isAutoDuration ? null : duration
      });
      
      if (response.success && response.data.audio) {
        // Convert base64 to audio URL
        const audioBlob = new Blob(
          [Uint8Array.from(atob(response.data.audio), c => c.charCodeAt(0))],
          { type: response.data.contentType }
        );
        const audioUrl = URL.createObjectURL(audioBlob);
        setGeneratedAudio(audioUrl);
      }
    } catch (error) {
      console.error('Error generating audio:', error);
    } finally {
      setIsGenerating(false);
    }
  }

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setAudioDuration(audioRef.current.duration)
    }
  }

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  const handleDownload = () => {
    if (generatedAudio) {
      const link = document.createElement('a')
      link.href = generatedAudio
      link.download = `sound-effect-${new Date().getTime()}.mp3`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const samplePrompts = [
    "Ocean waves crashing with seagull sounds",
    "Forest ambience with rustling leaves and birds",
    "Urban street sounds with traffic and footsteps",
    "Thunderstorm with heavy rain and wind",
    "Cozy fireplace crackling sounds",
    "Bustling restaurant atmosphere",
  ]

  const videoFormats = ["MP4", "WMV", "MPEG", "FLV", "WEBM"]

  return (
    <div className="flex-1 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">Video to Sound Effects</h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
                Generate synced sound effects for your videos with a simple description.
              </p>
            </div>

            {/* Usage Stats */}
            <div className="hidden lg:block">
              <div className="text-right mb-2">
                <span className="text-sm text-gray-500">Available generations:</span>
              </div>
              <div className="w-64 bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
              </div>
              <div className="text-sm text-gray-600">Remaining 42 generation(s) ⓘ</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upload Section */}
            <div className="bg-gray-50 rounded-2xl p-8 sm:p-12 border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors">
              <div className="text-center">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Play className="w-8 h-8 sm:w-10 sm:h-10 text-green-600" />
                </div>

                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
                  Click to upload or drag your video here
                </h3>

                <p className="text-gray-600 mb-6">Generate synced sound effects for your videos with AI</p>

                <Button
                  onClick={handleUploadClick}
                  variant="outline"
                  className="mb-4 px-6 py-3 text-base font-medium bg-transparent"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  Choose Video File
                </Button>

                <div className="text-sm text-gray-500 space-y-1">
                  <p>Supported formats: {videoFormats.join(", ")}</p>
                  <p>Maximum length: 1 minute; file size: up to 100 MB</p>
                </div>

                {uploadedFile && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-green-700 font-medium">✓ {uploadedFile.name}</p>
                  </div>
                )}

                <input ref={fileInputRef} type="file" accept="video/*" onChange={handleFileUpload} className="hidden" />
              </div>
            </div>

            {/* Sample Prompts */}
            <div>
              <div className="flex items-center mb-6">
                <div className="flex-1 h-px bg-gray-300"></div>
                <span className="px-4 text-gray-500 font-medium">Or try these audio ideas</span>
                <div className="flex-1 h-px bg-gray-300"></div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {samplePrompts.map((samplePrompt, index) => (
                  <button
                    key={index}
                    onClick={() => setPrompt(samplePrompt)}
                    className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Music className="w-5 h-5 text-blue-600" />
                      </div>
                      <p className="text-gray-700 font-medium">{samplePrompt}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Generated Audio Player */}
            {generatedAudio && (
              <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Generated Audio</h3>
                <div className="flex items-center gap-4">
                  <Button
                    onClick={togglePlayback}
                    size="icon"
                    className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700"
                  >
                    {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                  </Button>

                  <div className="flex-1">
                    <div className="w-full bg-gray-300 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: `${(currentTime / audioDuration) * 100}%` }}
                      />
                    </div>
                    <div className="flex justify-between text-sm text-gray-500 mt-1">
                      <span>{formatTime(currentTime)}</span>
                      <span>{formatTime(audioDuration)}</span>
                    </div>
                  </div>

                  <Button 
                    onClick={handleDownload}
                    variant="outline" 
                    size="icon" 
                    className="w-10 h-10 bg-transparent"
                  >
                    <Download className="w-4 h-4" />
                  </Button>
                </div>

                <audio 
                  ref={audioRef} 
                  src={generatedAudio} 
                  className="hidden" 
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setIsPlaying(false)}
                />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Prompt Input */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Describe your audio</h3>

              <Textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe the sound effects you want (e.g., waves, beach, seagulls)"
                className="min-h-32 mb-4 resize-none bg-white border-gray-300 focus:border-blue-500"
                maxLength={250}
              />

              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-gray-500">{prompt.length} / 250</span>
              </div>

              <Button
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isGenerating ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Generating...</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center gap-2">
                    <Headphones className="w-5 h-5" />
                    <span>Generate Audio</span>
                  </div>
                )}
              </Button>
            </div>

            {/* Audio Settings */}
            <div className="bg-gray-50 rounded-2xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Audio Settings</h3>

              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-sm font-medium text-gray-700">Duration</label>
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600">Auto</label>
                      <div
                        onClick={() => setIsAutoDuration(!isAutoDuration)}
                        className={`w-10 h-6 rounded-full transition-colors cursor-pointer ${isAutoDuration ? 'bg-blue-600' : 'bg-gray-200'}`}
                      >
                        <div className={`w-4 h-4 rounded-full bg-white transform transition-transform mt-1 ${isAutoDuration ? 'translate-x-5 ml-1' : 'translate-x-1'}`} />
                      </div>
                    </div>
                  </div>
                  {!isAutoDuration && (
                    <input
                      type="number"
                      value={duration}
                      onChange={(e) => {
                        const value = parseInt(e.target.value);
                        if (!isNaN(value) && value >= 1 && value <= 22) {
                          setDuration(value);
                        }
                      }}
                      min="1"
                      max="22"
                      className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:outline-none"
                      placeholder="Enter duration (1-22)"
                    />
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quality</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:outline-none">
                    <option>Standard (128 kbps)</option>
                    <option>High (256 kbps)</option>
                    <option>Premium (320 kbps)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                  <select className="w-full p-2 border border-gray-300 rounded-lg bg-white focus:border-blue-500 focus:outline-none">
                    <option>MP3</option>
                    <option>WAV</option>
                    <option>FLAC</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Mobile Usage Stats */}
            <div className="lg:hidden bg-gray-50 rounded-2xl p-6">
              <div className="text-center">
                <div className="text-sm text-gray-500 mb-2">Available generations:</div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: "75%" }}></div>
                </div>
                <div className="text-sm text-gray-600">Remaining 42 generation(s) ⓘ</div>
              </div>
            </div>
          </div>
        </div>

        {/* Processing Overlay */}
        {isGenerating && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-xl max-w-sm mx-4 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Headphones className="w-8 h-8 text-blue-600 animate-pulse" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Generating Audio</h3>
              <p className="text-gray-600 mb-4">Creating your custom audio content...</p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full animate-pulse" style={{ width: "65%" }}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
