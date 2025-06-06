'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { FaShoppingCart, FaUser } from 'react-icons/fa';
import { useSession, signOut } from 'next-auth/react';

export default function Navbar() {
  const items = useCartStore((state) => state.items);
  const { data: session } = useSession();
  const itemCount = items.reduce((total, item) => total + (item.quantity || 1), 0);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-gray-800">
              Tewanay Store
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            
            <Link href="/cart" className="relative">
              <FaShoppingCart className="h-6 w-6 text-gray-600 hover:text-gray-900" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                  {itemCount}
                </span>
              )}
            </Link>
            {session ? (
              <div className="flex items-center space-x-4">
                <span className="text-gray-600">
                  Welcome, {session.user?.name}
                </span>
                <button
                  onClick={() => signOut()}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/auth/signin"
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <FaUser className="h-5 w-5" />
                <span>Sign In</span>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
} 