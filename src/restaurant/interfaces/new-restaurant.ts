export interface NewRestaurant {
  name: string;
  description: string;
  address: string;
  phone: string;
  email: string;
  openingHours: string;
  closingTime: string;
  banner: File | null;
  logo: File | null;
  gallery: File[];
  location: {
    latitude: number;
    longitude: number;
  };
  tables: string[];
  servicesOffered: string[];
  acceptsReservations: boolean;
  acceptsDelivery: boolean;
  paymentMethods: PaymentMethod[];
  specialHours: SpecialHours[];
  website: string;
  socialMedia: SocialMedia[];
}

export interface PaymentMethod {
  name: string;
  image: string;
}

export interface SpecialHours {
  uniqueEspecialDay: string | null;
  day: string | null;
  description: string;
  openingTime: string;
  closingTime: string;
}

export interface SocialMedia {
  platform: string;
  image: string;
  link: string;
}
