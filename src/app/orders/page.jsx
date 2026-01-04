'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function OrdersPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState([]);
  
  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      const stored = JSON.parse(localStorage.getItem('orders') || '[]');
      setOrders(stored);
    }
  }, [user, router]);

  if (!user) return null
    

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-[#15803d] mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <div className="text-center text-gray-600 text-lg mt-20">
          <p>No orders found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-lg font-semibold text-gray-800">
                    Order #{order.id}
                  </p>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className="px-3 py-1 text-sm rounded-full bg-green-100 text-green-700 capitalize font-medium">
                  {order.status}
                </span>
              </div>

              <div className="mt-4 text-slate-700">
                <p className="text-md font-medium">
                  Total: <span className="text-black font-bold">${order.total.toFixed(2)}</span>
                </p>
              </div>

              <Link
                href={`/orders/${order.id}`}
                className="inline-block mt-4 text-[#15803d] hover:underline font-semibold"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
