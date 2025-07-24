import axiosInstance from '@/lib/axios';

export interface Voice {
  voice_id: string;
  name: string;
  labels: {
    accent: string;
    descriptive: string;
    age: string;
    gender: string;
    language: string;
    use_case: string;
  };
  preview_url: string;
}

export interface GetVoicesResponse {
  success: boolean;
  data: Voice[];
}

export interface TextToSpeechRequest {
  text: string;
  voiceId: string;
}

export interface SpeechToSpeechRequest {
  audio: File;
  voiceId: string;
}

export interface AudioResponse {
  success: boolean;
  message?: string;
  data: {
    audio: string;
    contentType: string;
  };
}

export const getVoices = async (): Promise<GetVoicesResponse> => {
  try {
    const response = await axiosInstance.get<GetVoicesResponse>('/generate-elevenlabs-voice/voices');
    return response.data;
  } catch (error) {
    console.error('Error fetching voices:', error);
    throw error;
  }
};

export const generateTextToSpeech = async (data: TextToSpeechRequest): Promise<AudioResponse> => {
  try {
    const response = await axiosInstance.post<AudioResponse>('/generate-elevenlabs-voice/text-to-speech', data);
    return response.data;
  } catch (error) {
    console.error('Error generating text to speech:', error);
    throw error;
  }
};

export const generateSpeechToSpeech = async (data: SpeechToSpeechRequest): Promise<AudioResponse> => {
  try {
    const formData = new FormData();
    formData.append('audio', data.audio);
    formData.append('voiceId', data.voiceId);

    const response = await axiosInstance.post<AudioResponse>(
      '/generate-elevenlabs-voice/speech-to-speech', 
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error converting speech:', error);
    throw error;
  }
};
