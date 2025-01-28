import React, { useState } from "react";

const Store = () => {
  // State to store products
  const [products, setProducts] = useState([
    {
      name: "Product 1",
      description: "Description of product 1",
      price: 50.0,
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Product 2",
      description: "Description of product 2",
      price: 100.0,
      image: "https://via.placeholder.com/150",
    },
  ]);

  // State to manage new product form
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({
      ...newProduct,
      [name]: value,
    });
  };

  // Handle image change
  const handleImageChange = (e) => {
    const { files } = e.target;
    if (files && files[0]) {
      setNewProduct({
        ...newProduct,
        image: URL.createObjectURL(files[0]),
      });
    }
  };

  // Handle adding new product
  const handleAddProduct = (e) => {
    e.preventDefault();
    setProducts([...products, newProduct]);
    setNewProduct({ name: "", description: "", price: "", image: "" }); // Reset form
  };

  return (
    <div className="mx-auto max-w-4xl py-8">
      <h2 className="mb-8 text-center text-3xl font-semibold text-gray-800">
        Store
      </h2>

      {/* Add Product Form */}
      <form onSubmit={handleAddProduct} className="mb-10">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label className="block text-lg font-medium text-gray-700">
              Product Name
            </label>
            <input
              type="text"
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-5 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter product name"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={newProduct.description}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-5 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter product description"
              required
            />
          </div>

          <div>
            <label className="block text-lg font-medium text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={newProduct.price}
              onChange={handleChange}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-5 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter product price"
              required
            />
          </div>

          <div className="col-span-2">
            <label className="block text-lg font-medium text-gray-700">
              Product Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="mt-2 block w-full rounded-lg border border-gray-300 px-5 py-3 shadow-sm focus:ring-2 focus:ring-indigo-500"
            />
            {newProduct.image && (
              <div className="mt-2">
                <img
                  src={newProduct.image}
                  alt="Product Preview"
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
          Add Product
        </button>
      </form>

      {/* Products Grid */}
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No products available
          </p>
        ) : (
          products.map((product, index) => (
            <div
              key={index}
              className="rounded-md border p-4 shadow-md transition duration-300 hover:shadow-lg"
            >
              {product.image && (
                <img
                  src={product.image}
                  alt={product.name}
                  className="mb-4 h-48 w-48 rounded-md object-cover"
                />
              )}
              <h3 className="text-xl font-semibold text-gray-800">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600">{product.description}</p>
              <div className="mt-2">
                <span className="font-semibold text-gray-700">Price: </span>
                <span className="text-gray-900">${product.price}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Store;
