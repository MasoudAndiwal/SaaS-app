'use client'

import { useState } from 'react'
import { Search, Filter, Grid, List, MapPin, Bed, Bath, Square } from 'lucide-react'

const properties = [
  {
    id: '1',
    title: 'Modern Family Home',
    price: 750000,
    type: 'sale',
    propertyType: 'house',
    bedrooms: 4,
    bathrooms: 3,
    area: 2500,
    address: '123 Oak Street, Downtown',
    image: 'https://placehold.co/400x300/e2e8f0/64748b?text=Modern+Home',
    status: 'available'
  },
  {
    id: '2',
    title: 'Luxury Apartment',
    price: 2500,
    type: 'rent',
    propertyType: 'apartment',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    address: '456 Pine Avenue, Midtown',
    image: 'https://placehold.co/400x300/e2e8f0/64748b?text=Luxury+Apartment',
    status: 'available'
  },
  {
    id: '3',
    title: 'Waterfront Villa',
    price: 1200000,
    type: 'sale',
    propertyType: 'villa',
    bedrooms: 5,
    bathrooms: 4,
    area: 3800,
    address: '789 Lake Drive, Lakeside',
    image: 'https://placehold.co/400x300/e2e8f0/64748b?text=Waterfront+Villa',
    status: 'available'
  },
  {
    id: '4',
    title: 'Downtown Condo',
    price: 3200,
    type: 'rent',
    propertyType: 'condo',
    bedrooms: 1,
    bathrooms: 1,
    area: 800,
    address: '321 City Center, Downtown',
    image: 'https://placehold.co/400x300/e2e8f0/64748b?text=Downtown+Condo',
    status: 'available'
  },
  {
    id: '5',
    title: 'Suburban Townhouse',
    price: 450000,
    type: 'sale',
    propertyType: 'townhouse',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    address: '654 Maple Lane, Suburbs',
    image: 'https://placehold.co/400x300/e2e8f0/64748b?text=Suburban+Townhouse',
    status: 'available'
  },
  {
    id: '6',
    title: 'Studio Loft',
    price: 1800,
    type: 'rent',
    propertyType: 'studio',
    bedrooms: 0,
    bathrooms: 1,
    area: 600,
    address: '987 Artist Quarter, Creative District',
    image: 'https://placehold.co/400x300/e2e8f0/64748b?text=Studio+Loft',
    status: 'available'
  }
]

export default function PropertiesPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    propertyType: 'all',
    priceRange: 'all',
    bedrooms: 'all'
  })

  const formatPrice = (price: number, type: string) => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
    
    return type === 'rent' ? `${formatted}/mo` : formatted
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">Properties</h1>
          
          {/* Filters */}
          <div className="bg-gray-50 rounded-xl p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search by location..."
                    className="pl-10 input-field"
                    value={filters.search}
                    onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                  />
                </div>
              </div>
              
              <select
                className="input-field"
                value={filters.type}
                onChange={(e) => setFilters({ ...filters, type: e.target.value })}
              >
                <option value="all">All Types</option>
                <option value="sale">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
              
              <select
                className="input-field"
                value={filters.propertyType}
                onChange={(e) => setFilters({ ...filters, propertyType: e.target.value })}
              >
                <option value="all">Property Type</option>
                <option value="house">House</option>
                <option value="apartment">Apartment</option>
                <option value="condo">Condo</option>
                <option value="villa">Villa</option>
                <option value="townhouse">Townhouse</option>
                <option value="studio">Studio</option>
              </select>
              
              <select
                className="input-field"
                value={filters.priceRange}
                onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
              >
                <option value="all">Price Range</option>
                <option value="0-200000">Under $200k</option>
                <option value="200000-500000">$200k - $500k</option>
                <option value="500000-1000000">$500k - $1M</option>
                <option value="1000000+">$1M+</option>
              </select>
              
              <select
                className="input-field"
                value={filters.bedrooms}
                onChange={(e) => setFilters({ ...filters, bedrooms: e.target.value })}
              >
                <option value="all">Bedrooms</option>
                <option value="0">Studio</option>
                <option value="1">1 Bed</option>
                <option value="2">2 Beds</option>
                <option value="3">3 Beds</option>
                <option value="4+">4+ Beds</option>
              </select>
            </div>
          </div>
          
          {/* View Controls */}
          <div className="flex justify-between items-center">
            <p className="text-gray-600">{properties.length} properties found</p>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Properties Grid/List */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
          {properties.map((property) => (
            <div key={property.id} className={`property-card ${viewMode === 'list' ? 'md:flex' : ''}`}>
              <div className={`relative ${viewMode === 'list' ? 'md:w-80 h-48' : 'h-48'} bg-gray-200 ${viewMode === 'grid' ? 'rounded-t-2xl' : 'md:rounded-l-2xl md:rounded-t-none rounded-t-2xl'}`}>
                <img 
                  src={property.image} 
                  alt={property.title}
                  className="w-full h-full object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-t-none"
                />
                <div className="absolute top-4 left-4">
                  <span className="price-tag">{formatPrice(property.price, property.type)}</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className={`filter-tag ${property.status === 'available' ? 'status-available' : 'status-sold'}`}>
                    {property.type === 'sale' ? 'For Sale' : 'For Rent'}
                  </span>
                </div>
              </div>
              
              <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{property.address}</span>
                </div>
                
                <div className="flex justify-between items-center text-sm text-gray-500 mb-4">
                  <div className="flex items-center space-x-4">
                    {property.bedrooms > 0 && (
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" />
                        <span>{property.bedrooms}</span>
                      </div>
                    )}
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      <span>{property.bathrooms}</span>
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      <span>{property.area.toLocaleString()} sq ft</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500 uppercase tracking-wide font-medium">
                    {property.propertyType}
                  </span>
                  <button className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                    View Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}