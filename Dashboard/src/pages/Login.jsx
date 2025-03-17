import React, { useState } from "react";
import { Link, useNavigate } from "react-router"; // Correct import
import { FaEyeSlash, FaEye } from "react-icons/fa";
import axios from "axios";
import { handleError, handleSuccess } from "../Util";
import { ToastContainer } from "react-toastify";
import { useDispatch } from "react-redux";
import { userLoginInfo } from "../slices/userSlice";
import Cookie from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); // Loading state

  const handleChange = (e) => {
    setLoginInfo({ ...loginInfo, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!loginInfo.email || !loginInfo.password) {
      handleError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/auth/login",
        loginInfo,
        { withCredentials: true },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      if (response.data.data.role === "admin") {
        dispatch(userLoginInfo(response.data.data));

        // localStorage.setItem("userData", JSON.stringify(response.data.data))
        Cookie.set(
          "user",
          String(response.data.data.role + response.data.data.id),
          { expires: 60 / 1440 },
        );
        handleSuccess(response.data.data.message || "Admin Login Success!");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }  else  {
        handleError(response.data.error || "Only admin can access this !");
        setLoading(false);
      }
    } catch (error) {
      const { response } = error;
     
      handleError(response.data.message);
        setLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 font-[sans-serif]">
      <div className="flex min-h-screen flex-col items-center justify-center px-4 py-6">
        <div className="w-full max-w-md">
          <div className="rounded-2xl bg-white p-8 shadow">
            <h2 className="text-center text-2xl font-bold text-gray-800">
              Sign in
            </h2>
            <form onSubmit={handleSubmit} className="mt-8 space-y-4">
              {/* Email input */}
              <div>
                <label className="mb-2 block text-sm text-gray-800">
                  Email
                </label>
                <div className="relative flex items-center">
                  <input
                    onChange={handleChange}
                    name="email"
                    value={loginInfo.email}
                    type="email"
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-600"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              {/* Password input */}
              <div>
                <label className="mb-2 block text-sm text-gray-800">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    onChange={handleChange}
                    name="password"
                    value={loginInfo.password}
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full rounded-md border border-gray-300 px-4 py-3 text-sm text-gray-800 outline-blue-600"
                    placeholder="Enter password"
                  />
                  <button
                    type="button"
                    className="absolute top-[10px] right-2 cursor-pointer"
                    onClick={() => setShowPassword((prev) => !prev)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <FaEyeSlash size={22} className="text-gray-400" />
                    ) : (
                      <FaEye size={22} className="text-gray-400" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me and Forgot password */}
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
                    href="#"
                    className="font-semibold text-blue-600 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
              </div>

              {/* Submit button */}
              <div className="!mt-8">
                <button
                  type="submit"
                  disabled={loading} // Disable button when loading
                  className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm tracking-wide text-white hover:bg-blue-700 focus:outline-none disabled:opacity-50"
                >
                  {loading ? "Signing in..." : "Sign in"}
                </button>
              </div>

              {/* Registration link */}
              <p className="!mt-8 text-center text-sm text-gray-800">
                Don't have an account?{" "}
                <Link to="/signup">
                  <span className="ml-1 font-semibold text-blue-600 hover:underline">
                    Register here
                  </span>
                </Link>
              </p>
            </form>
            <ToastContainer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
