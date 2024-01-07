export interface Coupon {
  _id: string;
  restaurant: string;
  code: string;
  name: string;
  description: string;
  discount: number;
  expiration: Date;
  maximum: number;
  stockOfCoupons: number;
}
