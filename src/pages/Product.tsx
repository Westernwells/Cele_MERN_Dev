import React, { useState, useEffect, useReducer } from "react";
import LayoutForm from "../components/layout/LayoutForm";
import RecImage from "../Assets/RecImage.png";
import Footer from "../components/layout/Footer";
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
import { classNames } from "../utils";
export default function Product() {
  const { state: appState, setState: setAppState } = useAppState();

  const [{ collections }, dispatch] = useReducer(UserReducer, {
    collections: [],
    loading: false,
  });
  const [product, setProduct] = useState<ProductType>();
  let { id } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async (id: string) => {
      try {
        let res = await fetchProductById(id);
        setProduct(res as ProductType);
      } catch (error) {}
    };
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  let navigate = useNavigate();
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
    }
  };
  return (
    <div className="overflow-x-hidden w-full">
      <LayoutForm>
        <div className="w-full lg:w-[80%] xl:w-[75%] mx-auto md:grid md:grid-cols-2 gap-3 mt-[50px] md:mt-[100px]">
          <div className=" flex flex-col justify-end items-center w-full">
            {product?.images && product?.images.length > 1 && (
              <ProductImageCarousel productImages={product?.images} />
            )}
            {product?.images && product?.images.length === 1 && (
              <img
                src={RecImage}
                alt={product.productName + "image"}
                className="h-[300px] w-[80%] md:h-[357px] md:w-[396px] lg:h-[400px] lg:w-[80%] xl:h-[457px] xl:w-[75%]"
              />
            )}
            {product?.images && product?.images.length === 0 && (
              <img
                src={RecImage}
                alt={product.productName + "image"}
                className="h-[300px] w-[80%] md:h-[357px] md:w-[396px] lg:h-[400px] lg:w-[80%] xl:h-[457px] xl:w-[75%]"
              />
            )}
          </div>
          <div className="lg:min-h-[357px] flex flex-col md:justify-between  mt-12 md:mt-0 md:w-[w-80%] lg:w-[80%] xl:w-[80%]">
            <div className="">
              <div className="bg-primary w-[75%] md:w-full">
                <p className="text-[20px] lg:text-[28px] xl:text-[30px] font-semibold leading-[27px] lg:leading-[32px] xl:leading-[35px] px-4 py-2 text-white">
                  {product ? product.productName : "Product Name"}
                </p>
              </div>
              <div className="px-4 mt-2 py-2">
                <p className="text-[20px] lg:text-[28px] xl:text-[30px] font-semibold leading-[27px] lg:leading-[32px] xl:leading-[35px] mb-4">
                  $ {product ? product.price : "Product Price"}
                </p>
                <p className="font-normal text-[14px] leading-[23px] lg:text-[16px] lg:leading-[24px] xl:text-[18px] xl:leading-[30px]">
                  {product
                    ? product.description
                    : " **Description: e.g. Just one flame turns these hand-poured wax entities into slowly shifting performance-art exhibits.**"}
                </p>
              </div>
            </div>
            <div className="flex w-full justify-center md:justify-start mt-4  lg:mt-0">
              <div className="flex gap-6 items-center w-full px-2 lg:px-0 ">
                {appState.collections &&
                appState.collections.find((item) => item?.id == id) ? (
                  <div
                    className="rounded-full h-14 w-16 border-2 border-primary flex items-center justify-center bg-primary fill-white hover:bg-white  hover:fill-black  "
                    onClick={toggleCollection}
                  >
                    <HeartFilledIcon />
                  </div>
                ) : (
                  <div
                    className="rounded-full h-14 w-16 border-2 border-primary flex items-center justify-center bg-white hover:bg-primary fill-black hover:fill-white"
                    onClick={toggleCollection}
                  >
                    <HeartFilledWhiteIcon />
                  </div>
                )}
                <a
                  className="bg-primary leading-[16.44px] text-[14px] text-white font-medium px-[14.5px] py-[13px] uppercase w-full text-center"
                  href={product?.vendorUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  purchase on {product ? product.vendor : "**Retailer name**"}
                </a>
              </div>
            </div>
          </div>
          <div
            className={classNames(
              product?.images && product?.images.length > 1
                ? "mt-[45px] md:mt-[100px] lg:mt-[120px]"
                : "mt-[10px] md:mt-[0px] lg:mt-[0px]",
              " flex-1"
            )}
          >
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

const HeartFilledIcon = () => {
  return (
    <svg
      width="25"
      height="23"
      viewBox="0 0 25 23"
      xmlns="http://www.w3.org/2000/svg"
      className=""
    >
      <path
        d="M18.0002 0.417114C16.8742 0.434629 15.7727 0.748968 14.807 1.32839C13.8413 1.9078 13.0456 2.73178 12.5002 3.71711C11.9548 2.73178 11.1591 1.9078 10.1934 1.32839C9.22774 0.748968 8.12625 0.434629 7.0002 0.417114C5.20514 0.495105 3.51391 1.28037 2.29599 2.60135C1.07806 3.92232 0.432452 5.67164 0.500202 7.46711C0.500202 14.2421 11.4562 22.0671 11.9222 22.3991L12.5002 22.8081L13.0782 22.3991C13.5442 22.0691 24.5002 14.2421 24.5002 7.46711C24.568 5.67164 23.9223 3.92232 22.7044 2.60135C21.4865 1.28037 19.7953 0.495105 18.0002 0.417114ZM12.5002 20.3461C9.2472 17.9161 2.5002 11.9461 2.5002 7.46711C2.43184 6.20183 2.86657 4.96084 3.70957 4.01481C4.55256 3.06878 5.73544 2.49446 7.0002 2.41711C8.26497 2.49446 9.44784 3.06878 10.2908 4.01481C11.1338 4.96084 11.5686 6.20183 11.5002 7.46711H13.5002C13.4318 6.20183 13.8666 4.96084 14.7096 4.01481C15.5526 3.06878 16.7354 2.49446 18.0002 2.41711C19.265 2.49446 20.4478 3.06878 21.2908 4.01481C22.1338 4.96084 22.5686 6.20183 22.5002 7.46711C22.5002 11.9481 15.7532 17.9161 12.5002 20.3461Z"
        fill="inherit"
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
      xmlns="http://www.w3.org/2000/svg"
      className=""
    >
      <path
        d="M18.0002 0.417114C16.8742 0.434629 15.7727 0.748968 14.807 1.32839C13.8413 1.9078 13.0456 2.73178 12.5002 3.71711C11.9548 2.73178 11.1591 1.9078 10.1934 1.32839C9.22774 0.748968 8.12625 0.434629 7.0002 0.417114C5.20514 0.495105 3.51391 1.28037 2.29599 2.60135C1.07806 3.92232 0.432452 5.67164 0.500202 7.46711C0.500202 14.2421 11.4562 22.0671 11.9222 22.3991L12.5002 22.8081L13.0782 22.3991C13.5442 22.0691 24.5002 14.2421 24.5002 7.46711C24.568 5.67164 23.9223 3.92232 22.7044 2.60135C21.4865 1.28037 19.7953 0.495105 18.0002 0.417114ZM12.5002 20.3461C9.2472 17.9161 2.5002 11.9461 2.5002 7.46711C2.43184 6.20183 2.86657 4.96084 3.70957 4.01481C4.55256 3.06878 5.73544 2.49446 7.0002 2.41711C8.26497 2.49446 9.44784 3.06878 10.2908 4.01481C11.1338 4.96084 11.5686 6.20183 11.5002 7.46711H13.5002C13.4318 6.20183 13.8666 4.96084 14.7096 4.01481C15.5526 3.06878 16.7354 2.49446 18.0002 2.41711C19.265 2.49446 20.4478 3.06878 21.2908 4.01481C22.1338 4.96084 22.5686 6.20183 22.5002 7.46711C22.5002 11.9481 15.7532 17.9161 12.5002 20.3461Z"
        fill="inherit"
      />
    </svg>
  );
};
