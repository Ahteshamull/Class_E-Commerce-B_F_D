import React, { useEffect, useState } from "react";
import axios from "axios";
import Container from "../layout/Container";
import Products from "../Component/Products";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const FeatureProducts = () => {
  const [featureProducts, setFeatureProducts] = useState([]);
  
  const [error, setError] = useState(null);

  // Responsive settings for Carousel
  const responsive = {
    superLargeDesktop: { breakpoint: { max: 4000, min: 3000 }, items: 5 },
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 4 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1 },
  };

  useEffect(() => {
    const fetchFeatureProducts = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/product/allFeatureProduct"
        );
        setFeatureProducts(response.data.allFeatureProduct);
    
      } catch (err) {
        console.log(err)
        setError("Failed to load featured products");
     
      }
    };

    fetchFeatureProducts();
  }, []);

  return (
    <section className="mt-[50px]">
      <Container>
        <div className="mb-5">
          <h2 className="lg:text-2xl text-xl font-bold font-roboto text-primary">
            Featured Products
            <span className="text-gray-400">
              {" "}
              - Discover our best-selling items
            </span>
            <br />
            <span className="text-gray-600">
              View all products &amp; apply filters
            </span>
          </h2>

       
            <Carousel responsive={responsive}>
              {featureProducts.map((product) => (
                <div key={product._id}>
                  <Products product={product} />
                </div>
              ))}
            </Carousel>
        
        </div>
      </Container>
    </section>
  );
};

export default FeatureProducts;
