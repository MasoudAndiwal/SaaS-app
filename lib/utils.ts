import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price)
}

export function formatArea(area: number): string {
  return new Intl.NumberFormat('en-US').format(area) + ' sq ft'
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-')
}

export function getPropertyTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'house': 'House',
    'apartment': 'Apartment',
    'condo': 'Condo',
    'townhouse': 'Townhouse',
    'villa': 'Villa',
    'studio': 'Studio',
    'duplex': 'Duplex',
    'penthouse': 'Penthouse'
  }
  return labels[type] || type
}

export function getListingTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    'sale': 'For Sale',
    'rent': 'For Rent',
    'sold': 'Sold',
    'rented': 'Rented'
  }
  return labels[type] || type
}

export function generatePropertyId(): string {
  return `PROP-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
}

export function calculateMortgage(
  price: number, 
  downPayment: number, 
  interestRate: number, 
  years: number
): number {
  const principal = price - downPayment
  const monthlyRate = interestRate / 100 / 12
  const numPayments = years * 12
  
  if (monthlyRate === 0) return principal / numPayments
  
  return (principal * monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
         (Math.pow(1 + monthlyRate, numPayments) - 1)
}

export function timeAgo(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  
  if (diffInSeconds < 60) return 'Just now'
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`
  return `${Math.floor(diffInSeconds / 2592000)}mo ago`
}

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/
  return phoneRegex.test(phone)
}

export function generateImagePlaceholder(width: number, height: number, text?: string): string {
  return `https://placehold.co/${width}x${height}/e2e8f0/64748b?text=${encodeURIComponent(text || 'Property Image')}`
}

export function getAmenityIcon(amenity: string): string {
  const icons: Record<string, string> = {
    'pool': '🏊‍♀️',
    'gym': '🏋️‍♀️',
    'parking': '🚗',
    'elevator': '🛗',
    'balcony': '🏢',
    'garden': '🌳',
    'fireplace': '🔥',
    'ac': '❄️',
    'heating': '🔥',
    'wifi': '📶',
    'security': '🔒',
    'laundry': '👕',
    'dishwasher': '🍽️',
    'microwave': '📱',
    'oven': '🔥',
    'refrigerator': '❄️'
  }
  return icons[amenity.toLowerCase()] || '✓'
}