import React, { useState, useEffect, useRef } from "react";
import LayoutForm from "../components/layout/LayoutForm";
import RecImage from "../Assets/RecImage.png";
import ReactStars from "react-rating-stars-component";
import StarRatingComponent from "react-star-rating-component";
import { StarIcon as StarIconSolid } from "@heroicons/react/solid";
import { Navigate, useNavigate } from "react-router-dom";
import { fetchAllProducts } from "../Api";
import { ProductType } from "../Reducers/ProductReducer";
import { useAppState } from "../context/AppStateContext";

type RevItemType = {
  price: string;
  product: string;
  vendor: string;
  link: string;
  productName: string;
  description: string;
  images: Array<string>;
  id: string;
};
export type RatedItemType = {
  product: string;
  rated: boolean;
  rating: number;
};
export default function Recommendations() {
  const navigate = useNavigate();
  const { state: appState, setState: setAppState } = useAppState();

  const [state, setState] = useState({ rating: 3 });
  const [revIndex, setRevIndex] = useState(0);
  const [products, setProducts] = useState<ProductType[]>([]);
  const textInput = useRef<HTMLInputElement>(null);
  const [starsKey, setStarsKey] = useState(Math.random());
  const ratingChanged = (newRating: number) => {
    if (revIndex < 9) {
      const item = products[revIndex];
      setRecommendations((recs) => [
        ...recs,
        { product: item.productName, rated: true, rating: newRating },
      ]);
      setState({ rating: 0 });
      setRevIndex((state) => state + 1);
    } else if (revIndex === 9) {
      const item = products[revIndex];
      setRecommendations((recs) => [
        ...recs,
        { product: item.productName, rated: true, rating: newRating },
      ]);
      alert("this is the last item on the list");
      console.log("recomendations", [
        ...recommendations,
        { product: item.productName, rated: true, rating: newRating },
      ]);
      navigate("/market", { replace: false });
    } else {
      alert("No more item on the list");
    }
  };

  const [recommendations, setRecommendations] = useState<RatedItemType[]>([]);
  const cancle = () => {
    if (revIndex < 9) {
      const item = products[revIndex];
      setRecommendations((recs) => [
        ...recs,
        { product: item.productName, rated: false, rating: 0 },
      ]);
      setState({ rating: 0 });
      setRevIndex((state) => state + 1);
    } else if (revIndex === 9) {
      const item = products[revIndex];
      setRecommendations((recs) => [
        ...recs,
        { product: item.productName, rated: false, rating: 0 },
      ]);
      navigate("/market", { replace: false });

      console.log("recomendations", [
        ...recommendations,
        { product: item.productName, rated: false, rating: 0 },
      ]);
      alert("this is the last item on the list");
      navigate("/market", { replace: false });
    } else {
      alert("No more item on the list");
    }
  };
  let ratings: Array<number> = [];
  useEffect(() => {
    setTimeout(() => {
      setStarsKey(Math.random());
    }, 400);
    setState({ rating: 0 });
    // console.log("revindex", revIndex);
  }, [revIndex]);
  useEffect(() => {
    const goFetchAllProducts = async () => {
      let data = await fetchAllProducts();
      setProducts((data as Array<ProductType>).slice(0, 10));
    };
    goFetchAllProducts();
  }, []);

  return (
    <div className="">
      <LayoutForm>
        <div className="min-h-[calc(100vh-250px)] md:min-h-[calc(100vh-200px)] flex items-center w-full font-raleway">
          <div className="ml-0 lg:ml-[54px] bg-white pl-[23px] lg:pl-[89px] pt-[78px] pb-[48px] pr-[29px] mt-[50px] lg:mt-[100px] w-full">
            {products.length > 0 && (
              <div className="lg:grid lg:grid-cols-12 gap-8">
                <div className="col-start-1 col-end-7">
                  <ProductCard data={products[revIndex]} />
                </div>
                <div className="col-start-7 col-end-13 mt-8 lg:mt-0 lg:mr-[123px]">
                  <p className="font-semibold text-[20px]  lg:text-[28px] leading-[26px] lg:leading-[32.87px] w-full lg:w-[448px]">
                    Please rate how this gift matches your{" "}
                    {appState.formState.who
                      ? appState.formState.who
                      : "** Mother **"}
                  </p>
                  <div className="flex gap-1 lg:gap-4 mt-4 lg:mt-16 items-center lg:items-start justify-center lg:justify-start">
                    <div
                      // className="h-[32px] w-[32px] lg:h-[64px] md:w-[64px] "
                      onClick={cancle}
                    >
                      <CrossIcon
                        className="h-[32px] w-[32px] lg:h-[64px] lg:w-[64px]  "
                        // onClick={cancle}
                      />
                      <CrossSmallIcon
                        className="h-[32px] w-[32px] lg:h-[64px] lg:w-[64px] lg:hidden block"
                        // onClick={cancle}
                      />
                    </div>
                    <div className="md:hidden block">
                      <ReactStars
                        key={starsKey}
                        count={5}
                        onChange={ratingChanged}
                        size={25}
                        color2={"#ffd700"}
                        value={state.rating}
                      />
                    </div>
                    <div className="hidden md:block">
                      <ReactStars
                        key={starsKey}
                        count={5}
                        onChange={ratingChanged}
                        size={50}
                        color2={"#ffd700"}
                        value={state.rating}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
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
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M63 24.875H50.9092L59.4567 16.3237L48.6763 5.53951L40.125 14.0908V2H24.875V14.0908L16.3237 5.53951L5.53951 16.3237L14.0908 24.875H2V40.125H14.0908L5.53951 48.6763L16.3237 59.4567L24.875 50.9092V63H40.125V50.9092L48.6763 59.4567L59.4567 48.6763L50.9092 40.125H63V24.875Z"
          stroke="#52AA5E"
          strokeWidth="3"
          strokeMiterlimit="10"
        />
      </svg>
    </div>
  );
};
const defaultElement = "svg";

function StarFilledIcon<K extends React.ElementType = typeof defaultElement>(
  props: React.ComponentProps<K>
) {
  return (
    <svg
      {...props}
      width="65"
      height="65"
      viewBox="0 0 65 65"
      fill="#52AA5E"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M63 24.875H50.9092L59.4567 16.3237L48.6763 5.53951L40.125 14.0908V2H24.875V14.0908L16.3237 5.53951L5.53951 16.3237L14.0908 24.875H2V40.125H14.0908L5.53951 48.6763L16.3237 59.4567L24.875 50.9092V63H40.125V50.9092L48.6763 59.4567L59.4567 48.6763L50.9092 40.125H63V24.875Z"
        stroke="#52AA5E"
        strokeWidth="3"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

function CrossIcon<K extends React.ElementType = typeof defaultElement>(
  props: React.ComponentProps<K>
) {
  return (
    <svg
      {...props}
      width="67"
      height="67"
      viewBox="0 0 67 67"
      className="text-red-500 hover:fill-current hover:text-red-500 focus:text-red-500 hidden lg:block"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M64 15.2009L45.6987 33.5021L64 51.8034L51.8034 64L33.5021 45.6987L15.2009 64L3 51.8034L21.3013 33.5021L3 15.2009L15.2009 3L33.5021 21.3013L51.8034 3L64 15.2009Z"
        stroke="#DB0000"
        strokeWidth="3"
        strokeMiterlimit="10"
      />
    </svg>
  );
}

function CrossSmallIcon<K extends React.ElementType = typeof defaultElement>(
  props: React.ComponentProps<K>
) {
  return (
    <svg
      {...props}
      style={{
        width: "65%",
        height: "65%",
      }}
      width="67"
      height="67"
      viewBox="0 0 67 67"
      className="text-red-500 hover:fill-current hover:text-red-500 focus:text-red-500 lg:hidden"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M64 15.2009L45.6987 33.5021L64 51.8034L51.8034 64L33.5021 45.6987L15.2009 64L3 51.8034L21.3013 33.5021L3 15.2009L15.2009 3L33.5021 21.3013L51.8034 3L64 15.2009Z"
        stroke="#DB0000"
        strokeWidth="3"
        strokeMiterlimit="10"
      />
    </svg>
  );
}
type ProductCardtype = {
  data: ProductType;
};

const ProductCard = ({ data }: ProductCardtype) => {
  const navigate = useNavigate();

  return (
    <div className="prod-container border-primary border-2 rounded-[20px] md:min-h-[471px] pl-[24px] md:pl-[34px] pr-[24px] md:pr-[54px] pt-[39px] pb-[18px]">
      <div className="">
        <div className="flex justify-between mb-4">
          <p className="font-semibold text-[20px] leading-[23.48px] ">
            {data.productName}
          </p>
          <p className="font-semibold text-[25px] leading-[29.35px]">
            {data.price}
          </p>
        </div>
        <p className="font-normal text-[16px] leading-[18.78px] mb-4">
          {data.vendor}
        </p>
        <hr className="bg-primary h-0.5" />
      </div>
      {/* product iamge */}
      <div className="mx-auto w-full flex justify-center my-[32px] md:my-[68px] relative">
        <img src={data.images[1]} alt="" className="h-[222px] w-[302px]" />
        <div className="flex justify-end w-full absolute bottom-0 mr-7 md:mr-0 mb-2 md:mb-0">
          <button className="w-[50px] md:w-[101px] h-[50px] md:h-[101px]  rounded-full bg-primary text-white font-semibold text-xs md:text-base leading-[18.78px] py-2 md:px-[25px]">
            <span
              className="w-[52px]"
              onClick={() =>
                navigate(`/product/${data.id}`, { replace: false })
              }
            >
              Buy Now
            </span>
          </button>
        </div>
      </div>
      {/* buy action */}
    </div>
  );
};
