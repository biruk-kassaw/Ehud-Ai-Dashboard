'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageSquare } from "lucide-react";

export default function ChatPage() {
  return (
    <div className="h-full p-4 space-y-2">
      <Card className="p-4">
        <div className="flex items-center gap-x-2 mb-4">
          <MessageSquare className="h-8 w-8 text-black" />
          <h2 className="text-2xl font-bold">Chat with AI</h2>
        </div>
        <div className="space-y-4">
          <div className="flex flex-col gap-y-4">
            {/* Example messages */}
            <div className="bg-gray-100 p-4 border border-black">
              <p className="text-sm font-medium text-black">AI Assistant</p>
              <p className="text-sm text-gray-600">
                Hello! How can I help you today?
              </p>
            </div>
            <div className="bg-white p-4 border border-black">
              <p className="text-sm font-medium text-black">You</p>
              <p className="text-sm text-gray-600">
                Tell me about artificial intelligence.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-x-2">
            <Input
              placeholder="Type your message..."
              className="flex-1"
            />
            <Button>
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
