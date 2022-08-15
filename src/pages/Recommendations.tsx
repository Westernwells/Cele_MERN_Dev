import React, { useState, useEffect } from "react";
import LayoutForm from "../components/layout/LayoutForm";
import ReactStars from "react-rating-stars-component";
import { useNavigate } from "react-router-dom";
import { fetchAllProducts } from "../Api";
import { ProductType } from "../Reducers/ProductReducer";
import { useAppState } from "../context/AppStateContext";
import Navbar from "../components/layout/Navbar";

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
      setAppState({
        ...appState,
        formState: {
          ...appState.formState,
          recommendedItems: [
            ...recommendations,
            { product: item.productName, rated: true, rating: newRating },
          ],
        },
      });
      alert("this is the last item on the list");
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
      setAppState({
        ...appState,
        formState: {
          ...appState.formState,
          recommendedItems: [
            ...recommendations,
            { product: item.productName, rated: true, rating: 0 },
          ],
        },
      });
      navigate("/market", { replace: false });
      alert("this is the last item on the list");
      // navigate("/market", { replace: false });
    } else {
      alert("No more item on the list");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setStarsKey(Math.random());
    }, 400);
    setState({ rating: 0 });
  }, [revIndex]);
  useEffect(() => {
    if (appState.formState.isEditing) navigate("/market");
  }, []);
  useEffect(() => {
    const goFetchAllProducts = async () => {
      let data = await fetchAllProducts();
      setProducts((data as Array<ProductType>).slice(0, 10));
    };
    goFetchAllProducts();
  }, []);

  return (
    <div className="overflow-x-hidden min-h-screen overflow-y-hidden flex flex-col">
      <Navbar />
      {/* <LayoutForm> */}
      <div className=" h-full flex items-center w-full font-raleway overflow-x-hidden flex-1 overflow-y-hidden">
        <div className="ml-0 lg:ml-[32px] xl:ml-[54px] bg-white pl-[23px]  xl:pl-[89px]  pb-[48px] pr-[29px] mt-[50px] xl:mt-[50px] lg:mt-[100px] w-full h-full">
          {products.length > 0 && (
            <div className="lg:grid lg:grid-cols-12 gap-8 flex-1">
              <div className="w-full sm:w-[75%] md:w-full  mx-auto lg:col-start-1 lg:col-end-7 xl:col-start-1 xl:col-end-7 h-[50%] lg:h-auto">
                <ProductCard data={products[revIndex]} />
              </div>
              <div className="lg:col-start-7 lg:col-end-13 xl:col-start-7 xl:col-end-13 mt-8 lg:mt-0 xl:mr-[123px] h-[50%] ">
                <p className="font-semibold text-[20px] text-center lg:text-left  lg:text-[28px] leading-[26px] lg:leading-[32.87px] w-full lg:w-[448px]">
                  Please rate how this gift matches your{" "}
                  {appState.formState.who ? appState.formState.who : "Unknown"}
                </p>
                {/* small screens */}
                <div className="grid grid-cols-5 mt-4 lg:mt-16 items-center xl:items-center justify-center lg:justify-start w-[90%] xxs:w-[85%] xs:w-[80%] sm:w-[65%] md:w-[50%] lg:hidden mx-auto ">
                  <div
                    onClick={cancle}
                    className="col-start-1 col-end-2 flex items-center"
                  >
                    <CrossSmallIcon className="h-[32px] w-[32px] lg:h-[64px] lg:w-[64px] mlg:hidden block" />
                  </div>
                  <div className="lg:hidden block  col-start-2 col-end-6">
                    <ReactStars
                      key={starsKey}
                      count={4}
                      onChange={ratingChanged}
                      size={43}
                      activeColor={"#52AA5E"}
                      value={state.rating}
                      style={{
                        display: "grid",
                        gridTemplateColumn: "repeat(4, 1fr)",
                        backgroundColor: "red",
                      }}
                    />
                  </div>
                </div>
                {/* large screen */}
                <div className="lg:grid lg:grid-cols-5 mt-4 lg:mt-16 items-center xl:items-center justify-center lg:justify-start lg:w-[448px] hidden">
                  <div onClick={cancle} className="col-start-1 col-end-2">
                    <CrossIcon className="h-[32px] w-[32px] lg:h-[64px] lg:w-[64px]  " />
                  </div>
                  {/* <div className="lg:hidden block ml-[10px]"></div> */}
                  <div className="hidden lg:block col-start-2 col-end-6">
                    <ReactStars
                      key={starsKey}
                      count={4}
                      onChange={ratingChanged}
                      size={65}
                      activeColor={"#52AA5E"}
                      value={state.rating}
                      fullIcon={<i className="fa fa-star  bg-red-500"></i>}
                    />
                  </div>
                </div>
                <div className="flex flex-col justify-end text-right mt-6 lg:mt-12 lg:w-[448px]">
                  <p className="text-[#DB0000]">X = I Would Never Buy This</p>
                  <p className="text-[#52AA5E]">4 Stars = Great Gift</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      {/* </LayoutForm> */}
    </div>
  );
}

const defaultElement = "svg";

function CrossIcon<K extends React.ElementType = typeof defaultElement>(
  props: React.ComponentProps<K>
) {
  return (
    <svg
      {...props}
      width="65"
      height="65"
      viewBox="0 0 65 65"
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
      // style={{
      //   width: "55%",
      //   height: "55%",
      // }}
      width="43"
      height="64"
      viewBox="0 0 64 43"
      className="text-red-500 hover:fill-current hover:text-red-500 focus:text-red-500 lg:hidden flex items-center -mt-4"
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
    <div className="prod-container border-primary border-2 rounded-[20px] h-[300px] md:h-[350px] lg:min-h-[450px] pl-[24px] md:pl-[34px] pr-[24px] md:pr-[54px] pt-[15px] md:pt-[20px] lg:pt-[39px] pb-[18px] md:w-[75%] mx-auto lg:w-full relative">
      <div className="">
        <div className="flex justify-between mb-2  lg:mb-4">
          <p className="font-semibold text-[20px] leading-[23.48px] ">
            {data.productName}
          </p>
          <p className="font-semibold text-[25px] leading-[29.35px]">
            ${data.price}
          </p>
        </div>
        <p className="font-normal text-[16px] leading-[18.78px] mb-2  lg:mb-4">
          {data.vendor}
        </p>
        <hr className="bg-primary h-0.5" />
      </div>
      {/* product iamge */}
      <div className="mx-auto w-full flex justify-center my-4 md:my-4 lg:my-[32px] xl:my-[68px] relative">
        {/* <div className="relative h-[222px] w-[302px]"> */}
        <img
          src={data.images[1]}
          alt=""
          className="h-[150px] w-[262px] md:h-[200px] md:w-[302px]"
        />
        {/* </div> */}
      </div>
      <div className="flex justify-end w-full absolute bottom-1 mr-3 sm:mr-4 md:mr-2 right-2 lg:right-1 mb-2 md:mb-0 lg:pr-2">
        <button className="w-[50px] lg:w-[101px] h-[50px] lg:h-[101px]  rounded-full bg-primary text-white font-semibold text-xs lg:text-base leading-[18.78px] py-2 lg:px-[25px]">
          <span
            className="w-[40px] lg:w-[52px]"
            onClick={() => navigate(`/product/${data.id}`, { replace: false })}
          >
            Buy Now
          </span>
        </button>
      </div>
      {/* buy action */}
    </div>
  );
};
