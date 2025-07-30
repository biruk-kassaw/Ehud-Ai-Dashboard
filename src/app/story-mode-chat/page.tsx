
"use client";

import { useState, useRef, KeyboardEvent } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Folder, Link, Upload, Wand } from "lucide-react";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FormStep = 'story' | 'details' | 'style' | 'world' | 'screenplay';

export default function ChatPage() {
  const [storyText, setStoryText] = useState("");
  const [currentStep, setCurrentStep] = useState<FormStep>('story');
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Form state for other steps
  const [genre, setGenre] = useState("");
  const [theme, setTheme] = useState("");
  const [audience, setAudience] = useState("");
  const [emotions, setEmotions] = useState("");
  const [tone, setTone] = useState("");
  const [format, setFormat] = useState("");
  
  // World and Character step state
  const [setting, setSetting] = useState("");
  const [timePeriod, setTimePeriod] = useState("");
  const [characterFocus, setCharacterFocus] = useState("");
  
  // Screenplay step state
  const [writingStyle, setWritingStyle] = useState("");
  const [notes, setNotes] = useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStoryText(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      setCurrentStep('details');
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Handle file upload logic here
      console.log("File selected:", file.name);
    }
  };
  
  const handleContinue = () => {
    if (currentStep === 'details') {
      setCurrentStep('style');
    } else if (currentStep === 'style') {
      setCurrentStep('world');
    } else if (currentStep === 'world') {
      setCurrentStep('screenplay');
    }
    // Add more steps as needed
  };
  
  const handleGoBack = () => {
    if (currentStep === 'details') {
      setCurrentStep('story');
    } else if (currentStep === 'style') {
      setCurrentStep('details');
    } else if (currentStep === 'world') {
      setCurrentStep('style');
    } else if (currentStep === 'screenplay') {
      setCurrentStep('world');
    }
  };
  
  const handleGenerateScreenplay = () => {
    // This would handle the screenplay generation logic
    console.log('Generating screenplay with style:', writingStyle, 'and notes:', notes);
    // Future implementation would connect to an API or service
  };
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header */}
      <header className="border-b border-gray-200 py-3 px-6 flex justify-between items-center bg-white">
        <h1 className="text-lg font-medium text-gray-900">Idea Generation</h1>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-3 py-1.5 border border-gray-200 rounded-md hover:bg-gray-50 text-sm font-medium">
            <Folder className="w-4 h-4 mr-1 text-gray-500"/>
            My Projects
          </button>
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

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-20 bg-white">
        {currentStep === 'story' && (
          <div className="max-w-4xl w-full">
            <h2 className="text-5xl font-bold text-center mb-3 text-gray-900">Create Your Story</h2>
            <p className="text-center text-gray-500 mb-8 text-xs">
              Type your idea below. If you&apos;re not sure how, that&apos;s okay! Just write a few sentences that best describes your story idea.
            </p>

            {/* Input Card */}
            <div className="bg-white border border-gray-300 rounded-2xl p-3 overflow-hidden w-full">
              <div className="relative">
                <Textarea 
                  placeholder="Describe your story"
                  className="shadow-xl w-full border border-gray-300 rounded-2xl resize-none p-4 pb-16 min-h-[120px] text-base text-gray-800 focus:outline-none"
                  value={storyText}
                  onChange={handleTextChange}
                  onKeyDown={handleKeyDown}
                />
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept=".txt,.pdf,.docx" 
                  onChange={handleFileChange}
                />
                <div className="absolute bottom-0 left-0 right-0 px-4 py-3 flex justify-between items-center">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="shadow-md/20 flex items-center gap-2 hover:bg-transparent hover:text-gray-700 rounded-full bg-white px-4 py-2"
                    onClick={handleUploadClick}
                  >
                    <Link className="w-4 h-4" />
                    <span className="text-xs font-normal">Upload screen play</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    className="shadow-md/20 rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-50 border border-gray-200"
                    onClick={() => setCurrentStep('details')}
                  >
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 'details' && (
          <div className="max-w-4xl w-full relative">
            
            {/* Background image positioned at window's bottom left */}
            <div className="fixed bottom-0 left-0 z-0 opacity-80">
              <Image 
                src="/images/form1.png" 
                alt="Book with feather" 
                width={400}
                height={400}
                className="object-contain"
              />
            </div>
            
            {/* Story details form - centered */}
            <div className="flex justify-center relative z-10">
              <div className="w-1/2 bg-white bg-opacity-90 p-6 rounded-lg">
                {/* Progress indicator */}
                <div className="mb-12">
                <div className="flex items-center justify-center text-xs text-gray-500 mb-2">
                    <span>Step 2 of 10</span>
                </div>
                <div className="w-full bg-gray-200 h-1 rounded-full">
                    <div className="bg-black h-1 rounded-full" style={{ width: '20%' }}></div>
                </div>
                </div>
                <h2 className="text-4xl font-bold mb-2 text-gray-900">Story details</h2>
                <p className="text-sm text-gray-500 mb-8">
                  Let&apos;s add some more detail by choosing from the options below.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Genre</label>
                    <Select value={genre} onValueChange={setGenre}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="fantasy">Fantasy</SelectItem>
                        <SelectItem value="sci-fi">Science Fiction</SelectItem>
                        <SelectItem value="mystery">Mystery</SelectItem>
                        <SelectItem value="romance">Romance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Theme</label>
                    <Select value={theme} onValueChange={setTheme}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="coming-of-age">Coming of Age</SelectItem>
                        <SelectItem value="redemption">Redemption</SelectItem>
                        <SelectItem value="love">Love</SelectItem>
                        <SelectItem value="survival">Survival</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Audience</label>
                    <Select value={audience} onValueChange={setAudience}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="children">Children</SelectItem>
                        <SelectItem value="young-adult">Young Adult</SelectItem>
                        <SelectItem value="adult">Adult</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Emotions</label>
                    <Select value={emotions} onValueChange={setEmotions}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="joy">Joy</SelectItem>
                        <SelectItem value="sadness">Sadness</SelectItem>
                        <SelectItem value="fear">Fear</SelectItem>
                        <SelectItem value="surprise">Surprise</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button 
                      variant="outline" 
                      onClick={handleGoBack}
                      className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900"
                    >
                      Go Back
                    </Button>
                    <Button 
                      onClick={handleContinue}
                      className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {currentStep === 'style' && (
          <div className="max-w-4xl w-full relative">
            
            {/* Background image positioned at window's bottom left */}
            <div className="fixed bottom-0 left-0 z-0 opacity-80">
                <Image 
                  src="/images/form2.png" 
                alt="Color palette" 
                  width={400} 
                  height={400} 
                className="object-contain"
                />
              </div>
            
            {/* Story style form - centered */}
            <div className="flex justify-center relative z-10">
              <div className="w-1/2 bg-white bg-opacity-90 p-6 rounded-lg">
                {/* Progress indicator */}
                <div className="mb-12">
                <div className="flex items-center justify-center text-xs text-gray-500 mb-2">
                    <span>Step 3 of 10</span>
                </div>
                <div className="w-full bg-gray-200 h-1 rounded-full">
                    <div className="bg-black h-1 rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                <h2 className="text-4xl font-bold mb-2 text-gray-900">Story Style and Format</h2>
                <p className="text-sm text-gray-500 mb-8">
                  Let&apos;s define the tone and format of your story.
                </p>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Tone/Mood</label>
                      <Select value={tone} onValueChange={setTone}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="lighthearted">Lighthearted</SelectItem>
                          <SelectItem value="serious">Serious</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="humorous">Humorous</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Format</label>
                      <Select value={format} onValueChange={setFormat}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="novel">Novel</SelectItem>
                          <SelectItem value="short-story">Short Story</SelectItem>
                          <SelectItem value="screenplay">Screenplay</SelectItem>
                          <SelectItem value="poem">Poem</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="flex justify-between pt-4">
                      <Button 
                        variant="outline" 
                        onClick={handleGoBack}
                      className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900"
                      >
                        Go Back
                      </Button>
                      <Button
                        onClick={handleContinue}
                        className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
                      >
                      Continue
                      </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* World and Character step */}
        {currentStep === 'world' && (
          <div className="max-w-4xl w-full relative">
            
            {/* Background image positioned at window's bottom left */}
            <div className="fixed bottom-0 left-0 z-0 opacity-80">
              <Image 
                src="/images/form3.png" 
                alt="World and Character illustration" 
                width={400} 
                height={400} 
                className="object-contain"
              />
            </div>
            
            {/* World and Character form - centered */}
            <div className="flex justify-center relative z-10">
              <div className="w-1/2 bg-white bg-opacity-90 p-6 rounded-lg">
                {/* Progress indicator */}
                <div className="mb-12">
                  <div className="flex items-center justify-center text-xs text-gray-500 mb-2">
                    <span>Step 4 of 10</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1 rounded-full">
                    <div className="bg-black h-1 rounded-full" style={{ width: '40%' }}></div>
                  </div>
                </div>
                <h2 className="text-4xl font-bold mb-2 text-gray-900">World and Character</h2>
                <p className="text-sm text-gray-500 mb-8">
                  Let&apos;s define the tone and format of your story.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Setting</label>
                    <Select value={setting} onValueChange={setSetting}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="urban">Urban</SelectItem>
                        <SelectItem value="rural">Rural</SelectItem>
                        <SelectItem value="fantasy">Fantasy World</SelectItem>
                        <SelectItem value="space">Outer Space</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Time Period</label>
                    <Select value={timePeriod} onValueChange={setTimePeriod}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="past">Historical Past</SelectItem>
                        <SelectItem value="present">Present Day</SelectItem>
                        <SelectItem value="future">Future</SelectItem>
                        <SelectItem value="timeless">Timeless/Mythical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Character Focus</label>
                    <Select value={characterFocus} onValueChange={setCharacterFocus}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="individual">Individual</SelectItem>
                        <SelectItem value="group">Group/Ensemble</SelectItem>
                        <SelectItem value="society">Society</SelectItem>
                        <SelectItem value="nonhuman">Non-human</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button 
                      variant="outline" 
                      onClick={handleGoBack}
                      className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900"
                    >
                      Go Back
                    </Button>
                    <Button 
                      onClick={handleContinue}
                      className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
                    >
                      Continue
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Screenplay step */}
        {currentStep === 'screenplay' && (
          <div className="max-w-4xl w-full relative">
            
            {/* Background image positioned at window's bottom left */}
            <div className="fixed bottom-0 left-0 z-0 opacity-80">
              <Image 
                src="/images/form4.png" 
                alt="Film roll illustration" 
                width={400} 
                height={400} 
                className="object-contain"
              />
            </div>
            
            {/* Screenplay form - centered */}
            <div className="flex justify-center relative z-10">
              <div className="w-1/2 bg-white bg-opacity-90 p-6 rounded-lg">
                {/* Progress indicator */}
                <div className="mb-12">
                  <div className="flex items-center justify-center text-xs text-gray-500 mb-2">
                    <span>Step 5 of 10</span>
                  </div>
                  <div className="w-full bg-gray-200 h-1 rounded-full">
                    <div className="bg-black h-1 rounded-full" style={{ width: '50%' }}></div>
                  </div>
                </div>
                <h2 className="text-4xl font-bold mb-2 text-gray-900">Screenplay</h2>
                <p className="text-sm text-gray-500 mb-8">
                  Let&apos;s define the tone and format of your story.
                </p>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Writing Style</label>
                    <Select value={writingStyle} onValueChange={setWritingStyle}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="experimental">Experimental</SelectItem>
                        <SelectItem value="indie">Indie</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Notes</label>
                    <Textarea 
                      placeholder="Type your message here." 
                      className="min-h-[120px] w-full p-3 border border-gray-300 rounded-md" 
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                    />
                  </div>
                  
                  <div className="flex justify-between pt-4">
                    <Button 
                      variant="outline" 
                      onClick={handleGoBack}
                      className="px-6 py-2 border border-gray-300 rounded-md hover:bg-gray-50 hover:text-gray-900"
                    >
                      Go Back
                    </Button>
                    <Button 
                      onClick={handleGenerateScreenplay}
                      className="px-6 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800"
                    >
                      Generate Screen play
                    </Button>
                  </div>
                  
                  <div className="text-xs text-gray-500 text-center mt-4">
                    This will take 30-60 seconds to generate your personalized screenplay.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
      </main>
    </div>
  );
}
