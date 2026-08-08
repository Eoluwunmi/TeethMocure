/**
 * Centralized Application Constants
 * Single source of truth for all static configuration
 */

import { StateType, PackageType, OrderStatusType, MarketerStatusType, SubscriptionFrequencyType } from "@/types";

// Contact & Communication
export const WHATSAPP_NUMBER = "2348107610457";
export const WHATSAPP_SUPPORT = "2348094029139";
export const WHATSAPP_LINK = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi,%20I%20want%20to%20order%20Teethmocure`;
export const WHATSAPP_SUPPORT_LINK = `https://wa.me/${WHATSAPP_SUPPORT}?text=Hi,%20I%20have%20a%20question%20about%20Teethmocure`;

// Product Packages
export const PACKAGES = [
  {
    id: "1bottle" as const,
    label: "Starter Pack",
    bottles: "1 Bottle",
    price: "N2,600",
    delivery: "Paid Delivery",
    featured: false,
  },
  {
    id: "2bottles" as const,
    label: "Recommended Pack",
    bottles: "2 Bottles",
    price: "N4,900",
    delivery: "FREE DELIVERY",
    featured: true,
  },
  {
    id: "3bottles" as const,
    label: "Complete Treatment Pack",
    bottles: "3 Bottles",
    price: "N7,100",
    delivery: "FREE DELIVERY",
    featured: false,
  },
] as const;

// Commission Map (₦ per bottle delivered)
export const COMMISSION_MAP: Record<PackageType, number> = {
  "1bottle": 300,
  "2bottles": 650,
  "3bottles": 900,
};

// Subscription Frequencies
export const SUBSCRIPTION_FREQUENCIES = [
  { id: "every_2_weeks" as const, label: "Every 2 Weeks", desc: "Best for active/severe pain", days: 14 },
  { id: "monthly" as const, label: "Every Month", desc: "Most popular choice", days: 30, featured: true },
  { id: "every_6_weeks" as const, label: "Every 6 Weeks", desc: "Maintenance dose", days: 42 },
  { id: "every_2_months" as const, label: "Every 2 Months", desc: "Light / preventive use", days: 60 },
] as const;

// Nigerian States
export const NIGERIAN_STATES: StateType[] = [
  "Lagos",
  "Ogun",
  "Others",
];

export const ALL_NIGERIAN_STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi", "Bayelsa", "Benue", "Borno",
  "Cross River", "Delta", "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT - Abuja", "Gombe",
  "Imo", "Jigawa", "Kaduna", "Kano", "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun", "Oyo", "Plateau", "Rivers", "Sokoto",
  "Taraba", "Yobe", "Zamfara",
];

// Status Colors (Tailwind classes)
export const STATUS_COLORS: Record<OrderStatusType, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-green-100 text-green-800 border-green-200",
  delivered: "bg-blue-100 text-blue-800 border-blue-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

export const MARKETER_STATUS_COLORS: Record<MarketerStatusType, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  approved: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
  suspended: "bg-gray-100 text-gray-600 border-gray-200",
};

export const VARIANT_COLORS: Record<string, string> = {
  A: "bg-emerald-100 text-emerald-800 border-emerald-200",
  B: "bg-purple-100 text-purple-800 border-purple-200",
};

// Order Status Configuration
export const ORDER_STATUSES: Record<OrderStatusType, { label: string; icon: string; desc: string }> = {
  pending: {
    label: "Order Received",
    icon: "🕐",
    desc: "Your order has been received and is awaiting confirmation from our team.",
  },
  confirmed: {
    label: "Order Confirmed",
    icon: "✅",
    desc: "Great news! Your order has been confirmed and is being prepared for delivery.",
  },
  delivered: {
    label: "Delivered",
    icon: "📦",
    desc: "Your order has been delivered. We hope you enjoy Teethmocure!",
  },
  cancelled: {
    label: "Cancelled",
    icon: "❌",
    desc: "This order has been cancelled. Please contact support if you need assistance.",
  },
};

// Payment Methods
export const PAYMENT_METHODS = ["Pay on Delivery", "Bank Transfer"] as const;

// Order Steps (for tracking)
export const ORDER_STEPS = ["pending", "confirmed", "delivered"] as const;

// Marketer Steps
export const MARKETER_STEPS = ["pending", "approved"] as const;

// Teethmocure Info
export const COMPANY_INFO = {
  name: "Teethmocure",
  tagline: "NAFDAC Approved Herbal Mouth & Teeth Mixture",
  NAFDAC_REG: "A7-4418L",
  producer: "Lydfem International Limited",
  address: "4, Joyful Avenue, Ketu Oluyomi Atan",
  state: "Ogun State",
  country: "Nigeria",
  email: "info@teethmocure.com",
};

