export type SpotDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'pro';
export type SpotType = 'street' | 'park' | 'diy' | 'transition' | 'flatground';
export type SpotFeature = 'rails' | 'stairs' | 'ledges' | 'gaps' | 'manual_pads' | 'banks' | 'quarterpipe' | 'halfpipe' | 'bowl' | 'pyramid' | 'flat_bar' | 'handrail';

export interface Spot {
  id: string;
  name: string;
  description: string;
  type: SpotType;
  latitude: number;
  longitude: number;
  address?: string;
  images: string[];
  features: SpotFeature[];
  difficulty: SpotDifficulty;
  created_by: string;
  created_at: string;
  updated_at: string;
  rating: number;
  total_ratings: number;
  likes: number;
  comments: number;
  is_favorite: boolean;
} 