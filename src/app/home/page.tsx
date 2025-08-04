'use client';


import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Pencil, ArrowUpCircle, Dumbbell, Music, Mic2, Speech } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Masonry from "react-masonry-css";

const breakpointColumnsObj = {
  default: 4,
  900: 3,
  700: 2,
  500: 1,
};

const sampleImages = Array(12).fill(null).map((_, i) => ({
  id: i + 1,
  src: `/generate/g${i + 1}.png`,
  width:  i % 3 === 0 ? 1 : 2,
  height: i % 3 === 0 ? 2 : 1,
}));

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-white mx-4 md:mx-8 lg:mx-16">
      {/* Header */}
      <header className="flex items-center justify-between py-8">
        <h1 className="text-3xl font-bold">EhudAI</h1>
        <div className="flex items-center gap-4">
          <Button variant="outline" className="bg-[#0B0F1C] text-white hover:bg-[#0B0F1C]/90">
            Upgrade premium
          </Button>
          <Link href="/my-profile">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[300px] flex flex-col items-center justify-center text-center text-white overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://tsgxefnybjfdweujuafo.supabase.co/storage/v1/object/public/ehudaivideos//woman.mp4"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10">
          <h2 className="text-4xl font-bold mb-2">Create your story</h2>
          <p className="text-md mb-6">Generate images from text prompts & styles</p>
          <Link href="/story-mode-chat">
            <Button className="bg-transparent text-white border border-white hover:bg-white/10">
              Create my project
            </Button>
          </Link>
        </div>
      </section>

      {/* Generate Section */}
      <section className="py-8">
        <h3 className="text-4xl font-bold mb-2">Generate</h3>
        <p className="text-gray-800 mb-6">Top picks for you. Updated daily.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          {/* Image Card */}
          <Card className="relative h-[270px] overflow-hidden group cursor-pointer">
            <div 
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: 'url(/images/vrimage.png)' }}
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute bottom-0 left-0 p-6 text-white flex items-center justify-between w-full">
              <div>
                <h4 className="text-xl font-bold mb-1">Image</h4>
                <p className="text-sm">Generate images from text prompts & styles</p>
              </div>
              <Link href="/generate-scene-image">
                <Button className="bg-transparent text-white border border-white hover:bg-white/10">
                  Open
                </Button>
              </Link>
            </div>
          </Card>

          {/* Video Card */}
          <Card className="relative h-[270px] overflow-hidden group cursor-pointer">
            <video
              autoPlay
              muted
              loop
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src="https://tsgxefnybjfdweujuafo.supabase.co/storage/v1/object/public/ehudaivideos//woman.mp4"
            />
            <div className="absolute inset-0 bg-black/50" />
            <div className="absolute bottom-0 left-0 p-6 text-white flex items-center justify-between w-full">
              <div>
                <h4 className="text-xl font-bold mb-1">Video</h4>
                <p className="text-sm">Generate video from text prompts & styles</p>
              </div>
              <Link href="/generate-scene-video">
                <Button className="bg-transparent text-white border border-white hover:bg-white/10">
                  Open
                </Button>
              </Link>
            </div>
          </Card>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { title: 'Edit', description: 'Generate images from text prompts & styles', Icon: Pencil },
            { title: 'Upscale', description: 'Generate images from text prompts & styles', Icon: ArrowUpCircle },
            { title: 'Train', description: 'Generate images from text prompts & styles', Icon: Dumbbell },
            { title: 'Audio', description: 'Generate images from text prompts & styles', Icon: Music },
            { title: 'Voice Generator', description: 'Generate images from text prompts & styles', Icon: Mic2 },
            { title: 'Lipsync', description: 'Generate images from text prompts & styles', Icon: Speech },
          ].map((feature, index) => (
            <Card key={index} className="p-3 flex items-center gap-2 bg-gray-100 backdrop-blur-sm border border-black/10">
              <div className="flex items-center gap-2">
                <feature.Icon className="w-4 h-4" />
                <div>
                  <h4 className="font-medium text-m mb-1">{feature.title}</h4>
                  <p className="text-sm">{feature.description}</p>
                </div>
                <div>
                  <Button variant="outline" className="ml-auto bg-white border-black/10 hover:bg-white/10 hover:border-black/20 hover:text-black">
                    Open
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Gallery Section */}
      <section className="px-4 py-8">
        <h3 className="text-2xl font-bold mb-6">Gallery</h3>
        <div>
              <Masonry
                breakpointCols={breakpointColumnsObj}
                className="flex -ml-4 w-auto"
                columnClassName="pl-4 bg-clip-padding"
              >
                {sampleImages.map((image) => (
                  <div 
                    key={image.id} 
                    className={`mb-4 relative overflow-hidden`}
                    style={{
                      height: `${image.height * 200}px`,
                    }}
                  >
                    <div className="w-full h-full">
                      <Image src={image.src} alt={`Image ${image.id}`} fill className="object-cover" />
                    </div>
                  </div>
                ))}
              </Masonry>
            </div>
      </section>
    </div>
  );
}
