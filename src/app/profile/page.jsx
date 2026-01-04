'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProfilePage() {
  const { user, login } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      setForm({
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        zip: user.zip || '',
      });
    }
  }, [user, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setMessage('Name and email are required.');
      return;
    }

    login(form);
    setMessage('Profile updated!');
  };

  if (!user) return null;

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-3xl font-bold text-[#15803d] mb-6">Your Profile</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-5 bg-white p-6 rounded-xl shadow-md border border-gray-200"
      >
        <input
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15803d]"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15803d]"
        />
        <input
          name="phone"
          type="tel"
          placeholder="Phone Number"
          value={form.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15803d]"
        />
        <input
          name="address"
          placeholder="Street Address"
          value={form.address}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15803d]"
        />
        <div className="flex gap-4">
          <input
            name="city"
            placeholder="City"
            value={form.city}
            onChange={handleChange}
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15803d]"
          />
          <input
            name="zip"
            placeholder="ZIP Code"
            value={form.zip}
            onChange={handleChange}
            className="w-1/2 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15803d]"
          />
        </div>
        <button
          type="submit"
          className="w-full py-2.5 bg-[#15803d] text-white font-semibold rounded-lg hover:bg-white hover:text-[#15803d] border-2 border-[#15803d] transition-all duration-300"
        >
          Update Profile
        </button>
        {message && <p className="text-green-600 text-center">{message}</p>}
      </form>
    </div>
  );
}
