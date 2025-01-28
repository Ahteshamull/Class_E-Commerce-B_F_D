import React from "react";
import Container from "../layout/Container";
import Products from "../Component/Products";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const FeatureProducts = () => {
const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  }
 
};
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
            <div><Products/></div>
            <div><Products/></div>
            <div><Products/></div>
            <div><Products/></div>
            <div><Products/></div>
            <div><Products/></div>
            <div><Products/></div>
            <div><Products/></div>
            <div><Products/></div>
            <div><Products/></div>
            <div><Products/></div>
            <div><Products/></div>
            <div><Products/></div>
            <div><Products/></div>
            <div><Products/></div>
            <div><Products/></div>
            
          </Carousel>
          
        </div>
      </Container>
    </section>
  );
};

export default FeatureProducts;
