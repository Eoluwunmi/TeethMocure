/**
 * Form Data Type Definitions
 * Used for form state and validation
 */

import { StateType, PackageType, PaymentMethodType, SubscriptionFrequencyType } from "./entities";

export interface OrderFormData {
  full_name: string;
  phone: string;
  email?: string;
  address: string;
  state: StateType;
  package: PackageType;
  payment_method: PaymentMethodType;
  marketer_code?: string;
}

export interface LeadFormData {
  name: string;
  email: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface MarketerApplicationFormData {
  full_name: string;
  phone: string;
  email: string;
  state: string;
  city: string;
  bank_name?: string;
  account_number?: string;
  account_name?: string;
}

export interface SubscriptionFormData {
  full_name: string;
  phone: string;
  email?: string;
  address: string;
  state: StateType;
  package: PackageType;
  frequency: SubscriptionFrequencyType;
  payment_method: PaymentMethodType;
  marketer_code?: string;
}

export interface ReviewFormData {
  customer_name: string;
  location?: string;
  experience: string;
  rating: number;
}

export interface FilterOptions {
  status?: string;
  state?: string;
  variant?: string;
}

export type FormErrorMap = Record<string, string>;

export interface FormState<T> {
  values: T;
  errors: FormErrorMap;
  touched: Record<keyof T, boolean>;
  submitting: boolean;
  submitted: boolean;
}

export interface FormValidationRules<T> {
  [K in keyof T]?: {
    required?: boolean | string;
    pattern?: RegExp | string;
    validate?: (value: T[K]) => string | null;
  };
}
