'use client';

import React, { useState } from 'react';
import { auth } from '@/firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";



const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up successfully!');
      window.location.href = '/homePage';
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-#353935 text-black">
      <section className="flex flex-col items-center bg-black p-8 rounded-md shadow-md">
        <h1 className="text-8xl mb-8 text-indigo-600">ChETH Funds</h1>

        {/* Registration Form */}
        <form className="flex flex-col items-center space-y-4" onSubmit={handleSignUp}>
          <h2 className="text-3xl mb-4 text-gray-800">Register</h2>
          {/* <input
            type="text"
            placeholder="Username"
            className="p-3 border rounded-md"
          /> */}
          <input
            type="email"
            placeholder="Email"
            className='px-2 py-1 rounded'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            className='px-2 py-1 rounded'
            onChange={(e) => setPassword(e.target.value)}
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
export default Register;