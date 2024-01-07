import { Image } from '@/shared/interfaces';
import { Rating } from '.';

export interface SearchedMenu {
  _id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  stock: number;
  category: CategorySearchedMenu;
  restaurant: {
    _id: string;
    address: string;
    logo: Image;
    name: string;
    slug: string;
  };
  images: Image[];
  ratings: Rating[];
  createdAt: string;
  updatedAt: string;
  slug: string;
}

export interface CategorySearchedMenu {
  _id: string;
  name: string;
  slug: string;
}
