import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";
import { handleError, handleSuccess } from "../Util";
import { ToastContainer } from "react-toastify";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

const Category = ({ category, onDelete, onEdit }) => {
  const handleDelete = async () => {
    if (!Cookies.get("token")) {
      handleError("Unauthorized Access");
      return;
    }
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );
    if (confirmDelete) {
      await onDelete(category._id); // Call onDelete function from parent component
    }
  };

  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="px-6 py-4">
        {category.image ? (
          <img
            src={category.image}
            alt="Category"
            className="h-24 w-24 rounded-md object-cover"
          />
        ) : (
          <div className="flex h-24 w-24 items-center justify-center rounded-md bg-gray-200">
            <span className="text-gray-500">No Image</span>
          </div>
        )}
      </td>
      <td className="px-6 py-4 text-sm font-medium text-gray-800">
        {category.name}
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">
        {category.description}
      </td>
      <td className="px-6 py-4 text-sm text-gray-600">
        {moment(category.createdAt).format("Do MMMM YYYY, h:mm A")}
      </td>
      <td className="px-6 py-4">
        <button
          onClick={() => onEdit(category)} // Pass category to the parent component for editing
          className="rounded-lg border border-blue-700 bg-transparent px-5 py-2.5 text-sm font-medium tracking-wider text-blue-700 transition-all duration-300 outline-none hover:bg-blue-700 hover:text-white"
        >
          Edit
        </button>
        <button
          onClick={handleDelete}
          className="ml-2 rounded-lg border border-red-700 bg-transparent px-5 py-2.5 text-sm font-medium tracking-wider text-red-700 transition-all duration-300 outline-none hover:bg-red-700 hover:text-white"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editCategory, setEditCategory] = useState(null); // For holding the category to edit
  const [updatedName, setUpdatedName] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [updatedImage, setUpdatedImage] = useState(null);
  const [updating, setUpdating] = useState(false); // Track updating state to show loading
  const navigate = useNavigate();

  // Fetch categories on component mount
  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/category/allCetagory",
        );
        setCategories(response.data.allCetagory);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to fetch categories. Please try again later.");
        setLoading(false);
      }
    };

    fetchAllCategories();
  }, []);

  // Handle category deletion
  const deleteCategory = async (id) => {
    const token = Cookies.get("token");
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/category/deleteCetagory/${id}`,
        {
          headers: {
            Cookie: `token=${token}`,
          },
          withCredentials: true,
        },
      );
      setCategories(categories.filter((category) => category._id !== id));
      handleSuccess(response.data.data.message); // Handle success (using success message from response)
    } catch (error) {
      const { response } = error;
      handleError(response.data.message); // Handle error (using error message from response)
    }
  };

  const handleEditCategory = (category) => {
    setEditCategory(category);
    setUpdatedName(category.name);
    setUpdatedDescription(category.description);
  };

  // Handle form submit for updating category
  const handleUpdateCategory = async (e) => {
    e.preventDefault();
    if (!updatedName || !updatedDescription) {
      handleError("Name and Description are required.");
      return;
    }

    // Prepare the form data to be sent in the request
    const formData = new FormData();
    formData.append("name", updatedName);
    formData.append("description", updatedDescription);
    if (updatedImage) {
      formData.append("image", updatedImage);
    }

    const token = Cookies.get("token");
    setUpdating(true); // Set updating state to true

    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/category/updateCetagory/${editCategory._id}`,
        formData,
        {
          headers: {
            Cookie: `token=${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );

      const updatedCategory = response.data.category;
      const { success, message } = updatedCategory;

      if (success) {
        handleSuccess(message);

        setCategories((prevCategories) =>
          prevCategories.map((category) =>
            category._id === updatedCategory._id ? updatedCategory : category,
          ),
        );

        setEditCategory(null);
        setUpdatedName("");
        setUpdatedDescription("");
        setUpdatedImage(null);
        setUpdating(false); // Set updating state to false
        // Redirect or perform additional actions
      } else {
        handleError(message || "Failed to update category.");
        setUpdating(false); // Set updating state to false
      }
    } catch (error) {
      handleSuccess(error);
      setUpdating(false);
      
        setEditCategory(null);// Set updating state to false
    }
  };

  if (loading) {
    return <div className="py-8 text-center">Loading categories...</div>;
  }

  if (error) {
    return <div className="py-8 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mx-auto w-full py-8">
      <h2 className="mb-8 text-center text-3xl font-semibold text-gray-800">
        All Categories
      </h2>

      {/* Categories Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="px-6 py-4 text-left text-lg font-medium text-gray-700">
                Image
              </th>
              <th className="px-6 py-4 text-left text-lg font-medium text-gray-700">
                Name
              </th>
              <th className="w-[500px] px-6 py-4 text-left text-lg font-medium text-gray-700">
                Description
              </th>
              <th className="px-6 py-4 text-left text-lg font-medium text-gray-700">
                Created
              </th>
              <th className="px-6 py-4 text-left text-lg font-medium text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No categories added yet.
                </td>
              </tr>
            ) : (
              categories.map((category) => (
                <Category
                  key={category._id}
                  category={category}
                  onDelete={deleteCategory}
                  onEdit={handleEditCategory}
                />
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit Category Modal */}
      {editCategory && (
        <div className="bg-opacity-50 fixed inset-0 flex items-center justify-center bg-gray-800">
          <div className="rounded-lg bg-white p-8">
            <h3 className="mb-4 text-2xl">Edit Category</h3>
            <form onSubmit={handleUpdateCategory}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className="w-full rounded border px-4 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  value={updatedDescription}
                  onChange={(e) => setUpdatedDescription(e.target.value)}
                  className="w-full rounded border px-4 py-2"
                  required
                />
              </div>
              <div className="mb-4">
                <label htmlFor="image" className="block text-gray-700">
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  onChange={(e) => setUpdatedImage(e.target.files[0])}
                  className="w-full rounded border px-4 py-2"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => setEditCategory(null)} // Close modal
                  className="mr-2 rounded-lg bg-gray-400 px-4 py-2 text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={updating} // Disable button while updating
                  className={`rounded-lg px-4 py-2 text-white ${
                    updating ? "bg-gray-500" : "bg-blue-600"
                  }`}
                >
                  {updating ? "Updating..." : "Update"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default AllCategories;
