import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart, faStar } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import Container from "../../layout/Container";

const products = [
  {
    img: "https://cdn.easyfrontend.com/pictures/ecommerce/ep-grid2_1.jpg",
    title: "Autumn Cotton Linen Dress Women Loose Plus Size",
    price: "725.00",
    rating: "4.6",
  },
  {
    img: "https://cdn.easyfrontend.com/pictures/ecommerce/ep-grid2_2.jpg",
    title: "2022 Smart Watch Ultra Men Women Smartwatch",
    price: "172.00",
    rating: "4.9",
  },
  {
    img: "https://cdn.easyfrontend.com/pictures/ecommerce/ep-grid2_3.jpg",
    title: "ROSEGAL Gothic Dresses Black High Waist",
    price: "1199.00",
    rating: "4.2",
  },
  {
    img: "https://cdn.easyfrontend.com/pictures/ecommerce/ep-grid2_4.jpg",
    title: "Best YBT Women Belt Imitation Leather Pin Buckle Belt New",
    price: "89.00",
    rating: "4.6",
  },
];

const ProductItem = ({ product }) => {
  return (
   
    <div className="p-2">
      <div>
        <img src={product.img} alt="..." className="w-full" />
      </div>
      <div className="py-4 lg:py-6 text-start px-1">
        <h5 className="font-medium cursor-pointer">{product.title}</h5>
        <h5 className="font-medium text-blue-600 my-2">${product.price}</h5>
        <div className="flex justify-between items-center px-1">
          <h5 className="font-medium">
            <span className="text-yellow-500 mr-1">
              <FontAwesomeIcon icon={faStar} />
            </span>
            {product.rating}
          </h5>
          <a href="#!">
            <h5 className="font-medium hover:text-blue-600">
              <FontAwesomeIcon icon={faShoppingCart} />
            </h5>
          </a>
        </div>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.object.isRequired,
};

const CetagoryProduct = () => {
  return (
    <Container>

    <section className="ezy__epgrid2 light mt-5  text-zinc-900 dark:text-white relative overflow-hidden z-10">
    
      

        <div className="grid grid-cols-12 text-center ">
          {products.map((product, i) => (
            <div
              className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-3"
              key={i}
            >
              <ProductItem product={product} />
            </div>
          ))}
        </div>

    
    </section>
    </Container>
  );
};
export default CetagoryProduct;