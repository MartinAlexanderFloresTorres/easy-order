import { Image } from '@/shared/interfaces';
import { OrderStatus, PaymentStatus } from '@/restaurant/types';

export interface OrderPayment {
  _id: string;
  user: User;
  restaurant: Restaurant;
  status: OrderStatus;
  shippingAddress: string;
  latitude: number;
  longitude: number;
  shippingCost: number;
  discount: number;
  coupon: null | CouponOrderPayment;
  subTotal: number;
  total: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  items: Item[];
  createdAt: string;
  updatedAt: string;
}

export interface Item {
  menu: Menu;
  discount: number;
  price: number;
  quantity: number;
  _id: string;
}

export interface Menu {
  _id: string;
  name: string;
  images: Logo[];
  slug: string;
}

export interface Logo {
  public_id: string;
  secure_url: string;
  url: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  folder: string;
  created_at: string;
  _id: string;
}

export interface Restaurant {
  _id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  phone: string;
  openingHours: string;
  closingTime: string;
  logo: Logo;
  paymentMethods: PaymentMethod[];
  slug: string;
}

export interface PaymentMethod {
  name: string;
  image: string;
  _id: string;
}

export interface User {
  _id: string;
  name: string;
  lastname: string;
  photo: null;
  city: string;
  country: string;
  phone: null;
  slug: string;
}

export interface CouponOrderPayment {
  _id: string;
  code: string;
  discount: number;
  name: string;
}

export interface ItemOrderPayment {
  menu: MenuOrderPayment;
  discount: number;
  price: number;
  quantity: number;
  _id: string;
}

export interface MenuOrderPayment {
  _id: string;
  name: string;
  images: Image[];
  slug: string;
}

export interface RestaurantOrderPayment {
  _id: string;
  name: string;
  address: string;
  phone: string;
  openingHours: string;
  closingTime: string;
  logo: Image;
  paymentMethods: PaymentMethodOrderPayment[];
  slug: string;
}

export interface PaymentMethodOrderPayment {
  name: string;
  image: string;
  _id: string;
}

export interface UserOrderPayment {
  _id: string;
  name: string;
  lastname: string;
  photo: null;
  city: string;
  country: string;
  phone: null;
  slug: string;
}
