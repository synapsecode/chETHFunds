// pages/register.js
"use client";
import React, { useState } from 'react';
import auth from '../../firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      // You can add user registration logic here
      await createUserWithEmailAndPassword(auth, email, password);
      console.log('User signed up successfully!');
      // You can redirect the user to the home page or another page after successful registration
    } catch (error) {
      console.error('Error signing up:', error.message);
    }
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-black-900 flex-col">
    <h1 className="text-5xl font-bold text-blue-500 mb-9">CHETH FUNDS</h1>
      <div className="relative w-[380px] h-[420px] bg-black-800 rounded-lg overflow-hidden">
      <div className="absolute w-[380px] h-[420px] bg-gradient-to-r from-blue-500 via-blue-500 to-transparent -top-[50%] -left-[50%] animate-spin-slow origin-bottom-right"></div>
      <div className="absolute w-[380px] h-[420px] bg-gradient-to-r from-blue-500 via-blue-500 to-transparent -top-[50%] -left-[50%] animate-spin-delay origin-bottom-right"></div>
        <div className="absolute inset-1 bg-gray-800 rounded-lg z-10 p-5">
          <form onSubmit={handleSignUp}>
            <h2 className="text-2xl font-semibold text-blue-500 text-center mb-6">Register</h2>
            <div className="relative flex flex-col mb-6">
              {/* <input
                type="username"
                id="Username"
                autoFocus
                 placeholder=" "
                className="relative z-10 border-0 border-b-2 border-blue-500 h-10 bg-transparent text-gray-100 outline-none px-2 peer"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <i className="bg-blue-500 rounded w-full bottom-0 left-0 absolute h-1 -z-10 transition-transform duration-300 origin-bottom transform peer-focus:h-1 peer-placeholder-shown:h-[0.5px]"></i>
              <label className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-8">Enter Username</label>
            </div>

            <div className="relative flex flex-col mb-6"> */}
              <input
                type="email"
                id="Email"
                autoFocus
                 placeholder=" "
                className="relative z-10 border-0 border-b-2 border-blue-500 h-10 bg-transparent text-gray-100 outline-none px-2 peer"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <i className="bg-blue-500 rounded w-full bottom-0 left-0 absolute h-1 -z-10 transition-transform duration-300 origin-bottom transform peer-focus:h-1 peer-placeholder-shown:h-[0.5px]"></i>
              <label className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-8">Enter Email</label>
            </div>

            <div className="relative flex flex-col mb-6">
              <input
                type="password"
                id="Password"
                autoFocus
                placeholder=" "
                className="relative z-10 border-0 border-b-2 border-blue-500 h-10 bg-transparent text-gray-100 outline-none px-2 peer"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <i className="bg-blue-500 rounded w-full bottom-0 left-0 absolute h-1 -z-10 transition-transform duration-300 origin-bottom transform peer-focus:h-1 peer-placeholder-shown:h-[0.5px]"></i>
              <label className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500 text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-8">Enter Password</label>
            </div>

            <button
              type="submit"
              className="py-3 text-gray-100 bg-blue-500 w-full rounded hover:bg-blue-600 hover:scale-105 duration-300"
            >
              Register
            </button>
          </form>

          <p className="mt-4 text-gray-600">
            Already have an account?{' '}
            <a href='/' className="text-blue-500">Login here</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
