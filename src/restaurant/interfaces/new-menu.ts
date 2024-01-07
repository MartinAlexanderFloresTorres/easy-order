export interface NewMenu {
  name: string;
  description: string;
  price: number;
  discount: number;
  stockDaily: number;
  category: string;
  images: File[];
  isActive: boolean;
  nutritionalInformation: NutritionalInformationNewMenu[];
  ingredients: string;
}

export interface NutritionalInformationNewMenu {
  id: string;
  name: string;
  value: string;
}
