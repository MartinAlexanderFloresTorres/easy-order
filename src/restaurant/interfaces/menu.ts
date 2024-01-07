import { Image } from '@/shared/interfaces';

export interface Menu {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  stockDaily: number;
  category: {
    _id: string;
    name: string;
  };
  restaurant: string;
  isActive: boolean;
  nutritionalInformation: NutritionalInformation[];
  ingredients: string[];
  images: Image[];
  ratings: Rating[];
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
}
export interface Rating {
  _id: string;
  user: string;
  rating: number;
  comment: string;
}

export interface NutritionalInformation {
  id: string;
  name: string;
  value: string;
  _id: string;
}
