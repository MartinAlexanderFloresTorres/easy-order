import { OrderStatus, PaymentStatus } from '@/restaurant/types';
import { Image } from '@/shared/interfaces';

export interface Order {
  _id: string;
  restaurant: OrderRestaurant;
  status: OrderStatus;
  shippingCost: number;
  latitude: number;
  longitude: number;
  discount: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  items: OrderItem[];
  subTotal: number;
  total: number;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
  user: {
    city: string;
    country: string;
    lastname: string;
    name: string;
    phone: string | null;
    photo: Image | null;
    slug: string;
    _id: string;
  };
}

export interface OrderItem {
  menu: OrderMenu;
  discount: number;
  price: number;
  quantity: number;
  _id: string;
}

export interface OrderMenu {
  _id: string;
  name: string;
  images: Image[];
  slug: string;
}

export interface OrderRestaurant {
  _id: string;
  name: string;
  address: string;
  phone: string;
  openingHours: string;
  closingTime: string;
  logo: Image;
  paymentMethods: PaymentMethod[];
  slug: string;
}

export interface PaymentMethod {
  name: string;
  image: string;
  _id: string;
}
