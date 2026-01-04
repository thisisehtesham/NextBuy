'use client';

import { use } from 'react';
import { useEffect, useState } from 'react';

export default function OrderDetail({ params }) {
  const { id } = use(params);
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('orders') || '[]');
    const found = stored.find((o) => o.id === id);
    setOrder(found);
  }, [id]);

  if (!order) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-80px)] text-gray-600 text-xl">
        Order not found.
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl mt-10">
      <h1 className="text-3xl font-bold text-[#15803d] mb-2">
        Order #{order.id}
      </h1>
      <p className="text-gray-600 mb-4">
        Placed on <span className="font-medium text-black">{new Date(order.createdAt).toLocaleString()}</span>
      </p>
      <p className="mb-2 text-slate-700 font-semibold">
        Status: <span className="text-black font-normal">{order.status}</span>
      </p>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-[#15803d] mb-2">Shipping Info</h2>
        <div className="text-slate-700 space-y-1">
          <p><span className="font-semibold">Name:</span> {order.customer.name}</p>
          <p><span className="font-semibold">Email:</span> {order.customer.email}</p>
          <p><span className="font-semibold">Address:</span> {order.customer.address}</p>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold text-[#15803d] mb-2">Items</h2>
        <div className="divide-y divide-gray-200">
          {order.items.map((item) => (
            <div key={item.id} className="flex justify-between py-2 text-slate-800">
              <span>{item.name} x {item.qty}</span>
              <span>${(item.qty * item.price).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <p className="font-bold text-lg text-black mt-4">
          Total: ${order.total.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
