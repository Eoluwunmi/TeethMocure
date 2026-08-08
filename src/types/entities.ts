/**
 * Base44 Entity Type Definitions
 * Single source of truth for all data structures
 */

export type StateType = "Lagos" | "Ogun" | "Others";
export type PackageType = "1bottle" | "2bottles" | "3bottles";
export type PaymentMethodType = "Pay on Delivery" | "Bank Transfer";
export type OrderStatusType = "pending" | "confirmed" | "delivered" | "cancelled";
export type MarketerStatusType = "pending" | "approved" | "rejected" | "suspended";
export type SubscriptionFrequencyType = "every_2_weeks" | "monthly" | "every_6_weeks" | "every_2_months";
export type SubscriptionStatusType = "pending" | "active" | "paused" | "cancelled";
export type ABVariantType = "A" | "B";

export interface Order {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  address: string;
  state: StateType;
  package: PackageType;
  payment_method: PaymentMethodType;
  status: OrderStatusType;
  ab_variant?: ABVariantType;
  marketer_code?: string;
  marketer_id?: string;
  created_date?: string;
  updated_date?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  source?: string;
  created_date?: string;
}

export interface Testimonial {
  id: string;
  customer_name: string;
  location?: string;
  experience: string;
  rating: number; // 1-5
  is_featured: boolean;
  created_date?: string;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  summary: string;
  image_url?: string;
  content: string;
  author?: string;
  published_date?: string;
  tags?: string[];
}

export interface Marketer {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  referral_code: string;
  status: MarketerStatusType;
  bank_name?: string;
  account_number?: string;
  account_name?: string;
  total_orders?: number;
  total_commission?: number;
  notes?: string;
  created_date?: string;
}

export interface Subscription {
  id: string;
  full_name: string;
  phone: string;
  email?: string;
  address: string;
  state: StateType;
  package: PackageType;
  frequency: SubscriptionFrequencyType;
  payment_method: PaymentMethodType;
  status: SubscriptionStatusType;
  next_delivery_date?: string;
  marketer_code?: string;
  created_date?: string;
}

export interface StockLevel {
  id: string;
  package_id: PackageType;
  quantity: number;
  last_updated?: string;
}

export interface User {
  id: string;
  email: string;
  full_name?: string;
  role: "owner" | "marketer" | "client";
  created_date?: string;
}

// Common response types
export interface ApiResponse<T> {
  data: T;
  success: boolean;
  error?: string;
}

export interface ListResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
