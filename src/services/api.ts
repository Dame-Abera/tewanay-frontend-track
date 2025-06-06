import axios from 'axios';
import { Product } from '@/store/cartStore';

const api = axios.create({
  baseURL: 'https://fakestoreapi.com',
});

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
};

export const getProduct = async (id: number): Promise<Product> => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw new Error('Failed to fetch product');
  }
};

export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await api.get('/products/categories');
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw new Error('Failed to fetch categories');
  }
};

export const getProductsByCategory = async (category: string): Promise<Product[]> => {
  try {
    const response = await api.get(`/products/category/${category}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching products for category ${category}:`, error);
    throw new Error('Failed to fetch products by category');
  }
}; 