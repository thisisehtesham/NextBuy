'use client';

import { useEffect, useState } from 'react';
import { getAllProducts } from '@/lib/products';
import Link from 'next/link';
import Image from 'next/image';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    setProducts(getAllProducts());
  }, []);

  const filtered = products.filter((p) => {
    return (
      (!search || (p.title && p.title.toLowerCase().includes(search.toLowerCase()))) &&
      (!category || p.category === category) &&
      (!minPrice || p.price >= parseFloat(minPrice)) &&
      (!maxPrice || p.price <= parseFloat(maxPrice))
    );
  });

  return (
    <div className="max-w-6xl mx-auto p-4">
      {/* Filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        <input
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border px-3 py-2 rounded-md"
        >
          <option value="">All Categories</option>
          <option value="fashion">Fashion</option>
          <option value="jewelery">Jewelery</option>
          <option value="electronics">Electronics</option>
        </select>
        <input
          type="number"
          placeholder="Min Price"
          value={minPrice}
          onChange={(e) => setMinPrice(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          className="border px-3 py-2 rounded-md"
        />
      </div>

      {/* Product Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 px-4">
        {filtered.map((product) => (
          <Link
            href={`/products/${product.id}`}
            key={product.id}
            className="flex flex-col items-center justify-between 
              hover:scale-105 transition duration-300 ease-in-out gap-3 p-4
              rounded-[30px] shadow-2xl bg-white"
          >
            <div>
              <Image
                src={product.image}
                alt={product.title || product.name}
                width={180}
                height={150}
                className="w-full h-40 object-contain"
              />
            </div>
            <div className="text-center mt-2">
              <p className="text-gray-700 font-semibold text-lg text-left truncate w-50 mt-1">{product.title || product.name}</p>
              <p className="text-gray-400 font-normal text-[12px] mt-1">
                {product.description?.split(" ").slice(0, 10).join(" ") + "..."}
              </p>
              <p className="text-green-600 font-semibold mt-2">₹{product.price}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
