"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import {
  Volume2,
  Play,
  Pause,
  Download,
  Upload,
  Mic,
  MicOff,
  RotateCcw,
  AudioWaveformIcon as Waveform,
  User,
  Bot,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { getVoices, generateTextToSpeech, generateSpeechToSpeech, type Voice } from "@/lib/api/voice"

export default function VoicePage() {
  const [activeTab, setActiveTab] = useState<"text-to-speech" | "speech-to-speech">("text-to-speech")

  // Text-to-Speech state
  const [textInput, setTextInput] = useState("")
  const [selectedVoice, setSelectedVoice] = useState<string>("")  
  const [availableVoices, setAvailableVoices] = useState<Voice[]>([])
  const [speed, setSpeed] = useState([1.0])
  const [pitch, setPitch] = useState([1.0])
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedAudio, setGeneratedAudio] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioDuration, setAudioDuration] = useState<number>(0)
  const [currentTime, setCurrentTime] = useState<number>(0)

  // Speech-to-Speech state
  const [uploadedAudio, setUploadedAudio] = useState<File | null>(null)
  const [targetVoice, setTargetVoice] = useState<string>("") // Will be set to first voice
  const [isRecording, setIsRecording] = useState(false)
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null)
  const [recordedAudio, setRecordedAudio] = useState<File | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [convertedAudio, setConvertedAudio] = useState<string | null>(null)
  const [convertedAudioDuration, setConvertedAudioDuration] = useState<number>(0)
  const [convertedAudioCurrentTime, setConvertedAudioCurrentTime] = useState<number>(0)
  const [isConvertedAudioPlaying, setIsConvertedAudioPlaying] = useState(false)

  const fileInputRef = useRef<HTMLInputElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  // Fetch voices on component mount
  useEffect(() => {
    const fetchVoices = async () => {
      try {
        const response = await getVoices();
        setAvailableVoices(response.data);
        if (response.data.length > 0) {
          setSelectedVoice(response.data[0].voice_id);
        }
      } catch (error) {
        console.error('Error fetching voices:', error);
      }
    };

    fetchVoices();
  }, []);

  const languages = [
    { value: "en-US", label: "English (US)" },
    { value: "en-GB", label: "English (UK)" },
    { value: "es-ES", label: "Spanish (Spain)" },
    { value: "es-MX", label: "Spanish (Mexico)" },
    { value: "fr-FR", label: "French (France)" },
    { value: "de-DE", label: "German (Germany)" },
    { value: "it-IT", label: "Italian (Italy)" },
    { value: "pt-BR", label: "Portuguese (Brazil)" },
    { value: "ja-JP", label: "Japanese (Japan)" },
    { value: "ko-KR", label: "Korean (South Korea)" },
    { value: "zh-CN", label: "Chinese (Mandarin)" },
  ]

  const sampleTexts = [
    "Welcome to our platform. We're excited to have you here and look forward to helping you achieve your goals.",
    "The quick brown fox jumps over the lazy dog. This sentence contains every letter of the alphabet.",
    "In a world where technology advances rapidly, artificial intelligence continues to reshape how we communicate.",
    "Once upon a time, in a land far away, there lived a wise old wizard who possessed magical powers.",
    "Good morning! Today's weather forecast shows sunny skies with a high of 75 degrees Fahrenheit.",
  ]

  const handleGenerateVoice = async () => {
    if (!textInput.trim() || !selectedVoice) return

    setIsGenerating(true)
    try {
      const response = await generateTextToSpeech({
        text: textInput,
        voiceId: selectedVoice
      });
      
      const audioData = `data:${response.data.contentType};base64,${response.data.audio}`;
      setGeneratedAudio(audioData);
      
      // Reset audio state
      setIsPlaying(false);
      setCurrentTime(0);
      
      // Load audio duration after a short delay to ensure audio is loaded
      if (audioRef.current) {
        audioRef.current.src = audioData;
        audioRef.current.load();
        audioRef.current.addEventListener('loadedmetadata', () => {
          setAudioDuration(audioRef.current?.duration || 0);
        });
      }
    } catch (error) {
      console.error('Error generating voice:', error);
    } finally {
      setIsGenerating(false)

    }
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.type.startsWith("audio/")) {
      setUploadedAudio(file)
    }
  }

  const handleUploadClick = () => {
    fileInputRef.current?.click()
  }

  const toggleRecording = async () => {
    if (isRecording) {
      // Stop recording
      mediaRecorder?.stop()
      setIsRecording(false)
    } else {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        const recorder = new MediaRecorder(stream)
        
        const chunks: Blob[] = []
        recorder.ondataavailable = (e) => chunks.push(e.data)
        
        recorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/webm' })
          const file = new File([blob], 'recorded-audio.webm', { type: 'audio/webm' })
          setRecordedAudio(file)
          
          // Stop all tracks
          stream.getTracks().forEach(track => track.stop())
        }
        
        recorder.start()
        setMediaRecorder(recorder)
        setIsRecording(true)
      } catch (error) {
        console.error('Error starting recording:', error)
      }
    }
  }

  const handleConvertVoice = async () => {
    const audioFile = uploadedAudio || recordedAudio
    if (!audioFile || !targetVoice) return

    setIsConverting(true)
    try {
      const response = await generateSpeechToSpeech({
        audio: audioFile,
        voiceId: targetVoice
      });

      const audioData = `data:${response.data.contentType};base64,${response.data.audio}`;
      setConvertedAudio(audioData);
      setIsConvertedAudioPlaying(false);
      setConvertedAudioCurrentTime(0);

      // Load audio duration
      if (audioRef.current) {
        audioRef.current.src = audioData;
        audioRef.current.load();
        audioRef.current.addEventListener('loadedmetadata', () => {
          setConvertedAudioDuration(audioRef.current?.duration || 0);
        });
      }
    } catch (error) {
      console.error('Error converting voice:', error);
    } finally {
      setIsConverting(false);
    }
  }

  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  // Update current time while playing
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setCurrentTime(audio.currentTime);
    };

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Header */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">Voice Generation</h1>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl">
                Generate natural-sounding voices from text or convert between different voice styles.
              </p>
            </div>

            {/* Usage Stats */}
            <div className="hidden lg:block">
              <div className="text-right mb-2">
                <span className="text-sm text-gray-500">Available generations:</span>
              </div>
              <div className="w-64 bg-gray-200 rounded-full h-2 mb-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: "60%" }}></div>
              </div>
              <div className="text-sm text-gray-600">Remaining 28 generation(s) ⓘ</div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1 w-fit">
            <Button
              onClick={() => setActiveTab("text-to-speech")}
              variant={activeTab === "text-to-speech" ? "default" : "ghost"}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "text-to-speech"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Bot className="w-4 h-4 mr-2" />
              Text to Speech
            </Button>
            <Button
              onClick={() => setActiveTab("speech-to-speech")}
              variant={activeTab === "speech-to-speech" ? "default" : "ghost"}
              className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
                activeTab === "speech-to-speech"
                  ? "bg-white text-gray-900 shadow-sm"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <User className="w-4 h-4 mr-2" />
              Speech to Speech
            </Button>
          </div>
        </div>

        {/* Text to Speech Tab */}
        {activeTab === "text-to-speech" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Text Input Section */}
              <div className="bg-gray-50 rounded-2xl p-8 sm:p-12 border border-gray-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl sm:text-2xl font-semibold text-gray-900">Enter Your Text</h3>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline" onClick={() => setTextInput("")}>
                      <RotateCcw className="w-4 h-4 mr-1" />
                      Clear
                    </Button>
                  </div>
                </div>

                <Textarea
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  placeholder="Enter the text you want to convert to speech..."
                  className="min-h-40 resize-none bg-white border-gray-300 focus:border-blue-500 text-base"
                  maxLength={1000}
                />

                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-gray-500">{textInput.length}/1000 characters</span>
                  <div className="text-sm text-gray-500">
                    Estimated duration: ~{Math.ceil(textInput.length / 200)} minutes
                  </div>
                </div>
              </div>

              {/* Sample Texts */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="px-4 text-gray-500 font-medium">Or try these sample texts</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {sampleTexts.map((sampleText, index) => (
                    <button
                      key={index}
                      onClick={() => setTextInput(sampleText)}
                      className="p-4 text-left bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <Volume2 className="w-5 h-5 text-blue-600" />
                        </div>
                        <p className="text-gray-700 leading-relaxed">{sampleText}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Generated Audio Player */}
              {generatedAudio && (
                <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Generated Voice</h3>
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={togglePlayback}
                      size="icon"
                      className="w-12 h-12 rounded-full bg-blue-600 hover:bg-blue-700"
                    >
                      {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </Button>

                    <div className="flex-1">
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ 
                            width: `${(currentTime / audioDuration) * 100}%` 
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>{formatTime(currentTime)}</span>
                        <span>{formatTime(audioDuration)}</span>
                      </div>
                    </div>

                    <Button variant="outline" size="icon" className="w-10 h-10 bg-transparent">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>

                  <audio ref={audioRef} src={generatedAudio} className="hidden" />
                </div>
              )}
            </div>

            {/* Sidebar Controls */}
            <div className="space-y-6">
              {/* Voice Settings */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Voice Settings</h3>

                <div className="space-y-4">
                  {/* Voice Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Voice</label>
                    <Select
                      value={selectedVoice}
                      onValueChange={setSelectedVoice}
                    >
                      <SelectTrigger className="w-full bg-white border-gray-300 focus:border-blue-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200">
                        {availableVoices.map((voice) => (
                          <SelectItem
                            key={voice.voice_id}
                            value={voice.voice_id}
                            className="cursor-pointer hover:bg-gray-50"
                          >
                            <div>
                              <div className="font-medium">{voice.name}</div>
                              <div className="text-sm text-gray-500">
                                {voice.labels.descriptive} {voice.labels.accent} accent
                              </div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Language */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
                    <Select defaultValue="en-US">
                      <SelectTrigger className="w-full bg-white border-gray-300 focus:border-blue-500">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200 max-h-80">
                        {languages.map((language) => (
                          <SelectItem
                            key={language.value}
                            value={language.value}
                            className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
                          >
                            {language.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Speed Control */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Speed: {speed[0]}x</label>
                    <Slider value={speed} onValueChange={setSpeed} max={2} min={0.5} step={0.1} className="w-full" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0.5x</span>
                      <span>2.0x</span>
                    </div>
                  </div>

                  {/* Pitch Control */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Pitch: {pitch[0]}x</label>
                    <Slider value={pitch} onValueChange={setPitch} max={2} min={0.5} step={0.1} className="w-full" />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>0.5x</span>
                      <span>2.0x</span>
                    </div>
                  </div>
                </div>

                {/* Generate Button */}
                <Button
                  onClick={handleGenerateVoice}
                  disabled={!textInput.trim() || isGenerating}
                  className="w-full mt-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGenerating ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Generating...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Volume2 className="w-5 h-5" />
                      <span>Generate Voice</span>
                    </div>
                  )}
                </Button>
              </div>

              {/* Mobile Usage Stats */}
              <div className="lg:hidden bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-2">Available generations:</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: "60%" }}></div>
                  </div>
                  <div className="text-sm text-gray-600">Remaining 28 generation(s) ⓘ</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Speech to Speech Tab */}
        {activeTab === "speech-to-speech" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Audio Input Section */}
              <div className="bg-gray-50 rounded-2xl p-8 sm:p-12 border border-gray-200">
                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">Input Audio</h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {/* Upload Audio */}
                  <div
                    onClick={handleUploadClick}
                    className="aspect-square border-2 border-dashed border-gray-300 hover:border-gray-400 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 hover:bg-gray-100/50"
                  >
                    <div className="text-center">
                      <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                        <Upload className="w-6 h-6 text-blue-600" />
                      </div>
                      <p className="text-lg font-medium text-gray-700 mb-1">Upload Audio</p>
                      <p className="text-sm text-gray-500">MP3, WAV, M4A up to 10MB</p>
                      {uploadedAudio && <p className="text-sm text-green-600 mt-2">✓ {uploadedAudio.name}</p>}
                    </div>
                  </div>

                  {/* Record Audio */}
                  <div
                    onClick={toggleRecording}
                    className={`aspect-square border-2 border-dashed rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200 ${
                      isRecording
                        ? "border-red-400 bg-red-50 hover:bg-red-100"
                        : "border-gray-300 hover:border-gray-400 hover:bg-gray-100/50"
                    }`}
                  >
                    <div className="text-center">
                      <div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3 ${
                          isRecording ? "bg-red-100" : "bg-green-100"
                        }`}
                      >
                        {isRecording ? (
                          <MicOff className="w-6 h-6 text-red-600" />
                        ) : (
                          <Mic className="w-6 h-6 text-green-600" />
                        )}
                      </div>
                      <p className={`text-lg font-medium mb-1 ${isRecording ? "text-red-700" : "text-gray-700"}`}>
                        {isRecording ? "Stop Recording" : "Record Audio"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {isRecording ? "Click to stop" : "Click to start recording"}
                      </p>
                      {recordedAudio && !isRecording && (
                        <p className="text-sm text-green-600 mt-2">✓ Recording saved</p>
                      )}
                    </div>
                  </div>
                </div>

                {isRecording && (
                  <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-red-700 font-medium">Recording... 0:15</span>
                      <div className="flex-1">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 20 }, (_, i) => (
                            <div
                              key={i}
                              className="w-1 bg-red-400 rounded-full animate-pulse"
                              style={{
                                height: `${Math.random() * 20 + 10}px`,
                                animationDelay: `${i * 50}ms`,
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                <input ref={fileInputRef} type="file" accept="audio/*" onChange={handleFileUpload} className="hidden" />
              </div>

              {/* Converted Audio Player */}
              {convertedAudio && (
                <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200">
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Converted Voice</h3>
                  <div className="flex items-center gap-4">
                    <Button
                      onClick={() => {
                        if (audioRef.current) {
                          if (isConvertedAudioPlaying) {
                            audioRef.current.pause();
                          } else {
                            audioRef.current.play();
                          }
                          setIsConvertedAudioPlaying(!isConvertedAudioPlaying);
                        }
                      }}
                      size="icon"
                      className="w-12 h-12 rounded-full bg-green-600 hover:bg-green-700"
                    >
                      {isConvertedAudioPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                    </Button>

                    <div className="flex-1">
                      <div className="w-full bg-gray-300 rounded-full h-2">
                        <div 
                          className="bg-green-600 h-2 rounded-full" 
                          style={{ 
                            width: `${(convertedAudioCurrentTime / convertedAudioDuration) * 100}%` 
                          }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-gray-500 mt-1">
                        <span>{formatTime(convertedAudioCurrentTime)}</span>
                        <span>{formatTime(convertedAudioDuration)}</span>
                      </div>
                    </div>

                    <Button 
                      variant="outline" 
                      size="icon" 
                      className="w-10 h-10 bg-transparent"
                      onClick={() => {
                        const a = document.createElement('a');
                        a.href = convertedAudio;
                        a.download = 'converted-voice.mp3';
                        document.body.appendChild(a);
                        a.click();
                        document.body.removeChild(a);
                      }}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>

                  <audio 
                    ref={audioRef} 
                    src={convertedAudio} 
                    className="hidden" 
                    onTimeUpdate={() => {
                      if (audioRef.current) {
                        setConvertedAudioCurrentTime(audioRef.current.currentTime);
                      }
                    }}
                    onEnded={() => {
                      setIsConvertedAudioPlaying(false);
                      setConvertedAudioCurrentTime(0);
                    }}
                  />
                </div>
              )}
            </div>

            {/* Sidebar Controls */}
            <div className="space-y-6">
              {/* Conversion Settings */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Conversion Settings</h3>

                <div className="space-y-4">
                  {/* Target Voice */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Target Voice</label>
                    <Select value={targetVoice} onValueChange={setTargetVoice}>
                      <SelectTrigger className="w-full bg-white border-gray-300 focus:border-green-500">
                        <SelectValue placeholder="Select target voice" />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200 max-h-80">
                        {availableVoices.map((voice) => (
                          <SelectItem
                            key={voice.voice_id}
                            value={voice.voice_id}
                            className="cursor-pointer hover:bg-gray-50 focus:bg-gray-50"
                          >
                            <div className="flex flex-col">
                              <span className="font-medium">{voice.name}</span>
                              <span className="text-xs text-gray-500">{voice.labels.gender + ", " + voice.labels.age + ", " + voice.labels.language}</span>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Preserve Settings */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">Preserve</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-600">Speech timing</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          defaultChecked
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-600">Emotional tone</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-600">Background noise</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
                        />
                        <span className="text-sm text-gray-600">Accent characteristics</span>
                      </label>
                    </div>
                  </div>

                  {/* Quality Settings */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Output Quality</label>
                    <Select defaultValue="high">
                      <SelectTrigger className="w-full bg-white border-gray-300 focus:border-green-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-200">
                        <SelectItem value="standard" className="cursor-pointer hover:bg-gray-50">
                          Standard (128 kbps)
                        </SelectItem>
                        <SelectItem value="high" className="cursor-pointer hover:bg-gray-50">
                          High (256 kbps)
                        </SelectItem>
                        <SelectItem value="premium" className="cursor-pointer hover:bg-gray-50">
                          Premium (320 kbps)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Convert Button */}
                <Button
                  onClick={handleConvertVoice}
                  disabled={(!uploadedAudio && !recordedAudio) || isConverting}
                  className="w-full mt-6 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isConverting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Converting...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      <Waveform className="w-5 h-5" />
                      <span>Convert Voice</span>
                    </div>
                  )}
                </Button>
              </div>

              {/* Mobile Usage Stats */}
              <div className="lg:hidden bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <div className="text-center">
                  <div className="text-sm text-gray-500 mb-2">Available conversions:</div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{ width: "40%" }}></div>
                  </div>
                  <div className="text-sm text-gray-600">Remaining 18 conversion(s) ⓘ</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Processing Overlays */}
        {(isGenerating || isConverting) && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-xl max-w-sm mx-4 text-center">
              <div
                className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                  isGenerating ? "bg-blue-100" : "bg-green-100"
                }`}
              >
                <Volume2 className={`w-8 h-8 animate-pulse ${isGenerating ? "text-blue-600" : "text-green-600"}`} />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {isGenerating ? "Generating Voice" : "Converting Voice"}
              </h3>
              <p className="text-gray-600 mb-4">
                {isGenerating
                  ? "Creating natural-sounding speech from your text..."
                  : "Converting to your selected voice style..."}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`h-2 rounded-full animate-pulse ${isGenerating ? "bg-blue-600" : "bg-green-600"}`}
                  style={{ width: "70%" }}
                ></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
