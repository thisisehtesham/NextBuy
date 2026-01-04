'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.error === 'Invalid credentials') {
        alert('Invalid email or password. Please try again.');
      } else {
        alert('Login failed: ' + (data.error || 'An unknown error occurred.'));
      }
    } else {
      login({ email });
      router.push('/products');
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-[#15803d] mb-6">Login</h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15803d]"
          required
        />
        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-6 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15803d]"
          required
        />
        <button
          type="submit"
          className="w-full py-2.5 bg-[#15803d] text-white font-semibold rounded-lg hover:bg-white hover:text-[#15803d] border-2 border-[#15803d] transition-all duration-300"
        >
          Login
        </button>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">Do not have an account?</p>
          <button
            type="button"
            onClick={() => router.push('/register')}
            className="text-[#15803d] hover:underline text-sm mt-1 font-medium"
          >
            Register here
          </button>
        </div>
      </form>
    </div>
  );
}
