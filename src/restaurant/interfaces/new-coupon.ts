export interface NewCoupon {
  name: string;
  description: string;
  code: string;
  discount: number;
  maximum: number;
  expiration: string;
  isActive: boolean;
}
