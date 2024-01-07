import { Image } from '@/shared/interfaces';
import { TableOrderStatus, PaymentStatus } from '@/restaurant/types';

export interface TableOrderPayment {
  _id: string;
  user: TableUserOrderPayment;
  restaurant: TableRestaurantOrderPayment;
  status: TableOrderStatus;
  discount: number;
  coupon: TableCouponOrderPayment | null;
  paymentStatus: PaymentStatus;
  items: TableItemOrderPayment[];
  subTotal: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface TableCouponOrderPayment {
  _id: string;
  code: string;
  discount: number;
  name: string;
}

export interface TableItemOrderPayment {
  menu: TableMenuOrderPayment;
  discount: number;
  price: number;
  quantity: number;
  _id: string;
}

export interface TableMenuOrderPayment {
  _id: string;
  name: string;
  images: Image[];
  slug: string;
}

export interface TableRestaurantOrderPayment {
  _id: string;
  name: string;
  address: string;
  phone: string;
  openingHours: string;
  closingTime: string;
  logo: Image;
  paymentMethods: TablePaymentMethodOrderPayment[];
  slug: string;
}

export interface TablePaymentMethodOrderPayment {
  name: string;
  image: string;
  _id: string;
}

export interface TableUserOrderPayment {
  _id: string;
  name: string;
  lastname: string;
  photo: null;
  city: string;
  country: string;
  phone: null;
  slug: string;
}
