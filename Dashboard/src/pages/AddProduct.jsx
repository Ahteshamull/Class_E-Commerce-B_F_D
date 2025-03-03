import React, { useEffect, useState } from "react";
import axios from "axios";
import { handleError, handleSuccess } from "./../Util";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router";
import Cookie from "js-cookie";

const AddProduct = () => {
  const navigate = useNavigate();
  const [allCategories, setAllCategories] = useState([]);
  const [allStore, setAllStore] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: " ",
    sellingPrice: "",
    discountPrice: "",
    category: "",
    store: "",
    stock: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files); 

    setFormData((prevState) => ({
      ...prevState,
      image: files,
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const token = Cookie.get("token");

  const data = new FormData();



  data.append("name", formData.name);
  data.append("description", formData.description);
  data.append("sellingPrice", formData.sellingPrice);
  data.append("discountPrice", formData.discountPrice);
  data.append("category", formData.category);
  data.append("store", formData.store);
  data.append("stock", formData.stock);

 
  formData.image.forEach((file) => {
    data.append("image", file); 
  });



  try {
    const response = await axios.post(
      "http://localhost:3000/api/v1/product/createProduct",
      data, 
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Cookie: `token=${token}`,
        },
        withCredentials: true,
      },
    );

    console.log(response);
    const { success, message } = response.data;
    if (success) {
      handleSuccess(message);
      setTimeout(() => {
        navigate("/all-products");
      }, 1000);
    }
  } catch (error) {
    handleError(error.response.data.message);
  }
};



  useEffect(() => {
    async function getAllCetagory() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/category/allCetagory",
        );
        const data = await response.data;
        setAllCategories(data.allCetagory);
      } catch (error) {
        console.error("Error fetching cetagory:", error);
      }
    }
    getAllCetagory();
  }, []);

  useEffect(() => {
    async function getAllStore() {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/store/allStore",
        );
        const data = await response.data;
        setAllStore(data.allStore);
      
      } catch (error) {
        console.error("Error fetching cetagory:", error);
      }
    }
    getAllStore();
  }, []);


  console.log(formData)
  return (
    <div className="mx-auto w-full overflow-hidden rounded-xl bg-white p-8 shadow-2xl">
      <h2 className="mb-6 text-center text-3xl font-semibold text-gray-800">
        Add New Product
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg border border-gray-300 px-5 py-3 shadow-sm transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter product name"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg border border-gray-300 px-5 py-3 shadow-sm transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter product description"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-600">
            Product Image
          </label>
          <input
            type="file"
            name="image"
            multiple // Allow multiple image selection
            onChange={handleFileChange}
            className="mt-2 block w-full rounded-lg border border-gray-300 px-5 py-3 shadow-sm transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-600">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
            required
            className="mt-2 block w-full rounded-lg border border-gray-300 px-5 py-3 shadow-sm transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option value="">Select a category</option> {/* Default option */}
            {allCategories?.map((category,i) => (
              <option key={i} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-lg font-medium text-gray-700">
            Store
          </label>
          <select
            name="store"
            value={formData.store}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg border border-gray-300 px-5 py-3 shadow-sm transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          >
            <option>Select a Store</option>
            {allStore?.map((store) => (
              <option key={store._id} value={store._id}>
                {store.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-600">
            Stock
          </label>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg border border-gray-300 px-5 py-3 shadow-sm transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter stock quantity"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            Selling Price
          </label>
          <input
            type="number"
            name="sellingPrice"
            value={formData.sellingPrice}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg border border-gray-300 px-5 py-3 shadow-sm transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter selling price"
          />
        </div>

        <div>
          <label className="block text-lg font-medium text-gray-700">
            Discount Price
          </label>
          <input
            type="number"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleChange}
            className="mt-2 block w-full rounded-lg border border-gray-300 px-5 py-3 shadow-sm transition duration-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="Enter discount price"
          />
        </div>

        <div className="mt-8 flex justify-center">
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-6 py-3 text-white shadow-md transition duration-300 hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500 focus:outline-none"
          >
            Add Product
          </button>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
