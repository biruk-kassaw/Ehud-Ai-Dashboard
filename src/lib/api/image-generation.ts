import axiosInstance from '@/lib/axios';

export interface GenerateImageRequest {
  prompt: string;
  aspectRatio: string;
  model: string;
  n: number;
}

export interface GeneratedImage {
  b64_json: string;
  prompt: string;
  aspectRatio: string;
  model: string;
  generatedAt: string;
  group: string;
}

export interface GenerateImageResponse {
  success: boolean;
  imageData: GeneratedImage[];
}

export const generateImage = async (data: GenerateImageRequest): Promise<GenerateImageResponse> => {
  try {
    const response = await axiosInstance.post<GenerateImageResponse>('/generate-image', data);
    return response.data;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};
