import { Image } from '@/shared/interfaces';
import { OrderStatus, PaymentStatus } from '@/restaurant/types';
import { OrderRestaurant } from '@/account/interfaces';
import { CouponOrderPayment } from '.';

export interface OrderByRestaurant {
  _id: string;
  user: OrderByRestaurantUser;
  restaurant: OrderRestaurant;
  coupon: CouponOrderPayment | null;
  status: OrderStatus;
  shippingCost: number;
  discount: number;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  items: OrderByRestaurantItem[];
  subTotal: number;
  total: number;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderByRestaurantItem {
  menu: OrderByRestaurantMenu;
  discount: number;
  price: number;
  quantity: number;
  _id: string;
}

export interface OrderByRestaurantMenu {
  _id: string;
  name: string;
  images: Image[];
  slug: string;
}

export interface OrderByRestaurantUser {
  _id: string;
  name: string;
  lastname: string;
  photo: null | Image;
  city: string;
  country: string;
  phone: null;
  slug: string;
}