// Hero Section Variants (A/B Testing)
export const HERO_VARIANTS = {
  A: {
    bg: "bg-[#1B4332]",
    headline: "Tooth Pain? Get Fast Relief\nWithout Expensive Dentist Visits",
    sub: "NAFDAC Approved Herbal Solution for Toothache & Oral Infections",
    badge: "Safe · Effective · Trusted by Nigerians",
    ctaBg: "bg-[#C8A94C] hover:bg-[#b8983e] text-white",
  },
  B: {
    bg: "bg-[#1A1A2E]",
    headline: "Stop Tooth Pain Tonight —\nNo Dentist Needed",
    sub: "Nigeria's #1 Herbal Toothache Relief. NAFDAC Certified.",
    badge: "Fast-Acting · 100% Natural · Delivered to Your Door",
    ctaBg: "bg-[#C0392B] hover:bg-[#a93226] text-white",
  },
};

// Common UI Colors
export const COLORS = {
  primary: "#1B4332",
  secondary: "#C8A94C",
  danger: "#C0392B",
  success: "#25D366",
  warning: "#FFA500",
  muted: "#999999",
};

// Storage Keys for localStorage
export const STORAGE_KEYS = {
  VARIANT: "tmcure_variant",
  SALES_POPUP: "tmcure_sales_popup",
  EXIT_POPUP: "tmcure_exit_popup",
  ABANDONED_CART: "tmcure_abandoned_cart",
  COUNTDOWN: "tmcure_end",
};

// Countdown Timer (24 hours in milliseconds)
export const COUNTDOWN_DURATION = 24 * 3600 * 1000;

// Session Timeouts
export const SESSION_TIMEOUTS = {
  EXIT_INTENT: 300000, // 5 minutes
  SALES_LEAD: 5000, // 5 seconds
  ABANDONED_CART: 3000, // 3 seconds
  MOBILE_EXIT_INTENT: 30000, // 30 seconds
};

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const MAX_PAGE_SIZE = 200;

// Image URLs
export const IMAGES = {
  LOGO: "https://media.base44.com/images/public/69da55db9d5119c6982571ca/9bf7e1fb4_TMBottle.png",
  PRODUCT: "https://media.base44.com/images/public/69da55db9d5119c6982571ca/0c56254f7_Teethmocure.png",
  VIDEO: "https://base44.app/api/apps/69da55db9d5119c6982571ca/files/mp/public/69da55db9d5119c6982571ca/8717204cd_MumandChild.mp4",
};

// Form Validation Messages
export const VALIDATION_MESSAGES = {
  REQUIRED: "This field is required",
  INVALID_EMAIL: "Please enter a valid email address",
  INVALID_PHONE: "Please enter a valid phone number",
  INVALID_ACCOUNT: "Please enter a valid account number",
  MIN_LENGTH: (min: number) => `Must be at least ${min} characters`,
  MAX_LENGTH: (max: number) => `Must be no more than ${max} characters`,
};

// API Messages
export const API_MESSAGES = {
  ORDER_CREATED: "Order Received! We'll call you shortly to confirm.",
  ORDER_UPDATED: "Order updated successfully",
  MARKETER_APPROVED: "Marketer approved successfully",
  MARKETER_REJECTED: "Marketer rejected successfully",
  MARKETER_SUSPENDED: "Marketer suspended successfully",
  ERROR_GENERIC: "Something went wrong. Please try again.",
};

export default {
  WHATSAPP_NUMBER,
  WHATSAPP_SUPPORT,
  WHATSAPP_LINK,
  WHATSAPP_SUPPORT_LINK,
  PACKAGES,
  COMMISSION_MAP,
  SUBSCRIPTION_FREQUENCIES,
  NIGERIAN_STATES,
  ALL_NIGERIAN_STATES,
  STATUS_COLORS,
  MARKETER_STATUS_COLORS,
  VARIANT_COLORS,
  ORDER_STATUSES,
  PAYMENT_METHODS,
  ORDER_STEPS,
  MARKETER_STEPS,
  COMPANY_INFO,
  HERO_VARIANTS,
  COLORS,
  STORAGE_KEYS,
  COUNTDOWN_DURATION,
  SESSION_TIMEOUTS,
  DEFAULT_PAGE_SIZE,
  MAX_PAGE_SIZE,
  IMAGES,
  VALIDATION_MESSAGES,
  API_MESSAGES,
};
