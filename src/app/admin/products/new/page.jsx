'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function NewProductPage() {
  const [form, setForm] = useState({ name: '', price: '', description: '', image: '' });
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newProduct = {
      id: Date.now().toString(),
      ...form,
      price: parseFloat(form.price),
    };
    const stored = JSON.parse(localStorage.getItem('products') || '[]');
    localStorage.setItem('products', JSON.stringify([...stored, newProduct]));
    router.push('/admin/products');
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-[#15803d] mb-6">Add Product</h1>
      <form onSubmit={handleSubmit} className="space-y-5 bg-white p-6 rounded-xl shadow-md border border-gray-200">
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15803d]"
          placeholder="Product Name"
          value={form.name}
          required
          onChange={e => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15803d]"
          placeholder="Image URL"
          value={form.image}
          required
          onChange={e => setForm({ ...form, image: e.target.value })}
        />
        <input
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15803d]"
          type="number"
          step="0.01"
          placeholder="Price"
          value={form.price}
          required
          onChange={e => setForm({ ...form, price: e.target.value })}
        />
        <textarea
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15803d] resize-none"
          placeholder="Description"
          value={form.description}
          required
          rows={4}
          onChange={e => setForm({ ...form, description: e.target.value })}
        />
        <button
          type="submit"
          className="w-full py-2.5 bg-[#15803d] text-white font-semibold rounded-lg hover:bg-white hover:text-[#15803d] border-2 border-[#15803d] transition-all duration-300"
        >
          Save Product
        </button>
      </form>
    </div>
  );
}
