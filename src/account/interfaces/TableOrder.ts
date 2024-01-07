import { TableOrderStatus, PaymentStatus } from '@/restaurant/types';
import { Image } from '@/shared/interfaces';

export interface TableOrder {
  _id: string;
  restaurant: TableOrderRestaurant;
  status: TableOrderStatus;
  discount: number;
  paymentStatus: PaymentStatus;
  items: TableOrderItem[];
  subTotal: number;
  total: number;
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

export interface TableOrderItem {
  menu: TableOrderMenu;
  discount: number;
  price: number;
  quantity: number;
  _id: string;
}

export interface TableOrderMenu {
  _id: string;
  name: string;
  images: Image[];
  slug: string;
}

export interface TableOrderRestaurant {
  _id: string;
  name: string;
  address: string;
  phone: string;
  openingHours: string;
  closingTime: string;
  logo: Image;
  paymentMethods: TableOrderPaymentMethod[];
  slug: string;
}

export interface TableOrderPaymentMethod {
  name: string;
  image: string;
  _id: string;
}
