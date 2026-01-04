'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('products') || '[]');
    setProducts(stored);
  }, []);

  const deleteProduct = (id) => {
    const updated = products.filter((p) => p.id !== id);
    setProducts(updated);
    localStorage.setItem('products', JSON.stringify(updated));
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-[#15803d]">Products</h1>
        <Link
          href="/admin/products/new"
          className="px-4 py-2 bg-[#15803d] text-white font-semibold rounded-lg hover:bg-white hover:text-[#15803d] border-2 border-[#15803d] transition-all duration-300"
        >
          Add Product
        </Link>
      </div>

      {products.length === 0 ? (
        <p className="text-center text-gray-500">No products available.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div
              key={p.id}
              className="border border-gray-200 rounded-lg bg-white p-5 shadow-sm flex flex-col justify-between"
            >
              <div>
                <h2 className="font-semibold text-lg text-gray-900">{p.name}</h2>
                <p className="mt-1 text-gray-700">${p.price.toFixed(2)}</p>
              </div>
              <button
                onClick={() => deleteProduct(p.id)}
                className="mt-4 self-start px-3 py-1 text-red-600 border border-red-600 rounded hover:bg-red-600 hover:text-white transition-colors duration-300"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
