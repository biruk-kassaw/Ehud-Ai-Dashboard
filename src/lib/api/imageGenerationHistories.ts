import { ImageGenerationHistory } from '@/types/imageGenerationHistory';
import axiosInstance from '@/lib/axios';

export const getImageGenerationHistories = async (): Promise<ImageGenerationHistory[]> => {
  try {
    const response = await axiosInstance.get<{ data: ImageGenerationHistory[] }>(
      '/image-generation-histories'
    );
    return response.data.data; 
  } catch (error) {
    console.error('Error fetching image generation histories:', error);
    throw error;
  }
};
