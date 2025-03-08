import { useState, useEffect } from "react";
import { PencilIcon, TrashIcon, StarIcon } from "@heroicons/react/24/solid";
import {
  ArrowDownTrayIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
  Card,
  CardHeader,
  Typography,
  Button,
  CardBody,
  CardFooter,
  IconButton,
  Tooltip,
  Input,
} from "@material-tailwind/react";
import axios from "axios";
import Cookie from "js-cookie";
import { handleError, handleSuccess } from "../Util";
import { ToastContainer } from 'react-toastify';


const TABLE_HEAD = [
  "Image",
  "Product-Name",
  "Description",
  "Price",
  "Discount Price",
  "Category",
  "Edit",
  "Delete",
  "Feature", // Add Feature column
];

export function AllProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false); // For controlling modal visibility
  const [productToEdit, setProductToEdit] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    description: "",
    sellingPrice: "",
    discountPrice: "",
    category: "",
    image: [], // Store multiple images in an array
  });

  // Fetch product data on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://localhost:3000/api/v1/product/allProduct",
        );
        const data = await response.json();
        setProducts(data.allProduct); // Assuming the data is in the "allProduct" field
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleEdit = (id) => {
    // Find the product to edit
    const product = products.find((product) => product._id === id);
    setProductToEdit(product);
    setUpdatedProduct({
      name: product.name,
      description: product.description,
      sellingPrice: product.sellingPrice,
      discountPrice: product.discountPrice,
      category: product.category,
      image: product.image, // Preload existing images
    });
    setIsModalOpen(true); // Open the modal to edit
  };

  const handleUpdate = async () => {
    const token = Cookie.get("token");
    try {
      const formData = new FormData();
      formData.append("name", updatedProduct.name);
      formData.append("description", updatedProduct.description);
      formData.append("sellingPrice", updatedProduct.sellingPrice);
      formData.append("discountPrice", updatedProduct.discountPrice);
      formData.append("category", updatedProduct.category);

      // Append images to formData
      updatedProduct.image.forEach((imageFile) => {
        formData.append("images", imageFile); // Assuming 'images' as the field name
      });
      const response = await axios.patch(
        `http://localhost:3000/api/v1/product/updateProduct/${productToEdit._id}`,
        formData,
        {
          headers: {
            Cookie: `token=${token}`,
            "Content-Type": "multipart/form-data",
          },
        },
      );
      handleSuccess(response.data.message);
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productToEdit._id
            ? { ...product, ...updatedProduct }
            : product,
        ),
      );
      setIsModalOpen(false); // Close the modal after update
    } catch (error) {
      console.log(error.response);
      // handleError(error.response?.data.message || "Error updating product");
    }
  };

  const handleDelete = async (id) => {
    const token = Cookie.get("token");
    // Confirm the delete action
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );
    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `http://localhost:3000/api/v1/product/deleteProduct/${id}`,
        {
          headers: {
            Cookie: `token=${token}`,
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      handleSuccess(response.data.message);
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      handleError(error.response?.data.message || "Error deleting product");
    }
  };

  const handleFeatureProduct = async (id) => {
    const token = Cookie.get("token");
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/product/featureProduct/${id}`,
        {},
        {
          headers: {
            Cookie: `token=${token}`,
            "Content-Type": "application/json",
          },
        },
      );
      handleSuccess(response.data.message);
      console.log(response.data)
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === id
            ? { ...product, isFeature: !product.isFeature }
            : product,
        ),
      );
    } catch (error) {
      handleError(
        error.response?.data.message || "Error updating feature status",
      );
    }
  };

  // Render product rows dynamically
  const renderProductRows = () => {
    return products.map((product, index) => {
      const isLast = index === products.length - 1;
      const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

      return (
        <tr key={product._id}>
          <td className={classes}>
            <div className="flex items-center gap-3">
              <img
                src={product.image[0]} // Assuming the first image is displayed
                alt={product.name}
                className="h-12 w-12 rounded border bg-gray-200 object-contain p-1"
              />
            </div>
          </td>
          <td className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {product.name}
            </Typography>
          </td>
          <td className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {product.description}
            </Typography>
          </td>
          <td className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              ${product.sellingPrice}
            </Typography>
          </td>
          <td className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {product.discountPrice ? `$${product.discountPrice}` : "N/A"}
            </Typography>
          </td>
          <td className={classes}>
            <Typography
              variant="small"
              color="blue-gray"
              className="font-normal"
            >
              {product.category}
            </Typography>
          </td>
          <td className={classes}>
            <Tooltip content="Edit Product">
              <IconButton
                variant="text"
                onClick={() => handleEdit(product._id)}
              >
                <PencilIcon className="h-4 w-4" />
              </IconButton>
            </Tooltip>
          </td>
          <td className={classes}>
            <Tooltip content="Delete Product">
              <IconButton
                variant="text"
                onClick={() => handleDelete(product._id)}
              >
                <TrashIcon className="h-4 w-4" />
              </IconButton>
            </Tooltip>
          </td>
          {/* Feature Button */}
          <td className={classes}>
            <Tooltip
              content={
                product.isFeature ? "Unfeature Product" : "Feature Product"
              }
            >
              <IconButton
                variant="text"
                onClick={() => handleFeatureProduct(product._id)}
              >
                <StarIcon
                  className={`h-4 w-4 ${product.isFeature ? "text-yellow-500" : "text-gray-500"}`}
                />
              </IconButton>
            </Tooltip>
          </td>
        </tr>
      );
    });
  };

  return (
    <Card className="mt-4 h-full w-full">
      <CardHeader floated={false} shadow={false} className="mt-1 rounded-none">
        <div className="mb-4 flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Typography variant="h5" color="blue-gray">
              All Products
            </Typography>
          </div>
          <div className="flex w-full shrink-0 gap-2 md:w-max">
            <div className="w-full md:w-72">
              <Input
                label="Search"
                icon={<MagnifyingGlassIcon className="h-5 w-5" />}
              />
            </div>
            <Button className="flex items-center gap-3" size="sm">
              <ArrowDownTrayIcon strokeWidth={2} className="h-4 w-4" /> Search
            </Button>
          </div>
        </div>
      </CardHeader>

      <CardBody className="overflow-scroll px-0">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="border-blue-gray-100 bg-blue-gray-50/50 border-y p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="leading-none font-normal opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="p-4 text-center">
                  <Typography variant="small" color="blue-gray">
                    Loading products...
                  </Typography>
                </td>
              </tr>
            ) : (
              renderProductRows()
            )}
          </tbody>
        </table>
      </CardBody>

      <CardFooter className="border-blue-gray-50 flex items-center justify-between border-t p-4">
        <Button variant="outlined" size="sm">
          Previous
        </Button>
        <div className="flex items-center gap-2">
          {[1, 2, 3, 8, 9, 10].map((pageNum) => (
            <IconButton
              key={pageNum}
              variant={pageNum === 2 ? "text" : "outlined"}
              size="sm"
            >
              {pageNum}
            </IconButton>
          ))}
          <IconButton variant="text" size="sm">
            ...
          </IconButton>
        </div>
        <Button variant="outlined" size="sm">
          Next
        </Button>
      </CardFooter>

      {/* Modal for Editing Product */}
      {isModalOpen && (
        <div className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="w-1/3 space-y-4 rounded-xl bg-white p-8 shadow-lg">
            <Typography
              variant="h6"
              color="blue-gray"
              className="text-center font-semibold"
            >
              Edit Product
            </Typography>
            <div className="space-y-4">
              <Input
                label="Product Name"
                value={updatedProduct.name}
                onChange={(e) =>
                  setUpdatedProduct({ ...updatedProduct, name: e.target.value })
                }
                className="rounded-md"
              />
              <Input
                label="Description"
                value={updatedProduct.description}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    description: e.target.value,
                  })
                }
                className="rounded-md"
              />
              <Input
                label="Selling Price"
                type="number"
                value={updatedProduct.sellingPrice}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    sellingPrice: e.target.value,
                  })
                }
                className="rounded-md"
              />
              <Input
                label="Discount Price"
                type="number"
                value={updatedProduct.discountPrice}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    discountPrice: e.target.value,
                  })
                }
                className="rounded-md"
              />
              <Input
                label="Category"
                value={updatedProduct.category}
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    category: e.target.value,
                  })
                }
                className="rounded-md"
              />
              <Input
                label="Upload Images"
                type="file"
                multiple
                onChange={handleImageChange}
                className="rounded-md"
              />
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <Button color="green" onClick={handleUpdate}>
                Update
              </Button>
              <Button color="red" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
            </div>
            <ToastContainer/>
          </div>
        </div>
      )}
    </Card>
  );
}
