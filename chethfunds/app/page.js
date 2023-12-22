// pages/login.js

'use client';
import Link from 'next/link';
import {Register} from './register/page'
import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';




  const Login = () => {  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  
    const handleLogin  = async (e) => {
      e.preventDefault();
      try {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('User signed in successfully!');
        window.location.href = '/homePage';
      } catch (error) {
        console.error('Error signing in:', error.message);
      }
    };
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-#353935 text-black">
      <section className="flex flex-col items-center bg-black p-8 rounded-md shadow-md">
        <h1 className="text-8xl mb-8 text-indigo-600">ChETH Funds</h1>

        {/* Login Form */}
        <form className="flex flex-col items-center space-y-4" onSubmit={handleLogin}>
          <h2 className="text-3xl mb-4 text-gray-800">Login</h2>
          <input
            type="email"
            placeholder="Email"
            value={email}
            className="p-2 border rounded-md"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border rounded-md"
            value={password}
        onChange={(e) => setPassword(e.target.value)}
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
          {/* <Register/> */}
            <a href='./register' className="text-blue-500">Register</a>
          
        </p>
      </section>
    </main>
  );
}
export default Login;