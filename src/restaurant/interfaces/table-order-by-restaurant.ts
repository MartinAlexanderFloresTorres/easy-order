import { Image } from '@/shared/interfaces';
import { TableOrderStatus, PaymentStatus } from '@/restaurant/types';
import { OrderRestaurant } from '@/account/interfaces';
import { CouponOrderPayment } from '.';

export interface TableOrderByRestaurant {
  _id: string;
  user: TableOrderByRestaurantUser;
  restaurant: OrderRestaurant;
  coupon: CouponOrderPayment | null;
  status: TableOrderStatus;
  discount: number;
  paymentStatus: PaymentStatus;
  items: TableOrderByRestaurantItem[];
  subTotal: number;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export interface TableOrderByRestaurantItem {
  menu: TableOrderByRestaurantMenu;
  discount: number;
  price: number;
  quantity: number;
  _id: string;
}

export interface TableOrderByRestaurantMenu {
  _id: string;
  name: string;
  images: Image[];
  slug: string;
}

export interface TableOrderByRestaurantUser {
  _id: string;
  name: string;
  lastname: string;
  photo: null | Image;
  city: string;
  country: string;
  phone: null;
  slug: string;
}
