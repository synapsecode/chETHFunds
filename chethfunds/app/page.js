// pages/login.js

'use client';
import Link from 'next/link';
import {Register} from './register/page'


export default function Login() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-#353935 text-white">
      <section className="flex flex-col items-center bg-black p-8 rounded-md shadow-md">
        <h1 className="text-8xl mb-8 text-indigo-600">ChETH Funds</h1>

        {/* Login Form */}
        <form className="flex flex-col items-center space-y-4">
          <h2 className="text-3xl mb-4 text-gray-800">Login</h2>
          <input
            type="text"
            placeholder="Username"
            className="p-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border rounded-md"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-md"
          >
            Login
          </button>
        </form>

        {/* Redirect to Register Page */}
        <p className="mt-4 text-gray-600">
          Don't have an account?{' '}

            <a href='./register' className="text-blue-500">Register</a>
          
        </p>
      </section>
    </main>
  );
}
