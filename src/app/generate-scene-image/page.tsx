'use client';

import Link from 'next/link';
import { ArrowRight, Check, Copy, Download, Link2, RefreshCcw, Upload } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { useState } from 'react';
import Image from 'next/image';


export default function VideoGenerationPage() {
    const [selectedModel, setSelectedModel] = useState('gpt-image-1')
    const models = [
        { value: "gpt-image-1", label: "GPT Image 1", description: "Advanced AI image generation" },
        { value: "runway", label: "Runway", description: "Google's latest image model" },
        { value: "kling", label: "Kling", description: "High-quality image generation" },
      ]
  return (
    <div className="min-h-screen bg-white p-4 sm:p-8">
      {/* Header */}
      <div className="bg-black text-white p-4 rounded-lg">
        <h1 className="text-lg font-medium">Scene 1 Lorem ipsum dolor sit</h1>
      </div>
      
      {/* Breadcrumb */}
      <div className="p-4 flex items-center gap-2 text-sm">
        <Link href="/story" className="text-gray-500 hover:text-gray-700">Story</Link>
        <ArrowRight className="w-3 h-3 text-gray-400" />
        <Link href="/scene/1" className="text-gray-500 hover:text-gray-700">Scene 1</Link>
        <ArrowRight className="w-3 h-3 text-gray-400" />
        <span className="font-medium">Image Generation</span>
      </div>
      
      {/* Main content */}
      <div className="">
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          {/* Action buttons */}
          <div className="p-4 border-b border-gray-200 flex gap-4">
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <RefreshCcw className="w-4 h-4" />
              Regenerate
            </button>
            <button className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900">
              <Copy className="w-4 h-4" />
              Copy Prompt
            </button>
          </div>
          
          {/* Video grid */}
          <div className="p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Video 1 */}
              <div className="relative rounded-lg overflow-hidden">
                <Image
                  src="/images/bear.png" 
                  alt=""
                  className="w-full h-64 object-cover" 
                  width={500}
                  height={500}
                />
              </div>
              
              {/* Video 2 */}
              <div className="relative rounded-lg overflow-hidden">
                <Image
                  src="/images/bear.png" 
                  alt=""
                  className="w-full h-64 object-cover" 
                  width={500}
                  height={500}
                />
              </div>
              
              {/* Video 3 */}
              <div className="relative rounded-lg overflow-hidden">
                <Image
                  src="/images/bear.png" 
                  alt=""
                  className="w-full h-64 object-cover" 
                  width={500}
                  height={500}
                />
              </div>
              
              {/* Video 4 - with controls */}
              <div className="relative rounded-lg overflow-hidden">
                <Image
                  src="/images/bear.png" 
                  alt=""
                  className="w-full h-64 object-cover" 
                  width={500}
                  height={500}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <button className="bg-white/80 rounded-full p-2">
                    <div className="w-8 h-8 flex items-center justify-center">
                      <div className="w-0 h-0 border-t-8 border-t-transparent border-l-12 border-l-black border-b-8 border-b-transparent ml-1"></div>
                    </div>
                  </button>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex gap-2">
                  <button className="bg-white rounded-md px-4 py-2 text-sm font-medium flex items-center gap-1">
                    <RefreshCcw className="w-4 h-4" />
                    Vary
                  </button>
                  <button className="bg-white rounded-md px-4 py-2 text-sm font-medium flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    Approve
                  </button>
                  <div className="flex-grow"></div>
                  <button className="bg-white rounded-full p-2">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Description */}
            <div className="text-sm text-gray-700 mb-6">
              <p>Lorem ipsum dolor sit amet consectetur. Cursus ornare mi consectetur neque at tortor erat fermentum.Lorem ipsum dolor sit amet consectetur. Cursus ornare mi consectetur neque at tortor erat fermentum.</p>
            </div>
            
            <div className=''>
                <div className="bg-white border border-gray-300 rounded-2xl p-3 overflow-hidden w-full">
                    <div className="relative">
                        <Textarea 
                        placeholder="Describe your story"
                        className="shadow-xl w-full border border-gray-300 rounded-2xl resize-none p-4 pb-16 min-h-[120px] text-base text-gray-800 focus:outline-none"
                        />
                        <input 
                        type="file" 
                        className="hidden" 
                        accept=".txt,.pdf,.docx" 
                        />
                        <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex justify-between items-center">
                        <Button 
                            variant="ghost" 
                            size="sm"
                            className="shadow-md/20 flex items-center gap-2 hover:bg-transparent hover:text-gray-700 rounded-full bg-white px-4 py-2"
                        >
                            <Link2 className="w-4 h-4" />
                            <span className="text-xs font-normal">Upload screen play</span>
                        </Button>
                        <div className='flex gap-2'>
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
                            <Button 
                                variant="ghost" 
                                size="icon"
                                className="shadow-md/20 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-50 border border-gray-200"
                            >
                                <Upload className="w-4 h-4" />
                            </Button>
                        </div>
                        </div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
