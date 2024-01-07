import { Image } from '@/shared/interfaces';

export interface Category {
  _id: string;
  name: string;
  slug: string;
  description: string;
  restaurant: string;
  banner: Image | null;
  image: Image | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
