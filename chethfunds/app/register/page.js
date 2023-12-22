// pages/register.js

import Image from 'next/image';
import Link from 'next/link';

export default function Register() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-#353935 text-white">
      <section className="flex flex-col items-center bg-black p-8 rounded-md shadow-md">
        <h1 className="text-8xl mb-8 text-indigo-600">ChETH Funds</h1>

        {/* Registration Form */}
        <form className="flex flex-col items-center space-y-4">
          <h2 className="text-3xl mb-4 text-gray-800">Register</h2>
          <input
            type="text"
            placeholder="Username"
            className="p-3 border rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            className="p-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border rounded-md"
          />
          <button
            type="submit"
            className="bg-green-500 text-white p-2 rounded-md"
          >
            Register
          </button>
        </form>

        {/* Redirect to Login Page */}
        <p className="mt-4 text-gray-600">
          Already have an account?{' '}
          
            <a href='/' className="text-blue-500">Login here</a>
          
        </p>
      </section>
    </main>
  );
}
