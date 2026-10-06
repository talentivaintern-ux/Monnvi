export type ProductCategory = 'madhubani' | 'metal-decor' | 'jewellery' | 'beauty';

export interface ProductSpecification {
  material?: string;
  dimensions?: string;
  weight?: string;
  careInstructions?: string;
  origin?: string;
  skinType?: string;
  volume?: string;
  finish?: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  categoryLabel: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  tag?: string;
  image: string;
  additionalImages?: string[];
  description: string;
  shortDescription: string;
  specifications: ProductSpecification;
  inStock: boolean;
  isNewArrival?: boolean;
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
  productName?: string;
}

export interface CategoryInfo {
  id: ProductCategory;
  number: string;
  title: string;
  tagline: string;
  ctaText: string;
  image: string;
  description: string;
  heroHeadline: string;
  heroSubheadline: string;
}

export interface OrderDetails {
  orderId: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  paymentMethod: string;
  createdAt: string;
}
