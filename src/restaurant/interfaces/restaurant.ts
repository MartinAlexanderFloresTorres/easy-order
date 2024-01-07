import { Image } from '@/shared/interfaces';

export interface Restaurant {
  subscription: SubscriptionRestaurant;
  location: LocationRestaurant;
  _id: string;
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
  closingTime: string;
  apiTokens: string;
  isActive: boolean;
  isVerified: boolean;
  isBlocked: boolean;
  banner: Image;
  logo: Image;
  tables: TableRestaurant[];
  servicesOffered: string[];
  acceptsReservations: boolean;
  acceptsDelivery: boolean;
  averageRating: number;
  paymentMethods: PaymentMethodRestaurant[];
  website: string;
  socialMedia: SocialMediaRestaurant[];
  gallery: Image[];
  additionalUsers: UserAditionalRestaurant[];
  reviews: Review[];
  specialHours: SpecialHour[];
  owner: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  __v: number;
}
export interface LocationRestaurant {
  latitude: number;
  longitude: number;
}

export interface SpecialHour {
  uniqueEspecialDay: Date | null;
  day: string | null;
  description: string;
  openingTime: string;
  closingTime: string;
}
export interface Review {
  user: UserAditionalRestaurant;
  rating: number;
  comment: string;
}

export interface UserAditionalRestaurant {
  _id: string;
  name: string;
  slug: string;
  lastname: string;
  photo: string | null;
  city: string;
  country: string;
  /* restaurant: {
    _id: string;
    name: string;
    slug: string;
  } | null; */
}

export interface TableRestaurant {
  restaurant: string;
  tableNumber: number;
  capacity: number;
  isOccupied: boolean;
  reservation: string;
  isActive: boolean;
}

export interface PaymentMethodRestaurant {
  name: string;
  image: string;
  _id: string;
}

export interface SocialMediaRestaurant {
  platform: string;
  image: string;
  link: string;
  _id: string;
}

export interface SubscriptionRestaurant {
  plan: string;
  startDate: string;
  expirationDate: string;
  renovationDate: string;
  status: string;
}
