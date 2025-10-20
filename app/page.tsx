"use client";

import React, { useState, useEffect } from 'react';
import { ShoppingBag, Clock, Star, ChevronRight, Menu, X, MapPin, Search, Zap, Heart, Share2 } from 'lucide-react';
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { type RootState, type AppDispatch } from './store'
import { toggleLike } from './features/likesSlice'
import { addItem } from './features/cartSlice'
import Logo from '../components/Logo'
import { Tabs, TabsList, TabsTrigger } from '../components/ui/tabs'

export default function Page() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['All', 'International', 'Fast Food', 'Seafood', 'Traditional', 'Café', 'Local Cuisine', 'African'];
  const dispatch = useDispatch<AppDispatch>()
  const likedIds = useSelector((s: RootState) => s.likes.likedIds)
  const cartCount = useSelector((s: RootState) => s.cart.items.reduce((sum, i) => sum + i.quantity, 0))

  const shareRestaurant = async (restaurant: { name: string; cuisine: string; rating: number }) => {
    const shareData = {
      title: `${restaurant.name} - ${restaurant.cuisine}`,
      text: `Check out ${restaurant.name}! ${restaurant.cuisine} cuisine with ${restaurant.rating}★ rating. Order now on Easy Delivery!`,
      url: `${window.location.origin}/restaurant/${restaurant.name.toLowerCase().replace(/\s+/g, '-')}`
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
      } catch (err) {
        console.log('Error sharing:', err)
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`)
        alert('Restaurant link copied to clipboard!')
      } catch (err) {
        console.log('Error copying to clipboard:', err)
      }
    }
  }
  const featuredRestaurants = [
    { name: 'Cranes', cuisine: 'International', rating: 4.8, time: '25-35', image: '🏨', popular: true },
    { name: 'Super Break', cuisine: 'Fast Food', rating: 4.6, time: '15-25', image: '🍔', popular: false },
    { name: 'West Side', cuisine: 'Continental', rating: 4.7, time: '20-30', image: '🍽️', popular: true },
    { name: 'Deep Sea', cuisine: 'Seafood', rating: 4.9, time: '30-40', image: '🐟', popular: true },
    { name: 'Mama Njuguna', cuisine: 'Traditional', rating: 4.8, time: '20-30', image: '🍛', popular: false },
    { name: 'Megabytes', cuisine: 'Café', rating: 4.5, time: '10-20', image: '☕', popular: false },
    { name: 'Giffi Hotel', cuisine: 'Local Cuisine', rating: 4.6, time: '25-35', image: '🏨', popular: false },
    { name: 'Pazuri Hotel', cuisine: 'African', rating: 4.7, time: '20-30', image: '🌍', popular: true }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-lg shadow-lg' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Logo size="md" />

            <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">Home</a>
              <a href="#restaurants" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">Restaurants</a>
              <a href="#how" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">How it Works</a>
              <a href="#contact" className="text-gray-700 hover:text-orange-600 transition-colors font-medium">Contact</a>
              <Link href="/cart" className="relative px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-300">
                Cart ({cartCount})
              </Link>
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t">
            <div className="px-4 py-4 space-y-3">
              <a href="#" className="block text-gray-700 hover:text-orange-600 font-medium">Home</a>
              <a href="#restaurants" className="block text-gray-700 hover:text-orange-600 font-medium">Restaurants</a>
              <a href="#how" className="block text-gray-700 hover:text-orange-600 font-medium">How it Works</a>
              <a href="#contact" className="block text-gray-700 hover:text-orange-600 font-medium">Contact</a>
              <button className="w-full px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold">
                Sign In
              </button>
            </div>
          </div>
        )}
      </nav>

      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fadeIn">
              <div className="inline-block px-4 py-2 bg-orange-100 rounded-full text-orange-600 font-semibold text-sm">
                🎉 Free delivery on your first order!
              </div>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                Your Favorite <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Food</span> Delivered Hot & Fresh
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Order from the best local restaurants with easy, on-demand delivery. Fast, reliable, and delicious.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 p-2 bg-white rounded-2xl shadow-2xl border border-gray-100">
                <div className="flex items-center flex-1 px-4 py-3 border-r border-gray-200">
                  <MapPin className="w-5 h-5 text-gray-400 mr-3" />
                  <input type="text" placeholder="Enter your address" className="w-full outline-none text-gray-700" />
                </div>
                <div className="flex items-center flex-1 px-4 py-3">
                  <Search className="w-5 h-5 text-gray-400 mr-3" />
                  <input type="text" placeholder="Search for restaurant or food" className="w-full outline-none text-gray-700" />
                </div>
                <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-xl transition-all duration-300 flex items-center justify-center">
                  Find Food <ChevronRight className="ml-2 w-5 h-5" />
                </button>
              </div>

              <div className="flex gap-8 pt-4">
                <div>
                  <div className="text-4xl font-bold text-gray-900">1000+</div>
                  <div className="text-gray-600">Restaurants</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gray-900">50k+</div>
                  <div className="text-gray-600">Deliveries</div>
                </div>
                <div>
                  <div className="text-4xl font-bold text-gray-900">4.8★</div>
                  <div className="text-gray-600">Rating</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-300">
                  <div className="text-8xl mb-4">🍔</div>
                  <h3 className="text-2xl font-bold mb-2">Deluxe Burger</h3>
                  <div className="flex items-center gap-2 mb-4">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold">4.9</span>
                    <span className="text-gray-500">(200+ reviews)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold text-orange-600">$12.99</span>
                    <button className="px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all">
                      Order Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Clock className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Fast Delivery</div>
                    <div className="text-sm text-gray-500">Under 30 mins</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 animate-float" style={{animationDelay: '1s'}}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Zap className="w-6 h-6 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Live Tracking</div>
                    <div className="text-sm text-gray-500">Real-time updates</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          {/* Search Input */}
          <div className="mb-8">
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search restaurants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>
            {searchTerm && (
              <p className="text-center text-sm text-gray-500 mt-2">
                {featuredRestaurants.filter(restaurant => {
                  const matchesCategory = activeCategory === 'all' || 
                    restaurant.cuisine.toLowerCase() === activeCategory;
                  const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
                  return matchesCategory && matchesSearch;
                }).length} restaurants found
              </p>
            )}
          </div>

          {/* Tabs */}
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 bg-gray-100">
              {categories.map((cat) => (
                <TabsTrigger 
                  key={cat} 
                  value={cat.toLowerCase()}
                  className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-red-500 data-[state=active]:text-white"
                >
                  {cat}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </section>

      <section id="restaurants" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Popular <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Restaurants</span>
            </h2>
            <p className="text-xl text-gray-600">Discover the best food in your neighborhood</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRestaurants
              .filter(restaurant => {
                const matchesCategory = activeCategory === 'all' || 
                  restaurant.cuisine.toLowerCase() === activeCategory;
                const matchesSearch = searchTerm === '' || 
                  restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
                return matchesCategory && matchesSearch;
              })
              .length === 0 ? (
                <div className="col-span-full text-center py-16">
                  <div className="text-6xl mb-4">🍽️</div>
                  <h3 className="text-2xl font-semibold text-gray-600 mb-2">No restaurants found</h3>
                  <p className="text-gray-500">
                    {searchTerm ? `No results for "${searchTerm}"` : 'Try selecting a different category'}
                  </p>
                </div>
              ) : (
                featuredRestaurants
                  .filter(restaurant => {
                    const matchesCategory = activeCategory === 'all' || 
                      restaurant.cuisine.toLowerCase() === activeCategory;
                    const matchesSearch = searchTerm === '' || 
                      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase());
                    return matchesCategory && matchesSearch;
                  })
                  .map((restaurant, idx) => (
              <div key={idx} className="bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group cursor-pointer">
                <div className="relative bg-gradient-to-br from-orange-100 to-red-100 h-48 flex items-center justify-center">
                  <div className="text-8xl group-hover:scale-110 transition-transform duration-300">
                    {restaurant.image}
                  </div>
                  {restaurant.popular && (
                    <div className="absolute top-4 right-4 px-3 py-1 bg-orange-500 text-white rounded-full text-sm font-semibold">Popular</div>
                  )}
                  <div className="absolute top-4 left-4 flex gap-2">
                    <button
                      onClick={() => dispatch(toggleLike(idx))}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-50 transition-colors"
                      aria-label={likedIds.includes(idx) ? 'Unlike' : 'Like'}
                    >
                      <Heart className={`w-5 h-5 ${likedIds.includes(idx) ? 'fill-red-500 text-red-500' : 'text-gray-400'} transition-colors`} />
                    </button>
                    <button
                      onClick={() => shareRestaurant(restaurant)}
                      className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-50 transition-colors"
                      aria-label="Share restaurant"
                    >
                      <Share2 className="w-5 h-5 text-gray-400 hover:text-blue-500 transition-colors" />
                    </button>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-2">{restaurant.name}</h3>
                  <p className="text-gray-600 mb-4">{restaurant.cuisine}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">{restaurant.rating}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="w-5 h-5" />
                      <span>{restaurant.time} min</span>
                    </div>
                    <button
                      onClick={() => dispatch(addItem({ id: idx, name: restaurant.name, price: 999, image: restaurant.image }))}
                      className="px-4 py-2 bg-orange-50 text-orange-600 rounded-lg font-semibold hover:bg-orange-100 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
                ))
              )}
          </div>
        </div>
      </section>

      <section id="how" className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              How It <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">Works</span>
            </h2>
            <p className="text-xl text-gray-600">Get your food in 3 simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', title: 'Choose Location', desc: 'Enter your delivery address and browse nearby restaurants', icon: MapPin },
              { step: '02', title: 'Select Food', desc: 'Pick your favorite meals from diverse menus and cuisines', icon: ShoppingBag },
              { step: '03', title: 'Fast Delivery', desc: 'Track your order in real-time and enjoy hot, fresh food', icon: Clock }
            ].map((item, idx) => (
              <div key={idx} className="text-center group">
                <div className="relative inline-block mb-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-xl">
                    <item.icon className="w-12 h-12 text-white" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold text-2xl text-orange-600 shadow-lg">{item.step}</div>
                </div>
                <h3 className="text-2xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 text-lg">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-orange-500 to-red-500">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">Ready to Order Your Favorite Food?</h2>
          <p className="text-xl mb-8 opacity-90">Join thousands of happy customers enjoying delicious meals delivered to their doorstep</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-orange-600 rounded-full font-bold text-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105">Order Now</button>
            <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white hover:text-orange-600 transition-all duration-300">Download App</button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <Logo size="sm" />
              <p className="text-gray-400">Delicious food delivered to your door in minutes.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Safety</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookies</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Easy Delivery. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-fadeIn { animation: fadeIn 1s ease-out; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
}


