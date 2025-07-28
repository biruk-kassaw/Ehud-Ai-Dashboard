'use client';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Book, Circle, Copy, Edit, Fullscreen, MenuIcon, Mic, Plus } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

interface Scene {
  id: number;
  title: string;
  description: string;
  mood: string;
  timeOfDay: string;
  setting: string;
}

export default function ChatPage() {
  const [isGenerated, setIsGenerated] = useState(false);
  const [prompt, setPrompt] = useState('');
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

  const handleGenerate = () => {
    if (prompt.trim()) {
      setIsGenerated(true);
    }
  };

  const handleGoBack = () => {
    setIsGenerated(false);
    setPrompt('');
  };

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
                <span className="text-sm text-gray-500">Step 1 of 4</span>
                <div className="h-1.5 w-24 bg-gray-100 rounded-full">
                  <div className="h-full w-1/4 bg-black rounded-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center px-6 py-2">
            <h2 className="text-lg font-medium">Shot List Generator</h2>
            <Button className="bg-[#0B0F1C] text-white hover:bg-[#0B0F1C]/90">
              <Circle className="w-4 h-4 mr-2" />
              Add new Scene
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-2 divide-x h-[calc(100vh-116px)]">
        {/* Left Column */}
        <div className="flex flex-col h-full">
          {isGenerated ? (
            <>
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                {/* User Message */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2 justify-end">
                    <div className="max-w-[70%] p-4 bg-gray-50 rounded-lg">
                      <p>{prompt}</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Assistant Message */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-start gap-2">
                    <div className="flex-1 p-4 bg-gray-50 rounded-lg">
                      <p>Lorem ipsum dolor sit amet consectetur. At aliquam sit morbi lorem habitasse hendrerit amet tincidunt proin. Pulvinar eu aliquam sollicitudin platea. Habitasse ipsum tellus diam elit nunc amet at id. Augue morbi ultrices amet leo sed sagittis pellentesque lacinia proin.</p>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Input Area */}
              <div className="p-6 border-t">
                <div className="relative">
                  <textarea
                    placeholder="Tell me more"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full h-32 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black/5"
                  />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <Button variant="outline" size="sm" className="border-black/10 rounded-full">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <Button variant="outline" size="sm" className="border-black/10 rounded-full">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-[#0B0F1C] text-white hover:bg-[#0B0F1C]/90"
                      onClick={handleGenerate}
                    >
                      Generate
                    </Button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="flex-1 flex flex-col items-center justify-center px-12">
                <h2 className="text-4xl font-bold mb-2">Create your story</h2>
                <p className="text-sm text-gray-600">Generate images from text prompts & styles</p>
              </div>
              
              <div className="p-6">
                <div className="relative">
                  <textarea
                    placeholder="Describe your story idea..."
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="w-full h-32 p-4 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-black/5"
                  />
                  <div className="absolute bottom-4 left-4 flex items-center gap-2">
                    <Button variant="outline" size="sm" className="border-black/10 rounded-full hover:bg-white/10 hover:border-black/20 hover:text-black">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <Button variant="outline" size="sm" className="border-black/10 rounded-full hover:bg-white/10 hover:border-black/20 hover:text-black">
                      <Mic className="h-4 w-4" />
                    </Button>
                    <Button 
                      size="sm" 
                      className="bg-[#0B0F1C] text-white hover:bg-[#0B0F1C]/90"
                      onClick={handleGenerate}
                      disabled={!prompt.trim()}
                    >
                      Generate
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Right Column - Scene List */}
        <div className="p-6 space-y-4 overflow-y-auto">
          {isGenerated ? (
            <>
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
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 bg-black text-white hover:bg-black/80">
                          <Copy className="h-4 w-4" />
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

              <div className="flex justify-between items-center pt-4">
                <Button 
                  variant="outline" 
                  className="border-black/10 hover:bg-white/10 hover:border-black/40 hover:text-black"
                  onClick={handleGoBack}
                >
                  Go Back
                </Button>
                <Link href="/image-generations">
                  <Button className="bg-[#0B0F1C] text-white hover:bg-[#0B0F1C]/90">
                    Proceed to image generations
                  </Button>
                </Link>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full border border-dashed rounded-lg">
              <Fullscreen className="w-20 h-20 mb-4" />
              <p className="text-2xl">No Scenes yet</p>
              <p className="text-sm text-gray-400">Once stories are generated scenes will appear here</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
