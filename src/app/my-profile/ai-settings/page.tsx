"use client";

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

export default function AISettingsPage() {
  const [settings, setSettings] = useState({
    nsfwFilter: true,
    autoPrompt: true,
    savePromptHistory: true,
    commercialRights: true
  });

  return (
    <div className="space-y-8">
      {/* Generation Defaults Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-medium mb-1">Generation Defaults</h2>
          <p className="text-sm text-gray-500 mb-6">Set your preferred AI generation settings</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Default AI Model</label>
              <div className="relative">
                <select className="w-full border border-gray-200 rounded-md py-2 px-3 bg-gray-100 appearance-none focus:outline-none">
                  <option>DALL-E 3</option>
                  <option>Midjourney</option>
                  <option>Stable Diffusion</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Default Quality</label>
              <div className="relative">
                <select className="w-full border border-gray-200 rounded-md py-2 px-3 bg-gray-100 appearance-none focus:outline-none">
                  <option>High (2048×2048)</option>
                  <option>Medium (1024×1024)</option>
                  <option>Low (512×512)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Aspect ratio</label>
              <div className="relative">
                <select className="w-full border border-gray-200 rounded-md py-2 px-3 bg-gray-100 appearance-none focus:outline-none">
                  <option>Square (1:1)</option>
                  <option>Portrait (2:3)</option>
                  <option>Landscape (3:2)</option>
                  <option>Widescreen (16:9)</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Default Style</label>
              <div className="relative">
                <select className="w-full border border-gray-200 rounded-md py-2 px-3 bg-gray-100 appearance-none focus:outline-none">
                  <option>Photorealistic</option>
                  <option>Digital Art</option>
                  <option>Anime</option>
                  <option>Oil Painting</option>
                  <option>Watercolor</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <Button className="w-full bg-black text-white hover:bg-gray-800">
            Update AI Settings
          </Button>
        </div>
        
        {/* Content & Safety Section */}
        <div className="border border-gray-200 rounded-lg p-6">
          <h2 className="text-lg font-medium mb-1">Content & Safety</h2>
          <p className="text-sm text-gray-500 mb-6">Configure content filtering and generation preferences</p>
          
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">NSFW Content Filter</h3>
                <p className="text-xs text-gray-500">Block adult and inappropriate content</p>
              </div>
              <Switch 
                checked={settings.nsfwFilter} 
                onCheckedChange={(checked) => setSettings({...settings, nsfwFilter: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Auto Prompt Enhancement</h3>
                <p className="text-xs text-gray-500">Automatically improve your prompts with AI</p>
              </div>
              <Switch 
                checked={settings.autoPrompt} 
                onCheckedChange={(checked) => setSettings({...settings, autoPrompt: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Save Prompt History</h3>
                <p className="text-xs text-gray-500">Keep a history of your prompts for reuse</p>
              </div>
              <Switch 
                checked={settings.savePromptHistory} 
                onCheckedChange={(checked) => setSettings({...settings, savePromptHistory: checked})}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Commercial Rights</h3>
                <p className="text-xs text-gray-500">Generate images with commercial usage rights</p>
              </div>
              <Switch 
                checked={settings.commercialRights} 
                onCheckedChange={(checked) => setSettings({...settings, commercialRights: checked})}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
