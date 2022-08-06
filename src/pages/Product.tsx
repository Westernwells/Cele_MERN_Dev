import React, { useState, useEffect, useReducer } from "react";
import LayoutForm from "../components/layout/LayoutForm";
import RecImage from "../Assets/RecImage.png";
import AddUserIcon from "../Assets/fi-rr-user-add.png";
import ReactStars from "react-rating-stars-component";
import StarRatingComponent from "react-star-rating-component";
import { StarIcon as StarIconSolid } from "@heroicons/react/solid";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/MarketPlace/ProductCard";
import Heart from "../Assets/Heart.png";
import Funnel from "../Assets/Funnel.png";
import ProductImageCarousel from "../components/Product/ProductImageCarousel";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductById } from "../Api/index";
import { ProductType } from "../Reducers/ProductReducer";
import {
  UserReducer,
  addCollection,
  removeCollection,
} from "../Reducers/UserReducer";
import { useAppState } from "../context/AppStateContext";
export default function Product() {
  const { state: appState, setState: setAppState } = useAppState();

  const [{ collections }, dispatch] = useReducer(UserReducer, {
    collections: [],
    loading: false,
  });
  const [product, setProduct] = useState<ProductType>();
  let { id } = useParams();
  useEffect(() => {
    const fetchProduct = async (id: string) => {
      try {
        let res = await fetchProductById(id);
        setProduct(res as ProductType);
        console.log("Res from the api call", res);
      } catch (error) {}
    };
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const [state, setState] = useState({ rating: 8 });
  const ratingChanged = (newRating: any) => {
    console.log(newRating);
  };
  const onStarClick = (nextValue: any, prevValue: any, name: any) => {
    console.log(nextValue, prevValue, name);
    setState({ rating: nextValue });
  };
  let navigate = useNavigate();
  console.log("user collections", collections);
  const toggleCollection = () => {
    if (appState.collections.find((item) => item.id === id)) {
      if (product) {
        // remove from collection
        let filtered = appState.collections.filter(
          (item) => item.id !== product.id
        );
        setAppState({ ...appState, collections: [...filtered] });
        removeCollection(dispatch, product);
      }
    } else {
      if (product) {
        setAppState({
          ...appState,
          collections: [...appState.collections, product],
        });

        addCollection(dispatch, product);
      }
      // add to collection
    }
  };
  return (
    <div className="overflow-x-hidden">
      <LayoutForm>
        <div className="md:grid grid-cols-2 mt-16 ml-0 px-8 md:px-0 md:ml-[122px] gap-[68px]">
          <div className=" flex flex-col justify-end">
            {product?.images && product?.images.length > 1 && (
              <ProductImageCarousel productImages={product?.images} />
            )}
            {product?.images && product?.images.length === 1 && (
              <img
                src={RecImage}
                alt={product.productName + "image"}
                className="h-[357px] w-[396px]"
              />
            )}
            {product?.images && product?.images.length === 0 && (
              <img
                src={RecImage}
                alt={product.productName + "image"}
                className="h-[357px] w-[396px]"
              />
            )}
          </div>
          <div className="min-h-[357px] flex flex-col justify-between md:w-[328px] mt-12 md:mt-0 ">
            <div className="">
              <div className="bg-primary">
                <p className="text-[20px] font-semibold leading-[27px] px-4 py-2 text-white">
                  {product ? product.productName : "Product Name"}
                </p>
              </div>
              <div className="px-4 mt-2 py-2">
                <p className="text-[20px] font-semibold leading-[27px] mb-4">
                  $ {product ? product.price : "Product Price"}
                </p>
                <p className="font-normal text-[14px] leading-[23px]">
                  {product
                    ? product.description
                    : " **Description: e.g. Just one flame turns these hand-poured wax entities into slowly shifting performance-art exhibits.**"}
                </p>
              </div>
            </div>
            <div className="flex w-full justify-center md:justify-start">
              <div className="flex gap-6 items-center ">
                {appState.collections &&
                appState.collections.find((item) => item?.id == id) ? (
                  <div
                    className="rounded-full h-12 w-12 border-2 border-primary flex items-center justify-center bg-primary fill-white hover:bg-white  hover:fill-black "
                    onClick={toggleCollection}
                  >
                    <HeartFilledIcon />
                  </div>
                ) : (
                  <div
                    className="rounded-full h-12 w-12 border-2 border-primary flex items-center justify-center bg-white hover:bg-primary fill-black hover:fill-white"
                    onClick={toggleCollection}
                  >
                    <HeartFilledWhiteIcon />
                  </div>
                )}
                <a
                  className="bg-primary leading-[16.44px] text-[14px] text-white font-medium px-[14.5px] py-[13px]"
                  href={product?.vendorUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  purchase on {product ? product.vendor : "**Retailer name**"}
                </a>
              </div>
            </div>
          </div>
          <div className="mt-[60px] md:mt-[120px] flex-1">
            <button
              className="text-base leading-[27px] font-medium w-[328px] text-center bg-primary text-white h-[44px] flex items-center justify-center "
              onClick={(e: any) => {
                navigate("/market", { replace: false });
              }}
            >
              Return to Marketplace
            </button>
          </div>
        </div>
        <div className="mt-[120px]">
          <Footer />
        </div>
      </LayoutForm>
    </div>
  );
}

const StarIcon = () => {
  return (
    <div className="">
      <svg
        className="text-primary hover:fill-current hover:text-primary"
        width="65"
        height="65"
        viewBox="0 0 65 65"
        fill="#52AA5E"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M63 24.875H50.9092L59.4567 16.3237L48.6763 5.53951L40.125 14.0908V2H24.875V14.0908L16.3237 5.53951L5.53951 16.3237L14.0908 24.875H2V40.125H14.0908L5.53951 48.6763L16.3237 59.4567L24.875 50.9092V63H40.125V50.9092L48.6763 59.4567L59.4567 48.6763L50.9092 40.125H63V24.875Z"
          stroke="#52AA5E"
          stroke-width="3"
          stroke-miterlimit="10"
        />
      </svg>
    </div>
  );
};

const StarFilledIcon = () => {
  return (
    <svg
      width="65"
      height="65"
      viewBox="0 0 65 65"
      fill="#52AA5E"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M63 24.875H50.9092L59.4567 16.3237L48.6763 5.53951L40.125 14.0908V2H24.875V14.0908L16.3237 5.53951L5.53951 16.3237L14.0908 24.875H2V40.125H14.0908L5.53951 48.6763L16.3237 59.4567L24.875 50.9092V63H40.125V50.9092L48.6763 59.4567L59.4567 48.6763L50.9092 40.125H63V24.875Z"
        stroke="#52AA5E"
        stroke-width="3"
        stroke-miterlimit="10"
      />
    </svg>
  );
};
const CrossIcon = () => {
  return (
    <svg
      width="67"
      height="67"
      viewBox="0 0 67 67"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M64 15.2009L45.6987 33.5021L64 51.8034L51.8034 64L33.5021 45.6987L15.2009 64L3 51.8034L21.3013 33.5021L3 15.2009L15.2009 3L33.5021 21.3013L51.8034 3L64 15.2009Z"
        stroke="#DB0000"
        stroke-width="3"
        stroke-miterlimit="10"
      />
    </svg>
  );
};

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
