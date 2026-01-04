'use client';
import { useEffect, useState } from 'react';

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('orders') || '[]');
    setOrders(stored);
  }, []);

  const updateStatus = (id, newStatus) => {
    const updated = orders.map((o) =>
      o.id === id ? { ...o, status: newStatus } : o
    );
    setOrders(updated);
    localStorage.setItem('orders', JSON.stringify(updated));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-[#15803d] mb-6">All Orders</h1>
      {orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border border-gray-300 bg-white rounded-lg p-5 shadow-sm"
            >
              <div className="flex justify-between items-center mb-3">
                <p className="font-semibold text-lg">
                  <strong>#{order.id}</strong> - {order.customer.name}
                </p>
                <p className="text-gray-500 text-sm">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <p className="mb-3">
                Status: <strong className="capitalize">{order.status}</strong>
              </p>
              <div className="flex gap-3 flex-wrap">
                {['pending', 'shipped', 'delivered', 'cancelled'].map(
                  (status) => (
                    <button
                      key={status}
                      onClick={() => updateStatus(order.id, status)}
                      className={`px-3 py-1 rounded text-sm font-medium transition-colors duration-200 ${
                        status === order.status
                          ? 'bg-[#15803d] text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
