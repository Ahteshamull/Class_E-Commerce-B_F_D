import React, { useState } from "react";
import axios from "axios";
import { handleError, handleSuccess } from "../Toast";
import { ToastContainer } from "react-toastify";
import { Spinner } from "@material-tailwind/react";
import Cookie from "js-cookie";
import { useNavigate } from "react-router";

const AddCategory = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formdata, setFormData] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const token = Cookie.get("token");
    const { name } = formdata;

    // Validate category name and image
    if (!name) {
      setLoading(false);
      return handleError("Name must be provided");
    }
    if (!image) {
      setLoading(false);
      return handleError("Image must be provided");
    }

    const data = new FormData();
    data.append("name", formdata.name);
    data.append("description", formdata.description);
    data.append("image", image);

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/category/createCategory",
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Cookie: `token=${token}`,
          },
          withCredentials: true,
        },
      );

      const { success, message } = response.data;
      if (success) {
        setFormData({
          name: "",
          description: "",
          image: "",
        }); // Reset form after success
        handleSuccess(message);
        setTimeout(() => {
          navigate("/all-cetagory");
          setLoading(false);
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      console.error("Error:", error.response || error.message || error);
      handleError(error.response ? error.response.data.message : error.message);
    }
  };

  return (
    <div className="mx-auto w-full rounded-xl bg-white p-8 shadow-2xl">
      <h2 className="mb-6 text-center text-3xl font-semibold text-gray-800">
        Add New Category
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Category Name */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Category Name
          </label>
          <input
            type="text"
            name="name"
            value={formdata.name} // Controlled input value
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg border border-gray-300 px-5 py-3 shadow-sm transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter category name"
          />
        </div>

        {/* Category Description */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Category Description
          </label>
          <textarea
            name="description"
            value={formdata.description} // Controlled input value
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg border border-gray-300 px-5 py-3 shadow-sm transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter category description"
          />
        </div>

        {/* Category Image */}
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Category Image
          </label>
          <input
            onChange={(e) => setImage(e.target.files[0])}
            type="file"
            name="image"
            className="mt-2 block w-full rounded-lg border border-gray-300 px-5 py-3 shadow-sm transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        {/* Submit Button */}
        <div className="mt-8 flex justify-center">
          {loading ? (
            <Spinner className="mx-auto h-8 w-8" color="indigo" />
          ) : (
            <button
              type="submit"
              className="rounded-lg bg-indigo-600 px-6 py-3 text-white shadow-md transition duration-300 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 focus:outline-none"
            >
              Add Category
            </button>
          )}
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddCategory;
