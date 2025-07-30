'use client';

import { Button } from '@/components/ui/button';
import { Edit, Folder, Play, Trash, Wand, ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SceneDetailPage() {
  // Mock data for the scene
  const scene = {
    id: '1',
    title: 'The Escape Begins',
    description: 'A suspenseful escape scene from the underground facility. Includes chase, tension buildup, and resolution.',
    duration: '4 min 15 sec',
    totalShots: 5,
    characters: ['Ava', 'Riko', 'Agent Nine'],
    shots: [
      {
        id: 1,
        description: 'Lorem ipsum dolor sit amet consectetur.',
        status: 'Done',
        characters: ['Character 1', 'Character 2', 'Character 3'],
        duration: '0:8'
      },
      {
        id: 2,
        description: 'Close-up on the main character\'s face.',
        status: 'Draft',
        characters: ['Character 1', 'Character 2'],
        duration: '0:12'
      },
      {
        id: 3,
        description: 'Wide angle shot of the futuristic city.',
        status: 'In Progress',
        characters: ['Character 1', 'Character 3'],
        duration: '0:15'
      },
      {
        id: 4,
        description: 'Handheld tracking shot following the protagonist.',
        status: 'Done',
        characters: ['Character 2'],
        duration: '0:10'
      },
      {
        id: 5,
        description: 'An extreme close-up of a key turning in a lock.',
        status: 'In Progress',
        characters: ['Character 1', 'Character 3'],
        duration: '0:8'
      },
      {
        id: 6,
        description: 'Over-the-shoulder shot revealing the antagonist.',
        status: 'Draft',
        characters: ['Character 1', 'Character 2', 'Character 3'],
        duration: '0:14'
      }
    ],
    selectedShot: {
      id: 1,
      number: 1,
      characters: ['Character 1', 'Character 2'],
      description: 'Lorem ipsum dolor sit amet consectetur. Cursus ornare mi consectetur neque at tortor erat fermentum.',
      duration: '0:8',
      notes: 'Golden hour lighting'
    }
  };



  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200 py-3 px-6 flex justify-between items-center bg-white">
              <h1 className="text-lg font-medium text-gray-900">Escape</h1>
              <div className="flex items-center gap-4">
                <Link href="/my-projects">
                    <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 text-sm font-medium cursor-pointer">
                        <Folder className="w-4 h-4 mr-1 text-gray-500"/>
                        My Projects
                    </button>
                </Link> 
                <div className="flex text-xs font-normal bg-gray-200 px-2 py-1 rounded-sm">
                  <Wand className="w-4 h-4 mr-1"/>
                  1,580 credits remaining
                </div>
                <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </div>
              </div>
            </header>
      {/* Breadcrumb */}
      <div className="px-6 py-6 flex items-center gap-2 text-sm">
        <Link href="/story-mode-scenes" className="text-gray-500 hover:text-gray-700">Story</Link>
        <span className="text-gray-500">&gt;</span>
        <span className="font-medium">Scene {scene.id}</span>
      </div>

        <div className="mx-6  p-4 bg-black text-white rounded-lg flex items-center justify-between">
          <div className="flex items-center">
            <span className="font-medium mr-2">Scene {scene.id}</span>
            <span>{scene.title}</span>
          </div>
        </div>

      {/* Main content */}
      <div className="px-6 py-4">
        {/* Scene description */}
        <div className="py-6 mb-6 flex gap-8">
            <div>
                <h2 className="font-bold mb-2 text-2xl">Scene Description</h2>
                <p className="text-gray-700 mb-6">{scene.description}</p>
            </div>

            <div>
                <h1 className="font-bold mb-2 text-2xl">Scene Details</h1>
                <div className="grid grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Total Duration</h3>
                        <p>{scene.duration}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Total Shot</h3>
                        <p>{scene.totalShots}</p>
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-gray-500 mb-1">Characters</h3>
                        <p>{scene.characters.join(', ')}</p>
                    </div>
                </div>
            </div>
        </div>

        <div className="grid grid-cols-5 gap-6 mb-6">
          <div className="col-span-3 overflow-x-auto border rounded-lg">
            <table className="w-full border-collapse p-2 ">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 px-4 text-left font-medium text-sm">Shot</th>
                  <th className="py-3 px-4 text-left font-medium text-sm">Description</th>
                  <th className="py-3 px-4 text-left font-medium text-sm">Status</th>
                  <th className="py-3 px-4 text-left font-medium text-sm">Characters</th>
                  <th className="py-3 px-4 text-left font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {scene.shots.map((shot, index) => (
                  <tr key={shot.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                    <td className="py-3 px-4 border-t border-gray-200">Shot {shot.id}</td>
                    <td className="py-3 px-4 border-t border-gray-200 max-w-xs truncate">{shot.description}</td>
                    <td className="py-3 px-4 border-t border-gray-200">
                      <span className={`px-2 py-1 text-xs rounded bg-black text-white`}>
                        {shot.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 border-t border-gray-200">
                      <div className="flex -space-x-2">
                        {shot.characters.map((_, i) => (
                          <div key={i} className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs overflow-hidden">
                            {i + 1}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="py-3 px-4 border-t border-gray-200">
                      <div className="flex gap-2">
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Edit className="w-4 h-4 text-gray-500" />
                        </button>
                        <button className="p-1 hover:bg-gray-100 rounded">
                          <Trash className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-4 flex justify-end pr-6">
              <Button variant="outline" className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
                Generate more shot lists
              </Button>
            </div>
          </div>

          {/* Shot details - Right column */}
          <div className="col-span-2 space-y-6">
            {/* Selected shot details */}
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <div className="bg-gray-100 p-4">
                <h2 className="font-medium">Shot {scene.selectedShot.number}</h2>
              </div>
              <div className="p-4 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-bold mb-1">Shot Number</h3>
                    <p>{scene.selectedShot.number}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold mb-1">Characters Anchord</h3>
                    <div className="flex -space-x-2">
                      {scene.selectedShot.characters.map((_, i) => (
                        <div key={i} className="w-6 h-6 rounded-full bg-gray-300 border-2 border-white flex items-center justify-center text-xs overflow-hidden">
                          {i + 1}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-bold mb-1">Description</h3>
                  <p className="text-gray-700">{scene.selectedShot.description}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-bold mb-1">Duration</h3>
                    <p>{scene.selectedShot.duration}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold mb-1">Notes</h3>
                    <p className="text-gray-700">{scene.selectedShot.notes}</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <Button className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
                    Generate Video
                  </Button>
                  <Button variant="outline" className='px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900'>
                    Generate Image
                  </Button>
                  <Button variant="outline" className='px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 mr-2'>
                    Anchor Characters
                  </Button>
                </div>
              </div>
                <div className="overflow-hidden">
                <div className="p-4">
                    <h2 className="font-medium">Generated Image</h2>
                </div>
                <div className="p-4">
                    <div className="relative aspect-video w-full overflow-hidden rounded-md">
                        <Image 
                            src="/generate/g1.png" 
                            alt="Generated scene image" 
                            fill
                            className="object-cover"
                        />
                        <button className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full">
                            <ZoomIn className="w-4 h-4" />
                        </button>
                    </div>
                </div>
                </div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="mt-8 border border-gray-200 rounded-lg overflow-hidden p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Main Timeline</h2>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <ZoomOut className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Play className="h-4 w-4" />
              </Button>
              <Button className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
                Combine All Shots
              </Button>
            </div>
          </div>
          <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
            <div className="w-16 h-16 bg-gray-100 flex items-center justify-center border-r border-gray-200">
              <span className="text-xs text-gray-500">Video</span>
            </div>
            <div className="flex-1 overflow-x-auto">
              <div className="flex">
                <div className="min-w-[160px] h-16 relative">
                  <Image 
                    src="/generate/g1.png" 
                    alt="Shot 1" 
                    fill
                    className="object-cover"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs p-1 text-center">
                    Shot 1
                  </div>
                </div>
                {[2, 3, 4, 5, 6].map(id => (
                  <div key={id} className="min-w-[160px] h-16 bg-gray-200 flex items-center justify-center border-l border-gray-300">
                    <span className="text-xs text-gray-500">Shot {id}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
