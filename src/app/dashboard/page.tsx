"use client"

import { useEffect, useState } from "react"
import { getImageGenerationHistories } from "@/lib/api/imageGenerationHistories"
import { ImageGenerationHistory } from "@/types/imageGenerationHistory"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { Image as ImageIcon, Video } from "lucide-react"

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<'image' | 'video'>('image')
  const [histories, setHistories] = useState<ImageGenerationHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  console.log(histories)
  useEffect(() => {
    const fetchHistories = async () => {
      try {
        const data = await getImageGenerationHistories()
        console.log(data)
        setHistories(data)
      } catch {
        setError('Failed to load image histories')
      } finally {
        setLoading(false)
      }
    }

    if (activeTab === 'image') {
      fetchHistories()
    }
  }, [activeTab])

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-lg p-1 shadow-sm inline-flex">
            <Button
              variant={activeTab === 'image' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('image')}
              className="flex items-center gap-2"
            >
              <ImageIcon className="w-4 h-4" />
              Images
            </Button>
            <Button
              variant={activeTab === 'video' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setActiveTab('video')}
              className="flex items-center gap-2"
            >
              <Video className="w-4 h-4" />
              Videos
            </Button>
          </div>
        </div>

        {/* Content Area */}
        {activeTab === 'image' ? (
          <div className="space-y-6">
            {loading ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {[...Array(8)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-500">{error}</p>
              </div>
            ) : histories.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500">No images generated yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {histories.map((history) => (
                  <div 
                    key={history.id} 
                    className="group relative aspect-square bg-black rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
                  >
                    <Image
                      src={`data:image/png;base64,${history.imageUrl}`}
                      alt={history.prompt}
                      fill
                      className="object-cover group-hover:opacity-90 transition-opacity duration-200"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <div className="absolute bottom-0 left-0 right-0 p-4">
                        <p className="text-white text-sm line-clamp-2">{history.prompt}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-gray-300 text-xs">{new Date().toLocaleDateString()}</span>
                          <span className="text-gray-300 text-xs">{history.model}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Video history coming soon</p>
          </div>
        )}
      </div>
    </div>
  )
}
