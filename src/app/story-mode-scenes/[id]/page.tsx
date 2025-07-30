'use client';

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Folder, Fullscreen, Play, Trash, Wand, ZoomIn, ZoomOut } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Checkbox } from "@/components/ui/checkbox";

export default function SceneDetailPage() {
  // Mock data for the scene
  const [shotNumber, setShotNumber] = useState("1");
  const [sceneCompleted, setSceneCompleted] = useState(false);
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
                    Generate more shot lists
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-6">
                  <div className="flex flex-col">
                    <h2 className="text-xl font-semibold mb-6">Shot 1</h2>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Characters anchored</label>
                        <div className="relative">
                          <select className="w-full border border-gray-300 rounded-md py-2 px-3 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-200">
                            <option>2</option>
                            <option>3</option>
                            <option>4</option>
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Description</label>
                        <textarea 
                          className="w-full border border-gray-300 rounded-md py-2 px-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-gray-200"
                          defaultValue="Lorem ipsum dolor sit amet consectetur. Cursus ornare mi consectetur neque at tortor erat fermentum."
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Duration</label>
                        <input 
                          type="text" 
                          className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-gray-200"
                          defaultValue="Pedro Duarte"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Notes</label>
                        <textarea 
                          className="w-full border border-gray-300 rounded-md py-2 px-3 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-gray-200"
                          defaultValue="Golden Hour lighting"
                        />
                      </div>
                      
                      <div className="border border-dashed border-gray-300 rounded-md p-8 flex flex-col items-center justify-center">
                        <div className="mb-4">
                          <Fullscreen className="w-10 h-10" />
                        </div>
                        <p className="text-sm text-gray-500 mb-4">No Generated video</p>
                        <Button variant="outline" className="bg-black text-white hover:bg-gray-800 rounded-md px-4 py-2">
                          Generate Image
                        </Button>
                      </div>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
                  <Link href="/generate-scene-video">
                    <Button className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
                      Generate Video
                    </Button>
                  </Link>
                  <Link href="/generate-scene-image">
                    <Button variant="outline" className='px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900'>
                      Generate Image
                    </Button>
                  </Link>
                  <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className='px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900 mr-2'>
                      Anchor Characters
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
                    <div className="py-2">
                      <h2 className="text-lg font-semibold mb-4">Anchor Characters to Shot</h2>
                      
                      <div className="mb-4">
                        <p className="font-medium mb-2">Shot Number</p>
                        <Select value={shotNumber} onValueChange={setShotNumber}>
                          <SelectTrigger className="w-[200px]">
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">Shot 1</SelectItem>
                            <SelectItem value="2">Shot 2</SelectItem>
                            <SelectItem value="3">Shot 3</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-x-3 gap-y-4 mt-6">
                        {/* Row 1 */}
                        <div className="flex items-start space-x-3">
                          <div className="w-20 h-20 shrink-0">
                            <img src="/images/bear.png" alt="Character" className="w-full h-full object-cover rounded" />
                          </div>
                          <div>
                            <p className="text-xs font-medium">Character name</p>
                            <p className="text-sm">Marcus Elwood</p>
                            <p className="text-xs font-medium mt-1">Role</p>
                            <p className="text-sm">Protagonist</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-20 h-20 shrink-0">
                            <img src="/images/bear.png" alt="Character" className="w-full h-full object-cover rounded" />
                          </div>
                          <div>
                            <p className="text-xs font-medium">Character name</p>
                            <p className="text-sm">Liam Carter</p>
                            <p className="text-xs font-medium mt-1">Role</p>
                            <p className="text-sm">Protagonist</p>
                          </div>
                        </div>
                        
                        {/* Row 2 */}
                        <div className="flex items-start space-x-3">
                          <div className="w-20 h-20 shrink-0">
                            <img src="/images/bear.png" alt="Character" className="w-full h-full object-cover rounded" />
                          </div>
                          <div>
                            <p className="text-xs font-medium">Character name</p>
                            <p className="text-sm">Ethan Hawke</p>
                            <p className="text-xs font-medium mt-1">Role</p>
                            <p className="text-sm">Protagonist</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-20 h-20 shrink-0">
                            <img src="/images/bear.png" alt="Character" className="w-full h-full object-cover rounded" />
                          </div>
                          <div>
                            <p className="text-xs font-medium">Character name</p>
                            <p className="text-sm">Oliver Grant</p>
                            <p className="text-xs font-medium mt-1">Role</p>
                            <p className="text-sm">Protagonist</p>
                          </div>
                        </div>
                        
                        {/* Row 3 */}
                        <div className="flex items-start space-x-3">
                          <div className="w-20 h-20 shrink-0">
                            <img src="/images/bear.png" alt="Character" className="w-full h-full object-cover rounded" />
                          </div>
                          <div>
                            <p className="text-xs font-medium">Character name</p>
                            <p className="text-sm">Dr. Clara Bennett</p>
                            <p className="text-xs font-medium mt-1">Role</p>
                            <p className="text-sm">Antagonist</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start space-x-3">
                          <div className="w-20 h-20 shrink-0">
                            <img src="/images/bear.png" alt="Character" className="w-full h-full object-cover rounded" />
                          </div>
                          <div>
                            <p className="text-xs font-medium">Character name</p>
                            <p className="text-sm">Sofia Martinez</p>
                            <p className="text-xs font-medium mt-1">Role</p>
                            <p className="text-sm">Love Interest</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-6">
                        <Button className="w-full px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
                          Anchor Characters
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
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
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
                    Combine All Shots
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto p-0">
                  <div className="flex flex-col p-4">
                    <div className="bg-black text-white p-4 rounded-lg">
                      <h2 className="text-lg font-medium">Complied Story</h2>
                    </div>
                    
                    <div className="p-4">
                      <div className="mb-4">
                        <h3 className="text-sm font-medium">Scene 1</h3>
                        <p className="text-sm text-gray-600">A fierce battle unfolds between a man and a bear, showcasing raw strength and survival instincts.</p>
                      </div>
                      
                      <div className="relative rounded-md overflow-hidden mb-4">
                        <video 
                          src="https://tsgxefnybjfdweujuafo.supabase.co/storage/v1/object/public/ehudaivideos//heaven.mp4" 
                          className="w-full h-60 object-cover" 
                        />
                        <div className="absolute bottom-4 left-4 flex gap-2">
                          <button className="bg-black/70 text-white p-2 rounded-md flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                          </button>
                          <button className="bg-black/70 text-white p-2 rounded-md flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                              <polyline points="7 10 12 15 17 10"></polyline>
                              <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                          </button>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <Checkbox 
                          id="scene-completed" 
                          checked={sceneCompleted}
                          onCheckedChange={(checked) => setSceneCompleted(checked as boolean)}
                        />
                        <label htmlFor="scene-completed" className="text-sm font-medium cursor-pointer">Mark Scene as completed</label>
                      </div>
                      
                      <Button className="w-full px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800">
                        Save & Proceed to Next Scene
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
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
