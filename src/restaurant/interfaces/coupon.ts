export interface Coupon {
  _id: string;
  restaurant: string;
  name: string;
  description: string;
  code: string;
  discount: number;
  stockOfCoupons: number;
  maximum: number;
  expiration: Date;
  isActive: boolean;
}
