import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, MapPin, Star, Filter, Search } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';

interface ShopItem {
  id: string;
  name: string;
  category: string;
  price: number;
  rating: number;
  distance: string;
  image: string;
  description: string;
  shop: string;
}

export const Shop: React.FC = () => {
  const [items, setItems] = useState<ShopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['all', 'souvenirs', 'clothing', 'electronics', 'food', 'accessories'];

  useEffect(() => {
    // Simulate API call
    const fetchItems = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockItems: ShopItem[] = [
        {
          id: '1',
          name: 'Local Handcrafted Souvenir',
          category: 'souvenirs',
          price: 25,
          rating: 4.8,
          distance: '0.2 km',
          image: 'https://images.pexels.com/photos/1070945/pexels-photo-1070945.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Authentic handmade souvenir from local artisans',
          shop: 'Traditional Crafts Store'
        },
        {
          id: '2',
          name: 'Travel Backpack',
          category: 'accessories',
          price: 89,
          rating: 4.6,
          distance: '0.5 km',
          image: 'https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Durable travel backpack perfect for adventures',
          shop: 'Adventure Gear Co.'
        },
        {
          id: '3',
          name: 'Local Street Food Snacks',
          category: 'food',
          price: 12,
          rating: 4.9,
          distance: '0.1 km',
          image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Authentic local snacks and treats',
          shop: 'Street Food Market'
        },
        {
          id: '4',
          name: 'Portable Phone Charger',
          category: 'electronics',
          price: 35,
          rating: 4.4,
          distance: '0.3 km',
          image: 'https://images.pexels.com/photos/163117/phone-mobile-smartphone-android-163117.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'High-capacity portable charger for travel',
          shop: 'Tech Hub'
        },
        {
          id: '5',
          name: 'Traditional Local Clothing',
          category: 'clothing',
          price: 65,
          rating: 4.7,
          distance: '0.4 km',
          image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Beautiful traditional clothing item',
          shop: 'Cultural Fashion'
        },
        {
          id: '6',
          name: 'Travel Journal',
          category: 'accessories',
          price: 18,
          rating: 4.5,
          distance: '0.2 km',
          image: 'https://images.pexels.com/photos/261763/pexels-photo-261763.jpeg?auto=compress&cs=tinysrgb&w=400',
          description: 'Premium leather travel journal',
          shop: 'Stationery Plus'
        }
      ];
      
      setItems(mockItems);
      setLoading(false);
    };

    fetchItems();
  }, []);

  const filteredItems = items.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (item: ShopItem) => {
    alert(`Added "${item.name}" to cart! (This is a demo - no actual purchase)`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Local Shopping
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Discover authentic local products, souvenirs, and travel essentials from nearby shops and markets.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Filter className="h-5 w-5 text-gray-500" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i} className="p-6 animate-pulse">
                <div className="w-full h-48 bg-gray-300 dark:bg-gray-700 rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              </Card>
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="overflow-hidden">
                  <div className="relative">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 px-2 py-1 rounded-full text-sm font-semibold">
                      ${item.price}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-sky-600 dark:text-sky-400 font-medium capitalize">
                        {item.category}
                      </span>
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-3 w-3 text-gray-500" />
                        <span className="text-sm text-gray-500">{item.distance}</span>
                      </div>
                    </div>
                    
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {item.name}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {item.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">{item.shop}</span>
                    </div>
                    
                    <Button
                      onClick={() => handleAddToCart(item)}
                      className="w-full"
                      size="sm"
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}

        {filteredItems.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              No products found
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Try adjusting your search or filter criteria
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};