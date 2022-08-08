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
import MarketPlaceErrorBox from "../components/MarketPlace/MarketPlaceErrorBox";
import {
  fetchProducts,
  ProductsReducer,
  productInitialState,
  ProductType,
} from "../Reducers/ProductReducer";
import {
  UserReducer,
  addCollection,
  removeCollection,
} from "../Reducers/UserReducer";
import { useAppState } from "../context/AppStateContext";
import { useNavigate } from "react-router-dom";
import MarketPlaceEditDropDown from "../components/MarketPlace/MarketPlaceEditDropDown";
import { ToastContainer, toast } from "react-toastify";

export default function Marketplace() {
  const notify = () => toast("Email Saved");
  const navigate = useNavigate();
  const { state: appState, setState: setAppState } = useAppState();
  const [userEmail, setUserEmail] = useState("");

  const [{ collections }, dispatchUser] = useReducer(UserReducer, {
    collections: [],
    loading: false,
  });
  const [{ products }, dispatch] = useReducer(ProductsReducer, {
    products: [],
    loading: false,
    error: false,
    errorState: [],
  });
  useEffect(() => {
    fetchProducts(dispatch, 1);
  }, []);

  const [state, setState] = useState({ rating: 8 });
  const [showMore, setShowMore] = useState(0);
  const [showInputDialog, setShowInputDialog] = useState(false);
  const ratingChanged = (newRating: any) => {
    console.log(newRating);
  };
  const onStarClick = (nextValue: any, prevValue: any, name: any) => {
    console.log(nextValue, prevValue, name);
    setState({ rating: nextValue });
  };

  const onShowMoreClick = () => {
    if (showMore < 1) {
      setShowMore((showmore) => showmore + 1);
      fetchProducts(dispatch, 2);

      // fetch more products
    } else if (showMore === 1) {
      setShowMore((showmore) => showmore + 1);
      setShowInputDialog(true);
    }
  };
  const toggleCollection = (product: ProductType) => {
    if (collections.find((item) => item.id === product.id)) {
      if (product) {
        // remove from collection
        let filtered = appState.collections.filter(
          (item) => item.id !== product.id
        );
        setAppState({ ...appState, collections: [...filtered] });
        removeCollection(dispatchUser, product);
      }
    } else {
      if (product) {
        setAppState({
          ...appState,
          collections: [...appState.collections, product],
        });
        addCollection(dispatchUser, product);
      }
      // add to collection
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserEmail(e.target.value);
  };

  const onSubmit = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setAppState({
        ...appState,
        formState: {
          ...appState.formState,
          userEmail: userEmail,
        },
      });
      // console.log("eebter key pressed", event.key);
      // setAppState();
      console.log(
        "user data",
        JSON.stringify({
          // ...appState,
          //  {
          ...appState.formState,
          userEmail: userEmail,
          // },
        })
      );

      setUserEmail("");
      notify();
      // this.setState({ inputValue: event.target.value });
    }
  };
  return (
    <div className="overflow-x-hidden">
      <LayoutForm>
        <div className="  w-full font-raleway">
          <div className="ml-[27px] md:ml-[54px] bg-white pl-[24px] md:pl-[89px] pt-[28px] pr-[29px] mt-[25px] w-full">
            <div className="flex flex-col sm:flex-row justify-end w-full items-center">
              <div className="order-1 sm:order-0 flex justify-center mx-auto flex-1 w-full mt-4 sm:mt-0">
                <p className="text-[18px] md:text-[25px] leading-[20px] md:leading-[29px] font-semibold text-center w-full">
                  Gift for{" "}
                  {appState.formState.profileName
                    ? `${appState.formState.profileName}'s`
                    : appState.formState.who
                    ? `${appState.formState.who}'s`
                    : "Mother's"}{" "}
                  {appState.formState.occasion
                    ? appState.formState.occasion
                    : "Mother's Day"}
                </p>
              </div>
              <div className="order-0 sm:order-1 flex justify-end sm:w-[295px]">
                {appState.formState.isProfileSaved ? (
                  <button className="text-left text-xs md:text-base font-semibold text-white bg-primary leading-[18.78px] sm:w-[295px] pt-5 pb-5 pl-2 md:pl-7 flex items-center gap-2 md:gap-5 ">
                    <img src={AddUserIcon} alt="" className="" /> See{" "}
                    {appState.formState.profileName}'s Stash
                  </button>
                ) : (
                  <button
                    className="text-left text-xs md:text-base font-semibold text-white bg-primary leading-[18.78px] sm:w-[295px] pt-5 pb-5 pl-2 md:pl-7 flex items-center gap-2 md:gap-5"
                    onClick={() => navigate("/profile", { replace: false })}
                  >
                    <img src={AddUserIcon} alt="" className="" /> Save this
                    Profile
                  </button>
                )}
              </div>
            </div>
            {/* <div className="grid grid-cols-12 gap-8 md:justify-end">
           
              <div className="col-start-1 col-end-9 lg:col-start-1 lg:col-end-9 flex justify-center mx-auto">
                <p className="text-[18px] md:text-[25px] leading-[20px] md:leading-[29px] font-semibold text-center">
                  Gift for{" "}
                  {appState.formState.profileName
                    ? appState.formState.profileName
                    : appState.formState.who}
                  's{" "}
                  {appState.formState.occasion
                    ? appState.formState.occasion
                    : "Mother's Day"}
                </p>
              </div>
              <div className="col-start-9 col-end-13 w-full flex justify-end ">
                {appState.formState.isProfileSaved ? (
                  <button className="text-left text-xs md:text-base font-semibold text-white bg-primary leading-[18.78px] w-[295px] pt-5 pb-5 pl-2 md:pl-7 flex items-center gap-2 md:gap-5 ">
                    <img src={AddUserIcon} alt="" className="" /> See{" "}
                    {appState.formState.profileName}'s Stash
                  </button>
                ) : (
                  <button
                    className="text-left text-xs md:text-base font-semibold text-white bg-primary leading-[18.78px] w-[295px] pt-5 pb-5 pl-2 md:pl-7 flex items-center gap-2 md:gap-5"
                    onClick={() => navigate("/profile", { replace: false })}
                  >
                    <img src={AddUserIcon} alt="" className="" /> Save this
                    Profile
                  </button>
                )}
              </div>
            </div> */}
          </div>
          <div className="sm:ml-[27px] lg:ml-[34px] xl:ml-[54px] bg-white  pt-[78px]  mt-[100px] w-full border-t-2 border-l-2 border-t-primary border-l-primary pb-12  ">
            <div className="w-full flex justify-between  mb-[45px]   pl-[24px] lg:pl-[54px] xl:pl-[89px] pr-[24px] lg:pr-[54px] xl:pr-[114px]">
              <div className="flex gap-2 items-center w-full ml-6">
                <MarketPlaceEditDropDown />
                {/* <div className="flex items-center gap-2 relative"></div> */}
              </div>
              <div className="flex gap-2 items-center justify-end mr-8 xl:mr-12 w-full ">
                <img src={Heart} alt="" className="w-[16.07px] h-[15px]" />
                <p className="">Stash It</p>
              </div>
            </div>
            <div className=" mx-auto xs:mx-0 xs:grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  mb-[45px]  gap-4 justify-between pl-[24px] lg:pl-[54px] xl:pl-[89px] pr-[24px] lg:pr-[54px] xl:pr-[114px] ">
              {products &&
                products.map((item, index) => (
                  <ProductCard
                    key={index}
                    data={item}
                    toggle={toggleCollection}
                    collected={
                      appState.collections.find((col) => col.id === item.id)
                        ? true
                        : false
                    }
                  />
                ))}
            </div>
            {showInputDialog && (
              <MarketPlaceErrorBox
                onSubmit={onSubmit}
                onChange={onChange}
                value={userEmail}
              />
            )}
            <div className="flex justify-center w-full mt-4">
              <button
                className="text-center text-base font-semibold text-white bg-primary leading-[18.78px] w-[295px] pt-5 pb-5  gap-5"
                onClick={onShowMoreClick}
              >
                Show More
              </button>
            </div>
          </div>
        </div>
        <Footer />
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
