'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Plus, Pencil, Eye } from 'lucide-react';

export default function ProjectDetailPage() {
  // Mock project data
  const project = {
    id: '1',
    title: 'Escape Series',
    lastEdited: 'July 18, 2025',
    description: 'A suspenseful escape scene from the underground facility. Includes chase, tension buildup, and resolution.',
    duration: '4 min 15 sec',
    shots: 5,
    characters: ['Ava', 'Riko', 'Agent Nine']
  };

  // Mock scenes data
  const scenes = [
    {
      id: 2,
      name: 'The Interrogation',
      shots: 8,
      status: 'In Progress',
      duration: '3m 45s'
    },
    {
      id: 3,
      name: 'Rooftop Chase',
      shots: 3,
      status: 'Complete',
      duration: '0m 55s'
    },
    {
      id: 4,
      name: 'A Moment of Reflection',
      shots: 6,
      status: 'Complete',
      duration: '2m 15s'
    },
    {
      id: 5,
      name: 'Planting the Device',
      shots: 5,
      status: 'To Do',
      duration: '1m 30s'
    },
    {
      id: 6,
      name: 'Training Montage',
      shots: 12,
      status: 'In Progress',
      duration: '4m 10s'
    },
    {
      id: 7,
      name: 'The Dinner Party',
      shots: 15,
      status: 'Complete',
      duration: '5m 20s'
    },
    {
      id: 8,
      name: 'Final Confrontation',
      shots: 7,
      status: 'To Do',
      duration: '3m 00s'
    }
  ];

  // Mock characters data
  const characters = [
    {
      id: 1,
      name: 'Kebede',
      role: 'Protagonist',
      usedIn: '3 scenes',
      avatar: '/generate/g1.png'
    },
    {
      id: 2,
      name: 'Kebede',
      role: 'Protagonist',
      usedIn: '3 scenes',
      avatar: '/generate/g1.png'
    },
    {
      id: 3,
      name: 'Asha',
      role: 'Antagonist',
      usedIn: '5 scenes',
      avatar: '/generate/g1.png'
    },
    {
      id: 4,
      name: 'Tafari',
      role: 'Love Interest',
      usedIn: '2 scenes',
      avatar: '/generate/g1.png'
    }
  ];

  // Helper function to get status class
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Complete': return 'bg-black text-white';
      case 'In Progress': return 'bg-black text-white';
      case 'To Do': return 'bg-black text-white';
      default: return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Header */}
      <header className="border-b border-gray-200 py-3 px-6 flex justify-between items-center bg-white">
        <h1 className="text-lg font-bold">My Workspace</h1>
        <div className="flex items-center gap-4">
          <Button className="bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-2 px-4 py-2 rounded-md">
            <Plus className="h-4 w-4" />
            New Project
          </Button>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="px-6 py-4 flex items-center gap-2 text-sm">
        <Link href="/my-projects" className="text-gray-500 hover:text-gray-700">My Workspace</Link>
        <span className="text-gray-500">&gt;</span>
        <span className="font-medium">Escape Series</span>
      </div>

      {/* Project Title and Edit Date */}
      <div className="px-6">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-bold">Escape Series</h1>
          <button className="text-gray-500">
            <Pencil className="h-4 w-4" />
          </button>
        </div>
        <p className="text-sm text-gray-500">Last Edited: {project.lastEdited}</p>
      </div>

      {/* Project Description */}
      <div className="px-6 py-4">
        <h2 className="text-xl font-bold mb-2">Project Description</h2>
        <p className="text-gray-700">{project.description}</p>
      </div>

      {/* Voice Over Status */}
      <div className="px-6 py-4">
        <h2 className="font-bold mb-2">Voice Over status</h2>
        <div className="flex items-center gap-2 border rounded-md p-1 w-40">
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          <span className="text-sm">Shots Completed</span>
        </div>
      </div>

      {/* Scene Details */}
      <div className="px-6 py-4 w-1/2">
        <h2 className="font-bold mb-2">Scene Details</h2>
        <div className="grid grid-cols-3 gap-8">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Total Duration</h3>
            <p>{project.duration}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Shots</h3>
            <p>{project.shots}</p>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Characters</h3>
            <p>{project.characters.join(', ')}</p>
          </div>
        </div>
      </div>

    <div className='grid grid-cols-2 gap-4'>

      <div className="px-6 py-4">

        <div className="border rounded-md overflow-hidden">
            <div className="flex justify-between items-center mb-4 p-4">
            <h2 className="font-bold">Scene List Section</h2>
            <Button className="bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-2 px-4 py-2 rounded-md">
                <Plus className="h-4 w-4" />
                Add Scene
            </Button>
            </div>
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="py-3 px-4 font-medium text-sm">Scene Name</th>
                <th className="py-3 px-4 font-medium text-sm">Shots</th>
                <th className="py-3 px-4 font-medium text-sm">Status</th>
                <th className="py-3 px-4 font-medium text-sm">Duration</th>
                <th className="py-3 px-4 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {scenes.map((scene) => (
                <tr key={scene.id} className="border-t border-gray-200">
                  <td className="py-3 px-4">Scene {scene.id}: {scene.name}</td>
                  <td className="py-3 px-4">{scene.shots}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded ${getStatusClass(scene.status)}`}>
                      {scene.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{scene.duration}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Pencil className="w-4 h-4 text-gray-500" />
                      </button>
                      <button className="p-1 hover:bg-gray-100 rounded">
                        <Eye className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Characters Panel */}
      <div className="px-6 py-4">

        <div className="border rounded-md overflow-hidden">
            <div className="flex justify-between items-center mb-4 p-4">
                <h2 className="font-bold">Characters Panel</h2>
                <Button className="bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-2 px-4 py-2 rounded-md">
                    <Plus className="h-4 w-4" />
                    Create New Character
                </Button>
            </div>
          <table className="w-full">
            <thead className="bg-gray-50 text-left">
              <tr>
                <th className="py-3 px-4 font-medium text-sm">Character</th>
                <th className="py-3 px-4 font-medium text-sm">Role</th>
                <th className="py-3 px-4 font-medium text-sm">Used in</th>
                <th className="py-3 px-4 font-medium text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              {characters.map((character) => (
                <tr key={character.id} className="border-t border-gray-200">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden relative">
                        <Image 
                          src={character.avatar} 
                          alt={character.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <span>{character.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">{character.role}</td>
                  <td className="py-3 px-4">{character.usedIn}</td>
                  <td className="py-3 px-4">
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <Eye className="w-4 h-4 text-gray-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
      {/* Scene List Section */}
    </div>
  );
}
