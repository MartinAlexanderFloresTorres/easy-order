import { Image } from '@/shared/interfaces';
import { Review } from '.';

export interface SearchedRestaurantByProvider {
  location: LocationSearchedRestaurantByProvider;
  _id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
  closingTime: string;
  banner: Image;
  logo: Image;
  tables: string[]; // falta
  servicesOffered: string[]; // falta
  acceptsReservations: boolean;
  acceptsDelivery: boolean;
  averageRating: number;
  paymentMethods: PaymentMethodSearchedRestaurantByProvider[];
  website: string;
  socialMedia: SocialMediaSearchedRestaurantByProvider[];
  gallery: Image[];
  reviews: Review[];
  specialHours: string[]; // falta
  createdAt: string;
  slug: string;
}

export interface LocationSearchedRestaurantByProvider {
  latitude: number;
  longitude: number;
}

export interface PaymentMethodSearchedRestaurantByProvider {
  name: string;
  image: string;
  _id: string;
}

export interface SocialMediaSearchedRestaurantByProvider {
  platform: string;
  image: string;
  link: string;
  _id: string;
}
