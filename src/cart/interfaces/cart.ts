import { Coupon } from '.';
import { Image } from '../../shared/interfaces';

export interface Cart {
  cartId: string;
  restaurant: CartRestaurant;
  items: CartItem[];
  coupon: Coupon | null;
  discount: number;
  total: number;
  subtotal: number;
}
export interface CartItem {
  restaurant: CartRestaurant;
  id: string;
  name: string;
  slug: string;
  description: string;
  image: Image;
  price: number;
  stock: number;
  discount: number;
  quantity: number;
  total: number;
}

export interface CartRestaurant {
  id: string;
  name: string;
  slug: string;
  logo: Image;
  address: string;
}
