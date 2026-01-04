'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch('/api/register', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await res.json();

    if (!res.ok) {
      if (data.error === 'User exists') {
        alert('A user with this email already exists.');
      } else {
        alert('Registration failed: ' + data.error);
      }
    } else {
      alert('Registration successful!');
      router.push('/login');
    }
  }

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow-md border border-gray-200"
      >
        <h2 className="text-3xl font-bold text-center text-[#15803d] mb-6">Register</h2>

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
          Register
        </button>

        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">Already have an account?</p>
          <button
            type="button"
            onClick={() => router.push('/login')}
            className="text-[#15803d] hover:underline text-sm mt-1 font-medium"
          >
            Login here
          </button>
        </div>
      </form>
    </div>
  );
}
