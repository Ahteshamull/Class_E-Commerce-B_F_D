import React, { useState } from "react";
import { Link } from "react-router";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <div className="bg-gray-50 font-[sans-serif]">
        <div className="flex min-h-screen flex-col items-center justify-center px-4 py-6">
          <div className="w-full max-w-md">
            <div className="rounded-2xl bg-white p-8 shadow">
              <h2 className="text-center text-2xl font-bold text-gray-800">
                Sign in
              </h2>
              <form className="mt-8 space-y-4">
                <div>
                  <label className="mb-2 block text-sm text-gray-800">
                    User name
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="username"
                      type="text"
                      required=""
                      className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-600"
                      placeholder="Enter user name"
                    />
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#bbb"
                      stroke="#bbb"
                      className="absolute right-4 h-4 w-4"
                      viewBox="0 0 24 24"
                    >
                      <circle cx={10} cy={7} r={6} data-original="#000000" />
                      <path
                        d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                        data-original="#000000"
                      />
                    </svg>
                  </div>
                </div>
                <div>
                  <label className="mb-2 block text-sm text-gray-800">
                    Password
                  </label>
                  <div className="relative flex items-center">
                    <input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required=""
                      className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-600"
                      placeholder="Enter password"
                    />
                    <div
                      className="absolute top-1 right-2 cursor-pointer"
                      onClick={() => setShowPassword((prev) => !prev)}
                    >
                      <span>
                        {showPassword ? (
                          <FaEyeSlash size={22} className="text-gray-400" />
                        ) : (
                          <FaEye size={22} className="text-gray-400" />
                        )}
                      </span>
                    </div>
                    
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center">
                    <input
                      id="remember-me"
                      name="remember-me"
                      type="checkbox"
                      className="h-4 w-4 shrink-0 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <label
                      htmlFor="remember-me"
                      className="ml-3 block text-sm text-gray-800"
                    >
                      Remember me
                    </label>
                  </div>
                  <div className="text-sm">
                    <a
                      href="jajvascript:void(0);"
                      className="font-semibold text-blue-600 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
                </div>
                <div className="!mt-8">
                  <button
                    type="button"
                    className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm tracking-wide text-white hover:bg-blue-700 focus:outline-none"
                  >
                    Sign in
                  </button>
                </div>
                <p className="!mt-8 text-center text-sm text-gray-800">
                  Don't have an account?{" "}
                  <Link to={"/signup"}>
                    <a
                      href="javascript:void(0);"
                      className="ml-1 font-semibold whitespace-nowrap text-blue-600 hover:underline"
                    >
                      Register here
                    </a>
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
