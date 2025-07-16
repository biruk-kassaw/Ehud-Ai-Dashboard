import axiosInstance from '@/lib/axios';

export interface EditImageRequest {
  prompt: string;
  image: string;
}

export interface EditImageResponse {
  success: boolean;
  imageData: {
    b64_json: string;
    prompt: string;
    aspectRatio: string;
    generatedAt: string;
    group: string;
  }[];
}

export const editImage = async (data: EditImageRequest): Promise<EditImageResponse> => {
  try {
    const response = await axiosInstance.post<EditImageResponse>('/edit-image', data);
    return response.data;
  } catch (error) {
    console.error('Error editing image:', error);
    throw error;
  }
};
