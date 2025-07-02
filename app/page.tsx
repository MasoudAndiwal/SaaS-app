export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Find Your <span className="gradient-text">Dream Home</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Discover the perfect property with our modern real estate platform. 
            Buy, sell, or rent with confidence and ease.
          </p>
          
          {/* Search Bar */}
          <div className="bg-white rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                placeholder="Location"
                className="input-field"
              />
              <select className="input-field">
                <option>Property Type</option>
                <option>House</option>
                <option>Apartment</option>
                <option>Condo</option>
              </select>
              <select className="input-field">
                <option>Price Range</option>
                <option>Under $200k</option>
                <option>$200k - $500k</option>
                <option>$500k+</option>
              </select>
              <button className="btn-primary">
                Search Properties
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">10K+</div>
              <div className="text-gray-600">Properties Listed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">5K+</div>
              <div className="text-gray-600">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">500+</div>
              <div className="text-gray-600">Expert Agents</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-600 mb-2">50+</div>
              <div className="text-gray-600">Cities Covered</div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our handpicked selection of premium properties in the most desirable locations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Property Card 1 */}
            <div className="property-card">
              <div className="relative h-48 bg-gray-200 rounded-t-2xl">
                <div className="absolute top-4 left-4">
                  <span className="price-tag">$750,000</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="filter-tag status-available">For Sale</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Modern Family Home</h3>
                <p className="text-gray-600 mb-4">123 Oak Street, Downtown</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>4 beds</span>
                  <span>3 baths</span>
                  <span>2,500 sq ft</span>
                </div>
              </div>
            </div>

            {/* Property Card 2 */}
            <div className="property-card">
              <div className="relative h-48 bg-gray-200 rounded-t-2xl">
                <div className="absolute top-4 left-4">
                  <span className="price-tag">$2,500/mo</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="filter-tag status-available">For Rent</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Luxury Apartment</h3>
                <p className="text-gray-600 mb-4">456 Pine Avenue, Midtown</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>2 beds</span>
                  <span>2 baths</span>
                  <span>1,200 sq ft</span>
                </div>
              </div>
            </div>

            {/* Property Card 3 */}
            <div className="property-card">
              <div className="relative h-48 bg-gray-200 rounded-t-2xl">
                <div className="absolute top-4 left-4">
                  <span className="price-tag">$1,200,000</span>
                </div>
                <div className="absolute top-4 right-4">
                  <span className="filter-tag status-available">For Sale</span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Waterfront Villa</h3>
                <p className="text-gray-600 mb-4">789 Lake Drive, Lakeside</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>5 beds</span>
                  <span>4 baths</span>
                  <span>3,800 sq ft</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600 text-white">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Ready to Find Your Dream Home?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of satisfied customers who found their perfect property with EstateFlow.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-secondary">
              Browse Properties
            </button>
            <button className="bg-white text-primary-600 font-semibold py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
              List Your Property
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}