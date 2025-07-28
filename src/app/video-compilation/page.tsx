'use client';

import { Button } from '@/components/ui/button';
import { Book, ChevronDown, ChevronUp, Clock, Info, Save, X } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SceneItem {
  id: number;
  title: string;
  duration: string;
  size: string;
  status: 'done' | 'pending';
}

interface RenderQueueItem {
  id: number;
  title: string;
  resolution: string;
  model: string;
  eta: string;
  credits: number;
  status: 'processing' | 'queued';
  progress?: number;
}

export default function ChatPage() {
  const scenes: SceneItem[] = [
    { id: 1, title: 'Alley Chase', duration: '02:45', size: '455 MB', status: 'done' },
    { id: 2, title: 'Rooftop Meeting', duration: '01:32', size: '287 MB', status: 'pending' },
    { id: 3, title: 'Underground Lair', duration: '03:18', size: '612 MB', status: 'done' },
    { id: 4, title: 'Final Confrontation', duration: '04:05', size: '823 MB', status: 'pending' },
    { id: 5, title: 'Resolution', duration: '01:42', size: '344 MB', status: 'done' },
  ];

  const renderQueue: RenderQueueItem[] = [
    { 
      id: 1, 
      title: 'Rooftop Meeting', 
      resolution: '1080p + 4K', 
      model: 'Topaz Standard',
      eta: '09:34',
      credits: 125,
      status: 'processing',
      progress: 67
    },
    { 
      id: 2, 
      title: 'Final Confrontation', 
      resolution: '1080p + 4K', 
      model: 'Topaz Crisp',
      eta: '12:40',
      credits: 180,
      status: 'queued'
    },
    { 
      id: 3, 
      title: 'Complete Project', 
      resolution: '1080p + 4K', 
      model: 'Topaz Clean',
      eta: '45:20',
      credits: 690,
      status: 'queued'
    }
  ];
  
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
                <span className="text-sm text-gray-500">Step 4 of 4</span>
                <div className="h-1.5 w-24 bg-gray-100 rounded-full">
                  <div className="h-full w-full bg-black rounded-full" />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center px-6 py-2">
            <h2 className="text-lg font-medium">Merge & Combine Controls</h2>
            <div className="flex items-center gap-2">
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
        <div className="flex flex-col h-full gap-6 p-4 overflow-y-auto">
          {scenes.map((scene) => (
            <div key={scene.id} className="flex items-center gap-4 p-4 border rounded-lg">
              <div className="relative w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                <span className="text-xs text-gray-500">{scene.duration}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-medium">{scene.title}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{scene.duration}</span>
                  <span className="text-xs text-gray-500">{scene.size}</span>
                </div>
              </div>
              <div className="flex items-center">
                {scene.status === 'done' ? (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Done
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                    Pending
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Right Column */}
        <div className="p-4 space-y-8 overflow-y-auto">
          {/* Scene Sequence */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Scene Sequence</h2>
              <Select defaultValue="fade">
                <SelectTrigger className="w-24">
                  <SelectValue placeholder="Transition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="fade">Fade</SelectItem>
                  <SelectItem value="cut">Cut</SelectItem>
                  <SelectItem value="dissolve">Dissolve</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              {scenes.map((scene) => (
                <div key={scene.id} className="flex items-center gap-2 p-2 bg-gray-100 rounded-md">
                  <div className="flex items-center justify-center w-6 h-6">
                    <span className="text-xs">{scene.id}</span>
                  </div>
                  <div className="w-6 h-6 flex items-center justify-center">
                    <div className="w-4 h-4 bg-gray-300 rounded"></div>
                  </div>
                  <div className="flex-1">
                    <div className="text-sm">{scene.title}</div>
                    <div className="text-xs text-gray-500">{scene.duration}</div>
                  </div>
                  <div className="w-8 text-right">
                    <span className="text-xs text-gray-500">fade</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex items-center justify-between mt-4 text-sm">
              <div>Total Duration: <span className="font-medium">13:32</span></div>
              <div>Estimated Size: <span className="font-medium">2.8 GB</span></div>
            </div>
          </div>
          
          {/* Resolution Settings */}
          <div>
            <h2 className="text-lg font-medium mb-4">Resolution Settings</h2>
            
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Target Resolution</h3>
                <Select defaultValue="4k">
                  <SelectTrigger>
                    <SelectValue placeholder="Select resolution" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="4k">4K (3840x2160)</SelectItem>
                    <SelectItem value="1080p">1080p (1920x1080)</SelectItem>
                    <SelectItem value="720p">720p (1280x720)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Output Style</h3>
                <RadioGroup defaultValue="preserve" className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="preserve" id="preserve" />
                    <Label htmlFor="preserve">Preserve Grain</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="smooth" id="smooth" />
                    <Label htmlFor="smooth">Smooth Output</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
            
            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm font-medium">Lock Aspect Ratio</div>
              <Switch defaultChecked />
            </div>
          </div>
          
          {/* AI Upscaling Model */}
          <div>
            <h2 className="text-lg font-medium mb-4">AI Upscaling Model</h2>
            
            <div className="grid grid-cols-3 gap-2">
              <div className="border rounded-md p-4 relative">
                <div className="absolute top-2 right-2">
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <h3 className="font-medium mb-1">Topaz Standard</h3>
                <p className="text-xs text-gray-500">Balanced quality and speed</p>
              </div>
              
              <div className="border rounded-md p-4 relative">
                <div className="absolute top-2 right-2">
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <h3 className="font-medium mb-1">Topaz Crisp</h3>
                <p className="text-xs text-gray-500">Sharp details, best for graphics</p>
              </div>
              
              <div className="border rounded-md p-4 relative">
                <div className="absolute top-2 right-2">
                  <Info className="w-4 h-4 text-gray-400" />
                </div>
                <h3 className="font-medium mb-1">Topaz Clean</h3>
                <p className="text-xs text-gray-500">Noise reduction, best for film</p>
              </div>
            </div>
          </div>
          
          {/* Render Queue */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-medium">Render Queue</h2>
              <Button variant="ghost" size="sm" className="h-8 px-2 text-xs">
                <span className="flex items-center gap-1">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                    <path d="M8 3.33333V12.6667M8 12.6667L12.6667 8M8 12.6667L3.33333 8" stroke="currentColor" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Queue Settings
                </span>
              </Button>
            </div>
            
            <div className="space-y-2">
              {renderQueue.map((item) => (
                <div key={item.id} className="border rounded-md overflow-hidden">
                  <div className="flex items-center justify-between p-3 bg-white">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 bg-gray-100 flex items-center justify-center rounded">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-4 h-4">
                          <path d="M12.6667 12.6667H3.33333C2.96667 12.6667 2.66667 12.3667 2.66667 12V4C2.66667 3.63333 2.96667 3.33333 3.33333 3.33333H12.6667C13.0333 3.33333 13.3333 3.63333 13.3333 4V12C13.3333 12.3667 13.0333 12.6667 12.6667 12.6667ZM3.33333 4V12H12.6667V4H3.33333Z" fill="black"/>
                        </svg>
                      </div>
                      <div>
                        <div className="text-sm">{item.title}</div>
                        <div className="text-xs text-gray-500">Resolution: {item.resolution}</div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="text-xs text-right">Model:</div>
                        <div className="text-xs font-medium">{item.model}</div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-right">ETA:</div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span className="text-xs font-medium">{item.eta}</span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-right">Credits:</div>
                        <div className="text-xs font-medium text-right">{item.credits}</div>
                      </div>
                      
                      <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronUp className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <ChevronDown className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {item.status === 'processing' && (
                    <div className="px-3 py-1 bg-gray-50">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-xs">Progress</span>
                        <span className="text-xs font-medium">{item.progress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full">
                        <div 
                          className="h-full bg-black rounded-full" 
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          
          {/* Save Settings */}
          <div>
            <h2 className="text-lg font-medium mb-4">Save Settings</h2>
            
            <div className="text-sm text-gray-500 mb-2">
              Estimated render time: <span className="font-medium">1h 24m</span>
            </div>
            
            <div className="text-sm text-gray-500 mb-6">
              Total cost: <span className="font-medium">1195 credits</span>
            </div>
            
            <Button className="w-full bg-[#0B0F1C] text-white hover:bg-[#0B0F1C]/90">
              <svg className="w-4 h-4 mr-2" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13.3333 8.00001L8.00001 13.3333M8.00001 13.3333L2.66667 8.00001M8.00001 13.3333L8.00001 2.66667" stroke="white" strokeWidth="1.33333" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Start Final Render
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
