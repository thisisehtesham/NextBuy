'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function OrderSuccessClient() {
  const params = useSearchParams();
  const orderId = params.get('id');

  return (
    <div className="flex flex-col justify-center items-center h-[calc(100vh-80px)] text-center px-4">
      <h1 className="text-4xl font-bold text-[#15803d] mb-4">
        🎉 Order Placed Successfully!
      </h1>

      <p className="text-lg text-gray-700 mb-1">
        Your order ID is{' '}
        <span className="font-semibold text-black">
          {orderId ?? '—'}
        </span>
      </p>

      <p className="text-md text-slate-600 mb-6">
        Thank you for shopping with us!
      </p>

      <Link
        href="/products"
        className="bg-[#15803d] text-white text-md font-semibold py-3 px-8 rounded-md
        border-2 border-[#15803d] hover:bg-white hover:text-[#15803d] transition-all duration-300"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
