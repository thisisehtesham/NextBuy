'use client';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function AdminLoginPage() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const isAdmin = localStorage.getItem('isAdmin');
    if (isAdmin === 'true') router.push('/admin/products');
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;

    if (email === 'admin@example.com' && password === 'admin123') {
      localStorage.setItem('isAdmin', 'true');
      router.push('/admin/products');
    } else {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-200"
      >
        <h1 className="text-3xl font-bold text-center text-[#15803d] mb-6">Admin Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15803d]"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15803d]"
          required
        />

        <button
          type="submit"
          className="w-full py-2.5 bg-[#15803d] text-white font-semibold rounded-lg hover:bg-white hover:text-[#15803d] border-2 border-[#15803d] transition-all duration-300"
        >
          Login
        </button>

        {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
      </form>
    </div>
  );
}
