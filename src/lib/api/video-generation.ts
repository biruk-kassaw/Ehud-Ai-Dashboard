import axiosInstance from '@/lib/axios';

export interface GenerateVideoRequest {
  images: string[];
  prompt: string;
  negativePrompt?: string;
  model?: string;
  duration?: number;
}

export interface GeneratedVideo {
  url: string;
  prompt: string;
  model: string;
  duration: number;
  generatedAt: string;
}

export interface GenerateVideoResponse {
  success: boolean;
  videoData: GeneratedVideo;
}

export const generateVideo = async (data: GenerateVideoRequest): Promise<GenerateVideoResponse> => {
  try {
    const response = await axiosInstance.post<GenerateVideoResponse>('/generate-video', data);
    return response.data;
  } catch (error) {
    console.error('Error generating video:', error);
    throw error;
  }
};
