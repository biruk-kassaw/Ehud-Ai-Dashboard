'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Plus, Play, Pencil, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function MyProjectsPage() {
  // Mock projects data
  const projects = [
    {
      id: 1,
      title: 'Escape Series',
      date: 'July 8, 2023',
      scenes: 3,
      image: '/generate/g6.png'
    },
    {
      id: 2,
      title: 'Escape Series',
      date: 'July 8, 2023',
      scenes: 3,
      image: '/generate/g7.png'
    },
    {
      id: 3,
      title: 'World war Z',
      date: 'July 8, 2023',
      scenes: 3,
      image: '/generate/g8.png'
    },
    {
      id: 4,
      title: 'Love Island',
      date: 'July 8, 2023',
      scenes: 3,
      image: '/generate/g9.png'
    },
    {
      id: 5,
      title: 'Escape Series',
      date: 'July 8, 2023',
      scenes: 3,
      image: '/generate/g10.png'
    },
    {
      id: 6,
      title: 'Escape Series',
      date: 'July 8, 2023',
      scenes: 3,
      image: '/generate/g11.png'
    },
    {
      id: 7,
      title: 'Escape Series',
      date: 'July 8, 2023',
      scenes: 3,
      image: '/generate/g4.png'
    },
    {
        id: 7,
        title: 'Escape Series',
        date: 'July 8, 2023',
        scenes: 3,
        image: '/generate/g5.png'
      }
  ];

  return (
    <div className="bg-white min-h-screen">
      <div className="flex justify-between items-center mb-6 border-b p-4">
        <div>
          <h1 className="text-lg font-bold">My Workspace</h1>
          <p className="text-gray-500 text-xs">Lorem ipsum</p>
        </div>
        <Button className="bg-gray-900 hover:bg-gray-800 text-white flex items-center gap-2 px-4 py-2 rounded-md">
          <Plus className="h-4 w-4" />
          New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">

        {/* Project cards */}
        {projects.map((project) => (
          <Link href={`/my-projects/${project.id}`} key={project.id}>
            <div key={project.id} className="relative rounded-lg overflow-hidden group h-48">
                <Image 
                src={project.image} 
                alt={project.title}
                fill
                className="object-cover"
                />
                <div className="absolute inset-0 bg-transparent bg-opacity-40"></div>
                
                {/* Action buttons */}
                <div className="absolute top-2 left-2 flex space-x-1">
                <button className="bg-black bg-opacity-50 p-1.5 rounded-md text-white hover:bg-opacity-70">
                    <Play className="h-4 w-4" />
                </button>
                <button className="bg-black bg-opacity-50 p-1.5 rounded-md text-white hover:bg-opacity-70">
                    <Pencil className="h-4 w-4" />
                </button>
                <button className="bg-black bg-opacity-50 p-1.5 rounded-md text-white hover:bg-opacity-70">
                    <Download className="h-4 w-4" />
                </button>
                </div>
                
                {/* Project info */}
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white">
                <h3 className="font-medium">{project.title}</h3>
                <div className="flex justify-between items-center text-xs">
                    <span>{project.date}</span>
                    <span>{project.scenes} Scenes</span>
                </div>
                </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
