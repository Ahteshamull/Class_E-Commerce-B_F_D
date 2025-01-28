import React, { useState } from "react";
import { Link } from "react-router";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
      <div className="flex flex-col justify-center p-4 font-[sans-serif] sm:h-screen">
        <div className="mx-auto w-full max-w-md rounded-2xl border border-gray-300 p-8">
          <div className="mb-5 text-center">
            <h2 className="text-3xl font-bold">Sign Up</h2>
          </div>
          <form>
            <div className="space-y-6">
              <div>
                <label className="mb-2 block text-sm text-gray-800">
                  Email Id
                </label>
                <input
                  name="email"
                  type="text"
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-blue-500"
                  placeholder="Enter email"
                />
              </div>
              <div className="relative">
                <label className="mb-2 block text-sm text-gray-800">
                  Password
                </label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-blue-500"
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
              <div>
                <label className="mb-2 block text-sm text-gray-800">
                  Confirm Password
                </label>
                <input
                  name="password"
                  type="password"
                  className="w-full rounded-md border border-gray-300 bg-white px-4 py-3 text-sm text-gray-800 outline-blue-500"
                  placeholder="Enter confirm password"
                />
              </div>
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
                  I accept the{" "}
                  <a
                    href="javascript:void(0);"
                    className="ml-1 font-semibold text-blue-600 hover:underline"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <div className="!mt-8">
              <button
                type="button"
                className="w-full rounded-md bg-blue-600 px-4 py-3 text-sm font-semibold tracking-wider text-white hover:bg-blue-700 focus:outline-none"
              >
                Create an account
              </button>
            </div>
            <p className="mt-6 text-center text-sm text-gray-800">
              Already have an account?{" "}
              <Link to="/login">
                <a
                  href="javascript:void(0);"
                  className="ml-1 font-semibold text-blue-600 hover:underline"
                >
                  Login here
                </a>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
