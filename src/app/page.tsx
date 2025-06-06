'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getProducts, getCategories } from '@/services/api';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/store/cartStore';
import { FaSearch, FaSort } from 'react-icons/fa';

type SortOption = 'name-asc' | 'name-desc' | 'price-asc' | 'price-desc' | 'category';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('name-asc');

  const { 
    data: products, 
    isLoading: productsLoading,
    error: productsError 
  } = useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
  });

  const { 
    data: categories, 
    isLoading: categoriesLoading,
    error: categoriesError 
  } = useQuery<string[]>({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  if (productsLoading || categoriesLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (productsError || categoriesError) {
    return (
      <div className="text-center text-red-600 py-8">
        Error loading data. Please try again later.
      </div>
    );
  }

  if (!products || !categories) {
    return (
      <div className="text-center text-gray-600 py-8">
        No data available.
      </div>
    );
  }

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        !selectedCategory || product.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.title.localeCompare(b.title);
        case 'name-desc':
          return b.title.localeCompare(a.title);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <FaSearch className="absolute left-3 top-3 text-gray-400" />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </option>
          ))}
        </select>
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="category">Category</option>
          </select>
          <FaSort className="absolute left-3 top-3 text-gray-400" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center text-gray-600 py-8">
          No products found matching your criteria.
        </div>
      )}
    </div>
  );
}
