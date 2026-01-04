'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const [form, setForm] = useState({ name: '', address: '', email: '' });
  const router = useRouter();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newOrder = {
      id: Date.now().toString(),
      items: cart,
      total,
      customer: form,
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));

    clearCart();
    router.push(`/order-success?id=${newOrder.id}`);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-bold text-[#15803d] mb-8 uppercase">Checkout</h1>

      <div className="flex flex-col lg:flex-row gap-12">
        
        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="flex-1 space-y-6 bg-white shadow-md p-6 rounded-xl"
        >
          <input
            type="text"
            placeholder="Full Name"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15803d]"
          />
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15803d]"
          />
          <textarea
            placeholder="Shipping Address"
            required
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#15803d] resize-none h-28"
          ></textarea>

          <button
            type="submit"
            className="w-full bg-[#15803d] text-white font-semibold text-lg py-3 rounded-md hover:bg-white hover:text-[#15803d] border-2 border-[#15803d] transition-all duration-300"
          >
            Place Order
          </button>
        </form>

        {/* Summary Section */}
        <div className="flex-1 p-6 bg-gray-50 shadow-inner rounded-xl">
          <h2 className="text-2xl font-semibold text-[#166534] mb-4">Order Summary</h2>
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between text-slate-700 border-b pb-2">
                <span>{item.name} x {item.qty}</span>
                <span className="font-semibold">₹{(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
            <p className="text-xl font-bold text-black mt-4">
              Total: ₹{total.toFixed(2)}
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
