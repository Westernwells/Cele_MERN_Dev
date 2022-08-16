import React from "react";
import RecImage from "../../Assets/RecImage.png";
import Heart from "../../Assets/Heart.png";
import { ProductType } from "../../Reducers/ProductReducer";
import { useNavigate } from "react-router-dom";

type ProductPropsType = {
  data: ProductType;
  toggle: (product: ProductType) => void;
  collected: boolean;
};
export default function ProductCard({
  data,
  toggle,
  collected,
}: ProductPropsType) {
  const navigate = useNavigate();
  return (
    <div
      className="w-[250px] xs:w-[212px] md:w-full lg:w-full xl:w-full shadow-md align-middle mx-auto lg:mx-0 hover:cursor-pointer my-2"
      onClick={() => navigate(`/product/${data.id}`, { replace: false })}
    >
      <div className="img-container relative w-[250px] xs:w-[212px] md:w-full lg:w-full xl:w-full">
        <img
          src={RecImage}
          alt=""
          className="w-[250px] xs:w-[212px] xs:h-[200px] md:w-full lg:w-full xl:w-full"
        />
        {collected ? (
          <div
            className="absolute  top-1 right-1 bg-primary h-[35px] w-[35px] flex justify-center items-center rounded-full fill-white hover:bg-white hover:fill-black"
            onClick={(e) => {
              toggle(data);
              e.stopPropagation();
            }}
          >
            <HeartFilledWhiteIcon />
          </div>
        ) : (
          <div
            className="absolute  top-1 right-1 bg-white h-[35px] w-[35px] flex justify-center items-center rounded-full fill-black hover:bg-primary hover:fill-white"
            onClick={(e) => {
              toggle(data);
              e.stopPropagation();
              // e.stopImmediatePropagation();
            }}
          >
            <HeartFilledIcon />
          </div>
        )}
      </div>
      <div className="product-details px-[18px] py-[17px] border-primary border-[1px]">
        <p className="leading-[18.78px] text-base font-semibold mb-2">
          {data.productName}
        </p>
        <p className="leading-[18.78px] text-base font-semibold">
          $ {data.price}
        </p>
      </div>
    </div>
  );
}

const HeartFilledIcon = () => {
  return (
    <svg
      width="25"
      height="23"
      viewBox="0 0 25 23"
      // fill="inherit"
      xmlns="http://www.w3.org/2000/svg"
      className=""
    >
      <path
        d="M18.0002 0.417114C16.8742 0.434629 15.7727 0.748968 14.807 1.32839C13.8413 1.9078 13.0456 2.73178 12.5002 3.71711C11.9548 2.73178 11.1591 1.9078 10.1934 1.32839C9.22774 0.748968 8.12625 0.434629 7.0002 0.417114C5.20514 0.495105 3.51391 1.28037 2.29599 2.60135C1.07806 3.92232 0.432452 5.67164 0.500202 7.46711C0.500202 14.2421 11.4562 22.0671 11.9222 22.3991L12.5002 22.8081L13.0782 22.3991C13.5442 22.0691 24.5002 14.2421 24.5002 7.46711C24.568 5.67164 23.9223 3.92232 22.7044 2.60135C21.4865 1.28037 19.7953 0.495105 18.0002 0.417114ZM12.5002 20.3461C9.2472 17.9161 2.5002 11.9461 2.5002 7.46711C2.43184 6.20183 2.86657 4.96084 3.70957 4.01481C4.55256 3.06878 5.73544 2.49446 7.0002 2.41711C8.26497 2.49446 9.44784 3.06878 10.2908 4.01481C11.1338 4.96084 11.5686 6.20183 11.5002 7.46711H13.5002C13.4318 6.20183 13.8666 4.96084 14.7096 4.01481C15.5526 3.06878 16.7354 2.49446 18.0002 2.41711C19.265 2.49446 20.4478 3.06878 21.2908 4.01481C22.1338 4.96084 22.5686 6.20183 22.5002 7.46711C22.5002 11.9481 15.7532 17.9161 12.5002 20.3461Z"
        fill="inherit"
        // className="bg-blue-red"
      />
    </svg>
  );
};
const HeartFilledWhiteIcon = () => {
  return (
    <svg
      width="25"
      height="23"
      viewBox="0 0 25 23"
      // fill="inherit"
      xmlns="http://www.w3.org/2000/svg"
      className=""
    >
      <path
        d="M18.0002 0.417114C16.8742 0.434629 15.7727 0.748968 14.807 1.32839C13.8413 1.9078 13.0456 2.73178 12.5002 3.71711C11.9548 2.73178 11.1591 1.9078 10.1934 1.32839C9.22774 0.748968 8.12625 0.434629 7.0002 0.417114C5.20514 0.495105 3.51391 1.28037 2.29599 2.60135C1.07806 3.92232 0.432452 5.67164 0.500202 7.46711C0.500202 14.2421 11.4562 22.0671 11.9222 22.3991L12.5002 22.8081L13.0782 22.3991C13.5442 22.0691 24.5002 14.2421 24.5002 7.46711C24.568 5.67164 23.9223 3.92232 22.7044 2.60135C21.4865 1.28037 19.7953 0.495105 18.0002 0.417114ZM12.5002 20.3461C9.2472 17.9161 2.5002 11.9461 2.5002 7.46711C2.43184 6.20183 2.86657 4.96084 3.70957 4.01481C4.55256 3.06878 5.73544 2.49446 7.0002 2.41711C8.26497 2.49446 9.44784 3.06878 10.2908 4.01481C11.1338 4.96084 11.5686 6.20183 11.5002 7.46711H13.5002C13.4318 6.20183 13.8666 4.96084 14.7096 4.01481C15.5526 3.06878 16.7354 2.49446 18.0002 2.41711C19.265 2.49446 20.4478 3.06878 21.2908 4.01481C22.1338 4.96084 22.5686 6.20183 22.5002 7.46711C22.5002 11.9481 15.7532 17.9161 12.5002 20.3461Z"
        fill="inherit"
        // className="bg-blue-red"
      />
    </svg>
  );
};
