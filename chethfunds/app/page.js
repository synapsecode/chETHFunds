// pages/login.js

import Link from 'next/link';

export default function Login() {
  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-gray-900">
      <div className="relative w-[380px] h-[420px] bg-gray-800 rounded-lg overflow-hidden">
        <div className="absolute w-full h-full bg-transparent border-lime-500 border-4 rounded-full animate-spin"></div>
        <div className="absolute inset-1 bg-gray-800 rounded-lg z-10 p-5">
          <form>
            <h2 className="text-2xl font-semibold text-lime-500 text-center mb-6">Login</h2>
            <div className="relative flex flex-col mb-6">
              <input
                type="email"
                id="email"
                autoFocus
                placeholder=" "
                className="relative z-10 border-0 border-b-2 border-lime-500 h-10 bg-transparent text-gray-100 outline-none px-2 peer"
              />
              <i className="bg-lime-500 rounded w-full bottom-0 left-0 absolute h-1 -z-10 transition-transform duration-300 origin-bottom transform peer-focus:h-1 peer-placeholder-shown:h-[0.5px]"></i>
              <label className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-500 text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-8">Enter Email</label>
            </div>

            <div className="relative flex flex-col mb-6">
              <input
                type="password"
                id="password"
                placeholder=" "
                className="relative z-10 border-0 border-b-2 border-lime-500 h-10 bg-transparent text-gray-100 outline-none px-2 peer"
              />
              <i className="bg-lime-500 rounded w-full bottom-0 left-0 absolute h-1 -z-10 transition-transform duration-300 origin-bottom transform peer-focus:h-1 peer-placeholder-shown:h-[0.5px]"></i>
              <label className="peer-focus:font-medium absolute text-sm duration-300 transform -translate-y-8 scale-75 top-3 left-0 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-lime-500 text-lime-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:text-gray-500 peer-focus:scale-75 peer-focus:-translate-y-8">Enter Password</label>
            </div>

            <button
              type="submit"
              className="py-3 text-gray-100 bg-lime-500 w-full rounded hover:bg-lime-600 hover:scale-105 duration-300"
            >
              Login
            </button>
          </form>

          <p className="mt-4 text-gray-600">
            Don't have an account?{' '}
            
              <a href='/register' className="text-blue-500">Register</a>
           
          </p>
        </div>
      </div>
    </div>
  );
}
