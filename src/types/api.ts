// Type definitions for Django API responses

export interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
  neighborhood: string;
  city: string;
  county: string;
  price: number;
  deposit?: number;
  bedrooms?: number;
  bathrooms?: number;
  area?: number;
  propertyType: string;
  isVerified: boolean;
  isFurnished: boolean;
  isPetFriendly: boolean;
  utilitiesIncluded: boolean;
  availabilityDate: string;
  landlordId: string;
  scoutId?: string;
  status: 'active' | 'inactive' | 'pending' | 'verified';
  images: string[];
  video?: string;
  rating: number;
  reviewCount: number;
  amenities: {
    onPremise: string[];
    area: string[];
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: string;
  propertyId: string;
  tenantId: string;
  overallRating: number;
  reviewText: string;
  isVerified: boolean;
  verificationMethod?: string;
  helpfulCount: number;
  author: string;
  date: string;
  ratings?: {
    category: string;
    rating: number;
    notes?: string;
  }[];
  photos?: string[];
}

export interface FilterState {
  search: string;
  location: string;
  propertyType: string;
  priceRange: [number, number];
  bedrooms: string;
  bathrooms: string;
  amenities: string[];
  verified: boolean;
  furnished: boolean;
  petFriendly: boolean;
  utilitiesIncluded: boolean;
  sortBy: 'price_asc' | 'price_desc' | 'date_desc' | 'rating_desc';
}

export interface ScoutApplication {
  id?: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
  workExperience: string;
  references: Array<{
    name: string;
    relationship: string;
    contact: string;
  }>;
  idNumber: string;
  languagesSpoken: string[];
  areasOfExpertise: string[];
  availability: Array<{
    day: string;
    startTime: string;
    endTime: string;
    isFlexible: boolean;
  }>;
  transportationMethod: string;
  documents: Array<{
    type: 'cv' | 'police_clearance' | 'id_document';
    url: string;
    originalFilename: string;
  }>;
  hasAgreedToTerms: boolean;
  hasAgreedToBackground: boolean;
  hasAgreedToDataProcessing: boolean;
  status?: 'pending' | 'under_review' | 'approved' | 'rejected' | 'training';
  submittedAt?: string;
  reviewedAt?: string;
  reviewedBy?: string;
  reviewNotes?: string;
}

export interface Subscription {
  id: string;
  userId: string;
  type: 'residential' | 'small_business' | 'executive';
  name: string;
  price: number;
  listingLimit: number;
  featuredListingsIncluded: number;
  prioritySupport: boolean;
  analyticsAccess: boolean;
  bulkUpload: boolean;
  startDate: string;
  endDate: string;
  autoRenew: boolean;
  status: 'active' | 'cancelled' | 'expired';
}

export interface PaymentTransaction {
  id: string;
  subscriptionId: string;
  amount: number;
  currency: string;
  paymentMethod: 'mpesa' | 'stripe' | 'paypal' | 'bank_transfer';
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  externalTransactionId?: string;
  processingFee?: number;
  initiatedAt: string;
  completedAt?: string;
  failedReason?: string;
}

export interface ApiError {
  message: string;
  code?: string;
  details?: Record<string, any>;
}