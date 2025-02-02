import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const Category = ({ category }) => {
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
    </tr>
  );
};

const AllCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
                Category Name
              </th>
              <th className="px-6 py-4 text-left text-lg font-medium text-gray-700">
                Description
              </th>
              <th className="px-6 py-4 text-left text-lg font-medium text-gray-700">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {categories.length === 0 ? (
              <tr>
                <td colSpan="3" className="px-6 py-4 text-center text-gray-500">
                  No categories added yet.
                </td>
              </tr>
            ) : (
              categories.map((category, index) => (
                <Category key={index} category={category} />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllCategories;
