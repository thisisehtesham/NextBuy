'use client';
import { use, useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { getAllProducts } from '@/lib/products';
import Image from 'next/image';

export default function ProductDetail({ params }) {
  const { id: productId } = use(params);
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [form, setForm] = useState({ name: '', rating: 5, comment: '' });
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const products = getAllProducts();
    const found = products.find((p) => p.id === productId || p.id === Number(productId));
    setProduct(found);

    const allReviews = JSON.parse(localStorage.getItem('reviews') || '{}');
    setReviews(allReviews[productId] || []);
  }, [productId]);

  const submitReview = (e) => {
    e.preventDefault();
    const { name, rating, comment } = form;

    if (!name.trim() || !comment.trim()) {
      alert('Name and comment are required.');
      return;
    }

    if (rating < 1 || rating > 5) {
      alert('Rating must be between 1 and 5.');
      return;
    }

    const newReview = {
      ...form,
      rating: parseInt(rating),
      createdAt: new Date().toISOString(),
    };

    const allReviews = JSON.parse(localStorage.getItem('reviews') || '{}');
    const updated = [...(allReviews[productId] || []), newReview];
    allReviews[productId] = updated;

    localStorage.setItem('reviews', JSON.stringify(allReviews));
    setReviews(updated);
    setForm({ name: '', rating: 5, comment: '' });
  };

  const averageRating = reviews.length
    ? (
        reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
      ).toFixed(1)
    : null;

  if (!product) return <div className="p-4 text-center">Product not found</div>;

  return (
    <div className="p-4 flex justify-center">
      <div className="w-full max-w-2xl bg-white p-6 rounded-[30px] shadow-2xl hover:scale-[1.01] transition">
        {/* Product Display */}
        <Image
          src={product.image}
          alt={product.title || product.name}
          width={400}
          height={300}
          className="w-full h-64 object-contain mb-4"
        />
        <h1 className="text-2xl font-bold mb-2 text-center">{product.title || product.name}</h1>
        <p className="text-green-600 font-semibold text-lg mb-1 text-center">₹{product.price}</p>
        <p className="text-gray-600 text-sm mb-4 text-center">{product.description}</p>
        <div className="flex justify-center">
          <button
            onClick={() => addToCart(product)}
            className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
            text-sm px-4 py-2 hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
          >
            Add to Cart
          </button>
        </div>

        {/* Average Rating */}
        {averageRating && (
          <div className="mt-6 text-yellow-600 font-semibold text-center">
            ⭐ Average Rating: {averageRating} / 5
          </div>
        )}

        {/* Review Form */}
        <form onSubmit={submitReview} className="space-y-3 mt-6">
          <h2 className="text-xl font-bold text-center">Leave a Review</h2>
          <input
            placeholder="Your Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border px-3 py-2 rounded-md"
          />
          <select
            value={form.rating}
            onChange={(e) => setForm({ ...form, rating: e.target.value })}
            className="w-full border px-3 py-2 rounded-md"
          >
            {[5, 4, 3, 2, 1].map((r) => (
              <option key={r} value={r}>
                {r} - {['Excellent', 'Good', 'Okay', 'Poor', 'Terrible'][5 - r]}
              </option>
            ))}
          </select>
          <textarea
            placeholder="Your Comment"
            value={form.comment}
            onChange={(e) => setForm({ ...form, comment: e.target.value })}
            className="w-full border px-3 py-2 rounded-md"
          />
          <div className="flex justify-center">
            <button
              type="submit"
              className="text-gray-700 border-2 border-gray-700 rounded-full font-semibold 
              text-sm px-4 py-2 hover:bg-gray-700 hover:text-white transition duration-300 ease-in"
            >
              Submit Review
            </button>
          </div>
        </form>

        {/* Review List */}
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2 text-center">Reviews ({reviews.length})</h2>
          {reviews.length === 0 && <p className="text-gray-600 text-center">No reviews yet.</p>}
          {reviews.map((r, i) => (
            <div key={i} className="border rounded-xl p-4 mb-4 shadow-sm bg-gray-50">
              <div className="flex justify-between">
                <div className="font-semibold">{r.name}</div>
                <div className="text-yellow-500 font-medium">⭐ {r.rating}</div>
              </div>
              <p className="text-gray-600 text-sm">{new Date(r.createdAt).toLocaleDateString()}</p>
              <p className="mt-1">{r.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
