import React from "react";
import Images from "../layout/Images";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";

const Banner = () => {
  var settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    appendDots: (dots) => (
      <div
        style={{
          padding: "10px",
        }}
      >
        <ul
          style={{
            margin: "0px",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: "10px",
            bottom: "40px",
            cursor: "pointer",
          }}
        >
          {" "}
          {dots}{" "}
        </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={{
          width: "30px",
          height: "30px",
          color: "white",
          border: "1px teal solid",
          borderRadius: "50%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {i + 1}
      </div>
    ),
  };
  const images = [
    {
      image:
        "https://img.lazcdn.com/us/domino/8a31c3fe-d493-4074-b0a9-88a014b1f32a_BD-1976-688.jpg_2200x2200q80.jpg",
    },
    {
      image:
        "https://img.lazcdn.com/us/domino/9e83f1b3-36e0-4b25-b358-40aad3ebe90e_BD-1976-688.jpg_2200x2200q80.jpg",
    },
    {
      image:
        "https://img.lazcdn.com/us/domino/3cdec980-a668-4f93-a85a-99982b39a6a3_BD-1976-688.jpg_2200x2200q80.jpg",
    },

    {
      image:
        "https://img.lazcdn.com/us/domino/70745ee8-bb44-48d9-8a31-8cfb00d8820a_BD-1976-688.jpg_2200x2200q80.jpg",
    },
    {
      image:
        "https://img.lazcdn.com/us/domino/45839ec3-ecf0-4c0b-9de3-26315713df1e_BD-1976-688.jpg_2200x2200q80.jpg",
    },
  ];
  return (
    <div className="mt-2">
      {images.length > 1 ? (
        <Slider {...settings}>
          {images.map((item, index) => (
            <Images src={item.image} alt={"Banner Image"} />
          ))}
        </Slider>
      ) : (
        <Images src={images[0].image} alt={"Banner Image"} />
      )}
    </div>
  );
};

export default Banner;
