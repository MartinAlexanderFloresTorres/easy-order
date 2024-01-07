import { Image } from '@/shared/interfaces';

export interface SearchedRestaurant {
  _id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
  closingTime: string;
  slug: string;
  subscription: SubscriptionSearchedRestaurant;
  logo: Image;
  banner: Image;
  gallery: Image[];
}

export interface SubscriptionSearchedRestaurant {
  plan: PlanSearchedRestaurant;
}

export interface PlanSearchedRestaurant {
  _id: string;
  name: string;
  price: number;
}
