'use client';

import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@/services/api';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import { FaShoppingCart } from 'react-icons/fa';

export default function ProductDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const { data: product, isLoading } = useQuery({
    queryKey: ['product', params.id],
    queryFn: () => getProduct(parseInt(params.id)),
  });

  const addItem = useCartStore((state) => state.addItem);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center text-red-500">
        Product not found. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="relative h-[400px] w-full">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain"
        />
      </div>
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">{product.title}</h1>
        <p className="text-2xl font-semibold text-blue-600">
          ${product.price.toFixed(2)}
        </p>
        <p className="text-gray-600">{product.description}</p>
        <div className="pt-4">
          <button
            onClick={() => addItem(product)}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <FaShoppingCart className="h-5 w-5" />
            Add to Cart
          </button>
        </div>
        <div className="pt-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Product Details
          </h2>
          <ul className="space-y-2">
            <li>
              <span className="font-medium">Category:</span>{' '}
              {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 