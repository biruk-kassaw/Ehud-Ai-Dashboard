'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Video } from "lucide-react";

export default function VideoPage() {
  return (
    <div className="h-full p-4 space-y-2">
      <Card className="p-4">
        <div className="flex items-center gap-x-2 mb-4">
          <Video className="h-8 w-8 text-black" />
          <h2 className="text-2xl font-bold">Video Generation</h2>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col gap-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Example video placeholder */}
              <Card className="overflow-hidden">
                <div className="aspect-video relative bg-gray-100">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Video className="h-12 w-12 text-gray-400" />
                  </div>
                </div>
              </Card>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <Input
              placeholder="Describe the video you want to generate..."
              className="flex-1"
            />
            <Button>
              Generate
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
