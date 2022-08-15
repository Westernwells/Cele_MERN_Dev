import React, { Component } from "react";
import Slider from "react-slick";
// import { baseUrl } from "./config";
import si0 from "../../Assets/RecImage.png";
import si1 from "../../Assets/RecImage.png";
import si2 from "../../Assets/RecImage.png";
import si3 from "../../Assets/RecImage.png";
const baseUrl = "si";
const imagesUrl = [si0, si1, si2];
type ProductImageCarouselProps = {
  productImages: Array<string>;
};
const ProductImageCarousel = ({
  productImages = [],
}: ProductImageCarouselProps) => {
  const settings = {
    customPaging: function (i: any) {
      return (
        <a className="h-[100px] w-[100px]">
          <img
            className="h-[100px] w-[100px]"
            alt="mini product"
            src={productImages[i]}
          />
        </a>
      );
    },
    dots: true,
    dotsClass: "slick-dotsx slick-thumb",
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    //   className:"redmond"
  };
  return (
    <div className="w-[80%] md:w-[400px] xl:w-full">
      {/* <h2>Custom Paging</h2> */}
      <Slider {...settings}>
        {productImages.map((product, index) => (
          <div key={index} className="grid grid-cols-3">
            <img
              src={product}
              alt="Product"
              className="h-[357px] w-[396px] xl:h-auto xl:w-full"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ProductImageCarousel;
