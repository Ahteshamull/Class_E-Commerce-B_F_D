import React, { useEffect, useState } from "react";
import Container from "../layout/Container";
import { useParams } from "react-router";
import CategoryPageNation from "../Component/ProductCetagory/CetagoryPageNation";
import axios from "axios";

export default function CategoryProduct() {
  const [category, setCategory] = useState(null); // Initialize state as null
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To store error messages
  const { id } = useParams();

  const fetchCategory = async () => {
    try {
      setLoading(true); // Start loading
      const response = await axios.get(
        `http://localhost:3000/api/v1/category/singleCetagory/${id}`
      );
      setCategory(response.data.singleCetagory); // Assuming your API returns this object
    } catch (error) {
      setError("Failed to load category data"); // Handle error
      console.error(error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  useEffect(() => {
    fetchCategory();
  }, [id]); // Re-fetch data when id changes

  if (loading) {
    return <div>Loading...</div>; // Show loading message while fetching data
  }

  if (error) {
    return <div>{error}</div>; // Show error message if there's an issue with the fetch
  }

  if (!category) {
    return <div>No category found</div>; // Handle case where no category is found
  }

  return (
    <div>
      <Container>
        <section className="ezy__epgrid2 light py-5 text-zinc-900 dark:text-white relative overflow-hidden z-10">
          <h2 className="text-2xl font-bold leading-none md:text-[40px] text-center">
            {category.name} 
          </h2>

          <div className="text-center">
            <div className="ezy__epgrid2-button">
              <CategoryPageNation
                itemsPerPage={1}
                Cetagory={category.products}
              />
            
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
}
