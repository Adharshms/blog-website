'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    router.push('/');
  };

  const handleGuest = () => {
    router.push('/');
  };

  return (
    <div className="h-screen bg-cover bg-center flex justify-center items-center p-4"
         style={{ backgroundImage: "url('https://picsum.photos/seed/travelblog/1600/900')" }}>
      <div className="bg-black bg-opacity-80 p-8 rounded-lg w-full max-w-sm text-center shadow-lg">
        <h2 className="text-white text-2xl mb-6">Sign In</h2>
        <form onSubmit={handleLogin}>
          <label htmlFor="email" className="block text-gray-300 text-left mb-2 text-sm">Email</label>
          <input
            id="email"
            className="w-full p-3 mb-4 rounded bg-gray-800 text-white border border-gray-700 focus:outline-none"
            type="email"
            placeholder="Email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-3 rounded font-bold text-lg hover:bg-red-700 transition">
            Login
          </button>
        </form>
        <button
          onClick={handleGuest}
          className="mt-4 text-gray-300 underline text-sm hover:text-white transition">
          Continue as Guest
        </button>
      </div>
    </div>
  );
}
