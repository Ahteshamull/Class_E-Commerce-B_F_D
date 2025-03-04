// import React, { useEffect, useState } from "react";
// import Container from "../layout/Container";
// import { useParams } from "react-router";

// import axios from "axios";

// export default function CategoryProduct() {
//   const [category, setCategory] = useState([]); // Initialize state as null
//   const [loading, setLoading] = useState(true); // To track loading state
//   const [error, setError] = useState(null); // To store error messages
//   const { id } = useParams();

//   const fetchCategory = async () => {
//     try {
//       setLoading(true); // Start loading
//       const response = await axios.get(
//         `http://localhost:3000/api/v1/category/singleCetagory/${id}`
//       );
//       setCategory(response.data.singleCetagory); // Assuming your API returns this object
//     } catch (error) {
//       setError("Failed to load category data"); // Handle error
//       console.error(error);
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   useEffect(() => {
//     fetchCategory();
//   }, [id]); // Re-fetch data when id changes

//   if (loading) {
//     return <div>Loading...</div>; // Show loading message while fetching data
//   }

//   if (error) {
//     return <div>{error}</div>; // Show error message if there's an issue with the fetch
//   }

//   if (!category) {
//     return <div>No category found</div>; // Handle case where no category is found
//   }

//   return (
//     <div>
//       <section>
//         {category.map((category) => (
//           <Container>
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               <div
//                 key={category.products._id}
//                 onClick={() => handleProductId(category.products._id)}
//                 className="bg-white rounded-lg p-4 cursor-pointer hover:-translate-y-1 transition-all relative"
//               >
//                 <div className="mb-4 bg-gray-100 rounded-xl p-2">
//                   <img
//                     src={category.products.image}
//                     className="w-full h-48 sm:h-56 md:h-64 lg:h-72 rounded-xl object-contain"
//                   />
//                 </div>
//               </div>
//             </div>
//           </Container>
//         ))}
//         <h2 className="text-2xl font-bold leading-none md:text-[40px] text-center">
//           {category.name}
//         </h2>
//       </section>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import Container from "../layout/Container";
import { useParams, useNavigate } from "react-router";
import axios from "axios";

export default function CategoryProduct() {
  const navigate = useNavigate(); // useNavigate hook for route navigation
  const [category, setCategory] = useState(null); // State to store category data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const { id } = useParams(); // Extract category ID from URL params

  const fetchCategory = async () => {
    try {
      setLoading(true); // Set loading state to true before fetching
      const response = await axios.get(
        `http://localhost:3000/api/v1/category/singleCetagory/${id}`
      );
      setCategory(response.data.singleCetagory); // Store fetched category data
    } catch (error) {
      setError("Failed to load category data"); // Handle fetch error
      console.error(error);
    } finally {
      setLoading(false); // Set loading state to false after fetch completion
    }
  };

  const handleProductClick = (productId) => {
    navigate(`/shop/view/${productId}`); // Navigate to product details page
  };

  useEffect(() => {
    fetchCategory(); // Fetch category data when component mounts or when id changes
  }, [id]);

  // Loading state display
  if (loading) {
    return <div>Loading...</div>;
  }

  // Error state display
  if (error) {
    return <div>{error}</div>;
  }

  // If no category is found
  if (!category) {
    return <div>No category found</div>;
  }

  return (
    <div>
      <section>
        <Container>
          <h2 className="text-2xl font-bold leading-none md:text-[40px] text-center mb-8">
            {category.name}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {category.products.map((product) => (
              <div
                key={product._id}
                onClick={() => handleProductClick(product._id)} // Handle product click
                className="bg-white rounded-lg p-4 cursor-pointer hover:-translate-y-1 transition-all relative"
              >
                <div className="mb-4 bg-gray-100 rounded-xl p-2">
                  {/* Conditional rendering for product image */}
                  {product.image && product.image[0] ? (
                    <img
                      src={product.image[0]}
                      alt={product.name}
                      className="w-full h-48 sm:h-56 md:h-64 lg:h-72 rounded-xl object-contain"
                    />
                  ) : (
                    <div className="w-full h-48 bg-gray-300 rounded-xl flex items-center justify-center text-white text-xl">
                      No Image Available
                    </div>
                  )}
                </div>
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{product.name}</h3>
                  <h3 className="text-lg font-semibold">Tk {product?.discountPrice}</h3>
                </div>
                <p className="text-gray-600">{product.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </div>
  );
}
