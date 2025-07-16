import axiosInstance from '@/lib/axios';

export interface ReferenceImage {
  uri: string;
  tag: string;
}

export interface RunwayGenerateRequest {
  model: string;
  ratio: string;
  promptText: string;
  referenceImages: ReferenceImage[];
}

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

export const generateRunwayImage = async (data: RunwayGenerateRequest): Promise<GenerateImageResponse> => {
  try {
    const response = await axiosInstance.post<GenerateImageResponse>('/generate-runway-image', data);
    return response.data;
  } catch (error) {
    console.error('Error generating Runway image:', error);
    throw error;
  }
};

export const generateFluxImage = async (data: GenerateImageRequest): Promise<GenerateImageResponse> => {
  try {
    const response = await axiosInstance.post<GenerateImageResponse>('/generate-flux-image', data);
    return response.data;
  } catch (error) {
    console.error('Error generating Flux image:', error);
    throw error;
  }
};
