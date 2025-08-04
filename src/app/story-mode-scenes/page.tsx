'use client';

import { Button } from '@/components/ui/button';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Textarea } from '@/components/ui/textarea';
import { Book, Circle, Copy, Edit, Folder, Link2, MenuIcon, Upload, Wand } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface Scene {
  id: number;
  title: string;
  description: string;
  mood: string;
  timeOfDay: string;
  setting: string;
  complete: boolean;
  shots: Shot[];
}

interface Shot {
  id: number;
  title: string;
  description: string;
}

export default function ChatPage() {
  const [scenes] = useState<Scene[]>([
    {
      id: 1,
      title: 'A man fighting a bear',
      description: 'Lorem ipsum dolor sit amet consectetur. Tortor metus mollis eget enim. Eleifend sapien ut pretium elementum dignissim in. Vitae facilisis sed erat mauris elit pellentesque ac pharetra cursus. Nisl eget imperdiet nunc sodales eget id vitae consectetur leo. Lorem ipsum pellentesque vestibulum donec varius purus eu. Egestas proin sem facilisis sagittis amet dolor sem turpis laoreet. Turpis elit fermentum ullamcorper sem. Mus at turpis nibh nibh.',
      mood: 'Tense, dramatic',
      timeOfDay: 'Morning',
      setting: 'Forest clearing',
      complete: false,
      shots: [
        { id: 1, title: 'Scene 1', description: 'A tight close-up on a character\'s hand as they nervously tap their fingers on a worn leather-bound book.' },
        { id: 2, title: 'Scene 2', description: 'A dynamic tracking shot follows a sleek, futuristic car as it weaves through bustling nighttime traffic.' },
        { id: 3, title: 'Scene 3', description: 'An intimate over-the-shoulder shot of two people sitting by a crackling fireplace, their faces illuminated by the warm light.' },
        { id: 4, title: 'Scene 4', description: '' }
      ]
    },
    {
      id: 2,
      title: 'A twig snaps in the darkness',
      description: 'Lorem ipsum dolor sit amet consectetur. Tortor metus mollis eget enim. Eleifend sapien ut pretium elementum dignissim in. Vitae facilisis sed erat mauris elit pellentesque ac pharetra cursus. Nisl eget imperdiet nunc sodales eget id vitae consectetur leo.',
      mood: 'Mysterious, suspenseful',
      timeOfDay: 'Night',
      setting: 'Dark forest',
      complete: false,
      shots: []
    },
    {
      id: 3,
      title: 'The stranger speaks',
      description: 'Lorem ipsum dolor sit amet consectetur. Tortor metus mollis eget enim. Eleifend sapien ut pretium elementum dignissim in.',
      mood: 'Intense, revelatory',
      timeOfDay: 'Dawn',
      setting: 'Campsite',
      complete: false,
      shots: []
    }
  ]);
  
  const [expandedScene, setExpandedScene] = useState<number | null>(1);

  const handleGoBack = () => {
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="">
  {/* Top Section */}
  <div className="grid md:grid-cols-2 grid-cols-1 border-b">
    <div className="flex items-center justify-between gap-2 px-6 py-2 border-r">
      <div className="flex">
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

      {/* Right-side buttons: Hide on lg and below */}
      <div className="flex items-center gap-4">
        {/* My Projects button: Hide on xl and up */}
        <Link href="/my-projects" className='hidden xl:block'>
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 text-sm font-medium cursor-pointer hidden xl:flex">
            <Folder className="w-4 h-4 mr-1 text-gray-500" />
            My Projects
          </button>
        </Link>

        <div className="flex text-xs font-normal bg-gray-200 px-2 py-1 rounded-sm hidden xl:flex">
          <Wand className="w-4 h-4 mr-1" />
          1,580 credits remaining
        </div>

        <Link href="/my-profile">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>
        </Link>
      </div>
    </div>

    <div className="flex justify-between items-center px-6 py-2 hidden md:flex">
      <h2 className="text-lg font-medium">Scene List</h2>
      <Button className="bg-[#0B0F1C] text-white hover:bg-[#0B0F1C]/90">
        <Circle className="w-4 h-4 mr-2" />
        Add new Scene
      </Button>
    </div>
  </div>
</header>



      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 md:divide-x h-auto md:h-[calc(100vh-116px)]">
  {/* Left Column */}
  <div className="flex flex-col h-full">
    <div className="flex-1 overflow-y-auto p-6 space-y-6">
      {/* User Message */}
      <div className="flex flex-col gap-2">
        <div className="flex items-start gap-2 justify-end">
          <div className="max-w-[70%] p-4 bg-gray-50 rounded-lg">
            <p>Tell me more</p>
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
    <div className='p-4'>
      <div className="bg-white border border-gray-300 rounded-2xl p-3 overflow-hidden w-full">
        <div className="relative">
          <Textarea 
            placeholder="Describe your story"
            className="shadow-xl w-full border border-gray-300 rounded-2xl resize-none p-4 pb-16 min-h-[120px] text-base text-gray-800 focus:outline-none"
          />
          <input type="file" className="hidden" accept=".txt,.pdf,.docx" />
          <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex justify-between items-center">
            <Button variant="ghost" size="sm" className="shadow-md/20 flex items-center gap-2 rounded-full bg-white px-4 py-2">
              <Link2 className="w-4 h-4" />
              <span className="text-xs font-normal">Upload screen play</span>
            </Button>
            <Button variant="ghost" size="icon" className="shadow-md/20 rounded-full w-8 h-8 flex items-center justify-center border border-gray-200">
              <Upload className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  </div>

  {/* Right Column - Scene List */}
  <div className="p-6 space-y-4 overflow-y-auto">
    {scenes.map((scene) => (
      <Collapsible key={scene.id} className="border rounded-lg overflow-hidden"
        open={expandedScene === scene.id}
        onOpenChange={() => setExpandedScene(expandedScene === scene.id ? null : scene.id)}>

        <CollapsibleTrigger className="w-full cursor-pointer">
          <div className="flex items-center justify-between bg-gray-100 p-4">
            <div className="flex items-center gap-2">
              <MenuIcon className="w-4 h-4 mr-2 text-gray-500" />
              <h3 className="font-medium">Scene {scene.id}</h3>
              <p className="text-sm text-gray-500">{scene.title}</p>
            </div>
            <div className="flex gap-4">
              <Edit className="h-4 w-4" />
              <Copy className="h-4 w-4" />
            </div>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          {expandedScene === scene.id ? (
            <div className="bg-black text-white">
              <div className="p-4 space-y-6">
                <div>
                  <h3 className="text-gray-400 mb-2">Scene Description</h3>
                  <p className="text-white">{scene.description}</p>
                </div>

                <div>
                  <h3 className="text-gray-400 mb-2">Scene Completion</h3>
                  <div className="flex items-center">
                    <div className="w-4 h-4 rounded-full bg-red-500 mr-2"></div>
                    <span>Incomplete</span>
                  </div>
                </div>

                {scene.shots.length > 0 && (
                  <div>
                    <h3 className="text-gray-400 mb-2">Shot list</h3>
                    <div className="flex overflow-x-auto gap-2 pb-4 mb-4">
                      <div className="min-w-[100px] h-[80px] bg-gray-800 rounded flex-shrink-0 overflow-hidden">
                        <Image src="/generate/g10.png" alt="Scene preview" width={100} height={80} className="object-cover w-full h-full" />
                      </div>
                      {scene.shots.map((shot, index) => (
                        <div key={index} className="min-w-[100px] h-[80px] bg-gray-800 rounded flex-shrink-0 flex items-center justify-center text-xs text-gray-400">
                          {shot.title}
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      {scene.shots.map((shot) => (
                        <div key={shot.id} className="bg-gray-800 p-3 rounded-md">
                          <h4 className="font-medium mb-1">{shot.title}</h4>
                          <p className="text-sm text-gray-300">{shot.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-end">
                  <Link href="/story-mode-scenes/scene-1">
                    <Button className="bg-white text-black hover:bg-gray-200 rounded-md px-4 py-2">
                      View Details
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
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
          )}
        </CollapsibleContent>
      </Collapsible>
    ))}

    <div className="flex justify-between items-center pt-4">
      <Button variant="outline" className="border-black/10 hover:bg-white/10 hover:border-black/40 hover:text-black" onClick={handleGoBack}>
        Go Back
      </Button>
      <Link href="/image-generations">
        <Button className="bg-[#0B0F1C] text-white hover:bg-[#0B0F1C]/90">
          Proceed to image generations
        </Button>
      </Link>
    </div>
  </div>
</div>
    </div>
  );
}
