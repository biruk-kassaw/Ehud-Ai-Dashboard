import axiosInstance from '@/lib/axios';

export interface GenerateVideoRequest {
  isImageToVideo: boolean;
  image: string;
  prompt: string;
  negativePrompt?: string;
  model: string;
  duration: number;
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

interface VeoVideoResponse {
  success: boolean;
  message: string;
  data: {
    videos: string[];
  };
}

export const generateVeoVideo = async (data: GenerateVideoRequest): Promise<GenerateVideoResponse> => {
  try {
    const response = await axiosInstance.post<VeoVideoResponse>('/generate-veo-video', data);
    const veoData = response.data;

    return {
      success: veoData.success,
      videoData: {
        url: veoData.data.videos[0],
        prompt: data.prompt,
        model: data.model,
        duration: data.duration,
        generatedAt: new Date().toISOString()
      }
    };
  } catch (error) {
    console.error('Error generating Veo video:', error);
    throw error;
  }
};
