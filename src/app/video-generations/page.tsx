'use client';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Book, Check, Download, Edit, MenuIcon, RefreshCcw, Save, Wand2 } from 'lucide-react';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from 'next/link';

interface Scene {
  id: number;
  title: string;
  description: string;
  mood: string;
  timeOfDay: string;
  setting: string;
}

export default function ChatPage() {
  const [selectedScene, setSelectedScene] = useState<Scene | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [scenes] = useState<Scene[]>([
    {
      id: 1,
      title: 'Lorem ipsum dolor sit',
      description: 'Lorem ipsum dolor sit amet consectetur. Tortor metus mollis eget enim. Eleifend sapien ut pretium elementum dignissim in. Vitae facilisis sed erat mauris elit pellentesque ac pharetra cursus. Nisl eget imperdiet nunc sodales eget id vitae consectetur leo. Lorem ipsum pellentesque vestibulum donec varius purus eu. Egestas proin sem facilisis sagittis amet dolor sem turpis laoreet. Turpis elit fermentum ullamcorper sem. Mus at turpis nibh nibh.',
      mood: 'Sunny with mild windy breath',
      timeOfDay: 'Sunny with mild windy breath',
      setting: 'Sunny with mild windy breath'
    },
    {
      id: 2,
      title: 'Lorem ipsum dolor sit',
      description: 'Lorem ipsum dolor sit amet consectetur. Tortor metus mollis eget enim. Eleifend sapien ut pretium elementum dignissim in. Vitae facilisis sed erat mauris elit pellentesque ac pharetra cursus. Nisl eget imperdiet nunc sodales eget id vitae consectetur leo. Lorem ipsum pellentesque vestibulum donec varius purus eu. Egestas proin sem facilisis sagittis amet dolor sem turpis laoreet. Turpis elit fermentum ullamcorper sem. Mus at turpis nibh nibh.',
      mood: 'Sunny with mild windy breath',
      timeOfDay: 'Sunny with mild windy breath',
      setting: 'Sunny with mild windy breath'
    },
    {
      id: 3,
      title: 'Lorem ipsum dolor sit',
      description: 'Lorem ipsum dolor sit amet consectetur. Tortor metus mollis eget enim. Eleifend sapien ut pretium elementum dignissim in.',
      mood: 'Sunny with mild windy breath',
      timeOfDay: 'Sunny with mild windy breath',
      setting: 'Sunny with mild windy breath'
    }
  ]);
  const [selectedModel, setSelectedModel] = useState('veo-3')

  const models = [
    { value: "veo-3", label: "VEO 3", description: "Advanced AI image generation" },
    { value: "veo-2", label: "VEO 2", description: "Google's latest image model" },
    { value: "kling", label: "Kling", description: "High-quality image generation" },
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="">
        {/* Top Section */}
        <div className="grid grid-cols-2 border-b">
          <div className="flex items-center gap-2 px-6 py-2 border-r">
            <div className="flex items-center gap-2">
              <Book className="w-4 h-4 mr-2 text-gray-500" />
              <span className="text-sm text-gray-500">|</span>
            </div>
            <div className="ml-2">
              <h1 className="text-lg font-medium">Neon Echo</h1>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500">Step 3 of 4</span>
                <div className="h-1.5 w-24 bg-gray-100 rounded-full">
                  <div className="h-full w-3/4 bg-black rounded-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center px-6 py-2">
            <h2 className="text-lg font-medium">Scene Video Creator</h2>
            <div className="flex items-center gap-2">
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
              <Button className="bg-[#0B0F1C] text-white hover:bg-[#0B0F1C]/90">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-2 divide-x h-[calc(100vh-116px)]">
        {/* Left Column */}
        <div className="flex flex-col h-full gap-4 p-4">
            {scenes.map((scene) => (
                <Collapsible key={scene.id} className="border rounded-lg">
                  <CollapsibleTrigger className="w-full cursor-pointer">
                    <div className="flex items-center justify-between bg-gray-100 p-4">
                      <div className="flex items-center gap-2">
                        <MenuIcon className="w-4 h-4 mr-2 text-gray-500" />
                        <h3 className="font-medium">Scene {scene.id}</h3>
                        <p className="text-sm text-gray-500">{scene.title}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button 
                          variant="outline" 
                          className="ml-auto bg-white border-black/10 hover:bg-gray-100  hover:text-black"
                          onClick={() => setSelectedScene(scene)}
                        >
                          Open
                        </Button>
                      </div>
                    </div>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <div className="space-y-4 p-4">
                      <div>
                        <h4 className="text-sm font-medium mb-1">Scene Description</h4>
                        <p className="text-sm text-gray-600">{scene.description}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Mood</h4>
                          <p className="text-sm text-gray-600">{scene.mood}</p>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">Time of Day</h4>
                          <p className="text-sm text-gray-600">{scene.timeOfDay}</p>
                        </div>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium mb-1">Setting</h4>
                        <p className="text-sm text-gray-600">{scene.setting}</p>
                      </div>
                    </div>
                  </CollapsibleContent>
                </Collapsible>
              ))}
        </div>

        {/* Right Column - Scene List */}
        <div className="p-4 space-y-4 overflow-y-auto">
          {selectedScene && (
            <div className="space-y-6 border rounded-lg">
              <div className="flex items-center justify-between p-4 bg-gray-100">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-medium">Scene {selectedScene.id}</h3>
                  <span className="text-sm text-gray-500">{selectedScene.title}</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>

              <div className="px-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Scene Description</h4>
                  <p className="text-sm text-gray-600">{selectedScene.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Mood</h4>
                    <p className="text-sm text-gray-600">{selectedScene.mood}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium mb-2">Time Of day</h4>
                    <p className="text-sm text-gray-600">{selectedScene.timeOfDay}</p>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Setting</h4>
                  <p className="text-sm text-gray-600">{selectedScene.setting}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 px-4">
                <Button variant="outline" className="h-8 text-xs hover:bg-gray-100  hover:text-black">
                  <span className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 10.6667H4C3.63333 10.6667 3.33333 10.3667 3.33333 10V3.33333C3.33333 2.96667 3.63333 2.66667 4 2.66667H12C12.3667 2.66667 12.6667 2.96667 12.6667 3.33333V10C12.6667 10.3667 12.3667 10.6667 12 10.6667ZM4 3.33333V10H12V3.33333H4Z" fill="black"/>
                      <path d="M13.3333 13.3333H2.66667C2.3 13.3333 2 13.0333 2 12.6667V5.33333H2.66667V12.6667H13.3333V13.3333Z" fill="black"/>
                    </svg>
                    Aspect Ratio
                  </span>
                </Button>
                <Button variant="outline" className="h-8 text-xs hover:bg-gray-100  hover:text-black">
                  <span className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.6667 12.6667H3.33333C2.96667 12.6667 2.66667 12.3667 2.66667 12V4C2.66667 3.63333 2.96667 3.33333 3.33333 3.33333H12.6667C13.0333 3.33333 13.3333 3.63333 13.3333 4V12C13.3333 12.3667 13.0333 12.6667 12.6667 12.6667ZM3.33333 4V12H12.6667V4H3.33333Z" fill="black"/>
                      <path d="M10.6667 10.6667H5.33333V10H10.6667V10.6667ZM9.33333 8.66667H5.33333V8H9.33333V8.66667ZM8 6.66667H5.33333V6H8V6.66667Z" fill="black"/>
                    </svg>
                    Style
                  </span>
                </Button>
                <Button variant="outline" className="h-8 text-xs hover:bg-gray-100  hover:text-black">
                  <span className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.6667 12.6667H3.33333C2.96667 12.6667 2.66667 12.3667 2.66667 12V4C2.66667 3.63333 2.96667 3.33333 3.33333 3.33333H12.6667C13.0333 3.33333 13.3333 3.63333 13.3333 4V12C13.3333 12.3667 13.0333 12.6667 12.6667 12.6667ZM3.33333 4V12H12.6667V4H3.33333Z" fill="black"/>
                      <path d="M10.6667 8.66667C9.93333 8.66667 9.33333 8.06667 9.33333 7.33333C9.33333 6.6 9.93333 6 10.6667 6C11.4 6 12 6.6 12 7.33333C12 8.06667 11.4 8.66667 10.6667 8.66667ZM4.66667 10.6667L6.66667 8L7.66667 9.33333L9.66667 6.66667L11.3333 8.66667V4H4.66667V10.6667Z" fill="black"/>
                    </svg>
                    Video Duration
                  </span>
                </Button>
                <Button variant="outline" className="h-8 text-xs hover:bg-gray-100  hover:text-black">
                  <span className="flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.6667 12.6667H3.33333C2.96667 12.6667 2.66667 12.3667 2.66667 12V4C2.66667 3.63333 2.96667 3.33333 3.33333 3.33333H12.6667C13.0333 3.33333 13.3333 3.63333 13.3333 4V12C13.3333 12.3667 13.0333 12.6667 12.6667 12.6667ZM3.33333 4V12H12.6667V4H3.33333Z" fill="black"/>
                      <path d="M10.6667 7.33333H8V4.66667H8.66667V6.66667H10.6667V7.33333ZM11.3333 11.3333H4.66667V10.6667H11.3333V11.3333ZM11.3333 9.33333H4.66667V8.66667H11.3333V9.33333Z" fill="black"/>
                    </svg>
                    Reference Image
                  </span>
                </Button>
              </div>
              <div className="px-4 pb-4">
                <Button 
                    className="w-full bg-[#0B0F1C] text-white hover:bg-[#0B0F1C]/90"
                    onClick={() => setIsGenerating(true)}
                >
                    <Wand2 className="w-4 h-4 mr-2" />
                    Generate Scene Video
                </Button>
              </div>
            </div>
          )}
          {isGenerating && (
            <div className="space-y-4 border rounded-lg">
              <div className="p-4 bg-gray-100">
                <h2 className="text-lg font-medium">Generations</h2>
              </div>
              <div className="grid grid-cols-1 px-4">
                <div className="relative group">
                  <div className="absolute inset-0  rounded-lg pointer-events-none" />
                  <video src="https://tsgxefnybjfdweujuafo.supabase.co/storage/v1/object/public/ehudaivideos//heaven.mp4" controls className="w-full rounded-lg" />
                </div>
              </div>
              <div className="flex gap-2 px-4 pb-4">
                <Button variant="outline" className="flex-1 hover:bg-gray-100  hover:text-black">
                  <Check className='w-4 h-4 mr-2'/>
                  Approve
                </Button>
                <Button variant="outline" className="flex-1 hover:bg-gray-100  hover:text-black">
                  <RefreshCcw className='w-4 h-4 mr-2'/>
                  Regenerate
                </Button>
                <Button variant="outline" className="flex-1 hover:bg-gray-100  hover:text-black">
                  <Edit className='w-4 h-4 mr-2'/>
                  Edit Prompt
                </Button>
                <Button variant="outline" className="flex-1 hover:bg-gray-100  hover:text-black">
                  <Download className='w-4 h-4 mr-2'/>
                  Download
                </Button>
              </div>
            </div>
          )}
          <div className='flex gap-2 mt-8 px-4 pb-4 justify-between'>
            <Button variant="outline" className='hover:bg-gray-100  hover:text-black'>
                Back to Storyboard
            </Button>
            <Link href="/video-compilation">
                <Button>
                    Proceed to Compilation
                </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
