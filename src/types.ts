export type PropertyType = 'Apartment' | 'Villa' | 'Penthouse' | 'Townhouse';

export interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  address: string;
  type: PropertyType;
  beds: number;
  baths: number;
  sqft: number;
  image: string;
  badge?: 'PREMIUM' | 'EXCLUSIVE' | 'EXQUISITE' | 'NEW' | 'POPULAR' | 'SOLD';
  agentId: string;
  amenities: string[];
  featured?: boolean;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  image: string;
  phone: string;
  email: string;
}

export interface BlogArticle {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
}

export interface Testimonial {
  id: string;
  rating: number;
  quote: string;
  author: string;
  role: string;
}

export interface SearchQuery {
  location: string;
  type: string;
  minPrice: number | '';
  maxPrice: number | '';
  beds: number | '';
  amenities: string[];
}

export type ViewTab = 'buy' | 'rent' | 'off-plan' | 'kyc' | 'about' | 'contact' | 'home' | 'wordpress' | 'mortgage';
