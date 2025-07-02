export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  listingType: 'sale' | 'rent';
  propertyType: 'house' | 'apartment' | 'condo' | 'townhouse' | 'villa' | 'studio' | 'duplex' | 'penthouse';
  status: 'available' | 'sold' | 'rented' | 'pending';
  
  // Location
  address: string;
  city: string;
  state: string;
  zipCode: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
  
  // Property details
  bedrooms: number;
  bathrooms: number;
  area: number; // square feet
  lotSize?: number;
  yearBuilt?: number;
  
  // Features
  amenities: string[];
  features: string[];
  parking?: number;
  
  // Media
  images: string[];
  virtualTour?: string;
  floorPlan?: string;
  
  // Owner/Agent info
  agentId: string;
  agentName: string;
  agentPhone: string;
  agentEmail: string;
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
  availableFrom?: Date;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  avatar?: string;
  userType: 'buyer' | 'seller' | 'agent' | 'admin';
  
  // Profile details
  bio?: string;
  company?: string;
  license?: string; // for agents
  verified: boolean;
  
  // Preferences
  preferences?: {
    priceRange?: [number, number];
    propertyTypes?: string[];
    locations?: string[];
    bedrooms?: number;
    bathrooms?: number;
  };
  
  // Timestamps
  createdAt: Date;
  updatedAt: Date;
}

export interface SearchFilters {
  listingType?: 'sale' | 'rent' | 'all';
  propertyType?: string[];
  priceRange?: [number, number];
  bedrooms?: number;
  bathrooms?: number;
  areaRange?: [number, number];
  location?: string;
  amenities?: string[];
  status?: string;
  sortBy?: 'price' | 'date' | 'area' | 'bedrooms';
  sortOrder?: 'asc' | 'desc';
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  propertyId?: string;
  content: string;
  type: 'text' | 'inquiry' | 'offer';
  read: boolean;
  createdAt: Date;
}

export interface Conversation {
  id: string;
  participants: string[];
  propertyId?: string;
  lastMessage?: Message;
  updatedAt: Date;
}

export interface Favorite {
  id: string;
  userId: string;
  propertyId: string;
  createdAt: Date;
}

export interface Inquiry {
  id: string;
  propertyId: string;
  userId: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  inquiryType: 'viewing' | 'info' | 'offer';
  preferredContactTime?: string;
  createdAt: Date;
}

export interface PropertyFormData {
  title: string;
  description: string;
  price: number;
  listingType: 'sale' | 'rent';
  propertyType: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  lotSize?: number;
  yearBuilt?: number;
  amenities: string[];
  features: string[];
  parking?: number;
  images: File[];
}

export interface MapProperty {
  id: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  price: number;
  propertyType: string;
  listingType: string;
}

export interface MortgageCalculation {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
  principal: number;
}

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface PropertyStats {
  totalProperties: number;
  totalSales: number;
  totalRentals: number;
  averagePrice: number;
  averageRent: number;
  topLocations: Array<{
    location: string;
    count: number;
  }>;
}

export interface SearchParams {
  [key: string]: string | string[] | undefined;
}