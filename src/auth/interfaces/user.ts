import { Image } from '@/shared/interfaces';

export interface User {
  _id: string;
  name: string;
  slug: string;
  lastname: string;
  email: string;
  phone: string | null;
  photo: Image | null;
  city: string;
  country: string;
  subscriptionPlan: string | null;
  restaurant: {
    _id: string;
    name: string;
    slug: string;
  } | null;
}
