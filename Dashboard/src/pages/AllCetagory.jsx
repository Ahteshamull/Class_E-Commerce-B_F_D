import React, { useState } from "react";

// Category Component to display individual category information in a table row
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
    </tr>
  );
};

// AllCategories Component to manage and display all categories in a table
const AllCategories = () => {
  const [categories, setCategories] = useState([
    {
      name: "Electronics",
      description: "Latest electronic gadgets and devices.",
      image: "https://picsum.photos/536/354",
    },
    {
      name: "Fashion",
      description: "Trendy clothing and accessories.",
      image: "https://picsum.photos/536/354",
    },
    {
      name: "Books",
      description: "A wide variety of books for all ages.",
      image: "https://picsum.photos/536/354",
    },
  ]);

  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCategory({
      ...newCategory,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      setNewCategory({
        ...newCategory,
        image: URL.createObjectURL(files[0]), // Set image preview URL
      });
    }
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    setCategories([...categories, newCategory]);
    setNewCategory({ name: "", description: "", image: "" }); // Reset form
  };

  return (
    <div className="mx-auto w-full py-8">
      <h2 className="mb-8 text-center text-3xl font-semibold text-gray-800">
        All Categories
      </h2>

      {/* Add Category Form */}
      <form onSubmit={handleAddCategory} className="mb-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              name="name"
              value={newCategory.name}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-5 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter category name"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={newCategory.description}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-5 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter category description"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-lg font-medium text-gray-700">
              Category Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-5 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
            {newCategory.image && (
              <div className="mt-2">
                <img
                  src={newCategory.image}
                  alt="Category Preview"
                  className="h-24 w-24 rounded-md object-cover"
                />
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 rounded-lg bg-indigo-600 px-6 py-3 text-white shadow-md hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500"
        >
          Add Category
        </button>
      </form>

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
