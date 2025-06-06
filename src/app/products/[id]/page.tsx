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
      <div className="text-center text-red-600">
        Product not found. Please try again later.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-white p-6 rounded-lg shadow-sm">
      <div className="relative h-[400px] w-full bg-gray-50 rounded-lg">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-4"
        />
      </div>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.title}</h1>
          <p className="text-2xl font-semibold text-blue-700">
            ${product.price.toFixed(2)}
          </p>
        </div>
        <div className="border-t border-b border-gray-200 py-4">
          <p className="text-gray-800 leading-relaxed">{product.description}</p>
        </div>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => addItem(product)}
            className="flex items-center justify-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg hover:bg-blue-800 transition-colors"
          >
            <FaShoppingCart className="h-5 w-5" />
            Add to Cart
          </button>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            Product Details
          </h2>
          <ul className="space-y-2">
            <li className="flex items-center gap-2">
              <span className="font-medium text-gray-900">Category:</span>
              <span className="text-gray-800">
                {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
} 