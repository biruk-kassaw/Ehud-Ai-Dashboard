import axiosInstance from '@/lib/axios';

export interface GenerateSoundEffectRequest {
  text: string;
  duration: number | null;
}

export interface GenerateSoundEffectResponse {
  success: boolean;
  data: {
    audio: string;
    contentType: string;
  };
}

export const generateSoundEffect = async (data: GenerateSoundEffectRequest): Promise<GenerateSoundEffectResponse> => {
  try {
    const response = await axiosInstance.post<GenerateSoundEffectResponse>('/generate-elevenlabs-voice/sound-effect', data);
    return response.data;
  } catch (error) {
    console.error('Error generating sound effect:', error);
    throw error;
  }
};
