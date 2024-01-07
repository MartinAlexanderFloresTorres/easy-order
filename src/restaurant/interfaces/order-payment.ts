import { Image } from '@/shared/interfaces';
import { OrderStatus, PaymentStatus } from '@/restaurant/types';

export interface OrderPayment {
  _id: string;
  user: UserOrderPayment;
  restaurant: RestaurantOrderPayment;
  status: OrderStatus;
  shippingCost: number;
  discount: number;
  coupon: CouponOrderPayment | null;
  paymentMethod: string;
  paymentStatus: PaymentStatus;
  items: ItemOrderPayment[];
  subTotal: number;
  total: number;
  shippingAddress: string;
  createdAt: string;
  updatedAt: string;
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
