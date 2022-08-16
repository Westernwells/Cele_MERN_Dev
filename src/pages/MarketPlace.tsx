import React, { useState, useEffect, useReducer } from "react";
import LayoutForm from "../components/layout/LayoutForm";
import RecImage from "../Assets/RecImage.png";
import AddUserIcon from "../Assets/fi-rr-user-add.png";
import Footer from "../components/layout/Footer";
import ProductCard from "../components/MarketPlace/ProductCard";
import Heart from "../Assets/Heart.png";
import MarketPlaceErrorBox from "../components/MarketPlace/MarketPlaceErrorBox";
import {
  fetchProducts,
  ProductsReducer,
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
import { toast } from "react-toastify";

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
    setAppState({
      ...appState,
      formState: {
        ...appState.formState,
        isEditing: false,
      },
    });
  }, []);
  // useEffect(() => {
  // }, []);

  const [state, setState] = useState({ rating: 8 });
  const [showMore, setShowMore] = useState(0);
  const [showInputDialog, setShowInputDialog] = useState(false);

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
      // console.log(
      //   "user data",
      //   JSON.stringify({
      //     ...appState.formState,
      //     userEmail: userEmail,
      //   })
      // );
      setUserEmail("");
      notify();
    }
  };

  const editAction = (link: string) => {
    setAppState({
      ...appState,
      formState: {
        ...appState.formState,
        isEditing: true,
      },
    });
    navigate(`/${link}`);
  };
  return (
    <div className="overflow-x-hidden">
      <LayoutForm>
        <div className="  w-full font-raleway">
          <div className=" bg-white pl-[24px]  pt-[28px]  mt-[25px] w-full flex flex-col sm:grid sm:grid-cols-12 items-center">
            {/* <div className="flex flex-col sm:flex-row justify-end w-full items-center"> */}
            <div className="order-1 sm:order-0 flex justify-center mx-auto flex-1 w-full mt-4 sm:mt-0 col-start-5 col-end-9">
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
            <div className="order-0 sm:order-1 flex justify-end w-full sm:w-full sm:col-start-9 sm:col-end-13">
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
            {/* </div> */}
          </div>
          {/* <div className="ml-[27px] md:ml-[54px] bg-white pl-[24px] md:pl-[89px] pt-[28px] pr-[29px] mt-[25px] w-full">
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
          </div> */}
          <div className="sm:ml-[27px] lg:ml-[34px] xl:ml-[54px] bg-white  pt-[26px]  mt-[43px] w-full border-t-2 border-l-2 border-t-primary border-l-primary pb-12  ">
            <div className="w-full flex justify-between xs:mx-0   mb-[10px]   pl-[24px] md:pl-[50px] lg:pl-[50px] xl:pl-[70px] pr-[24px] md:pr-[50px] lg:pr-[114px] xl:pr-[150px] ">
              <div className="flex items-left w-full ">
                <MarketPlaceEditDropDown editAction={editAction} />
              </div>
              <div className="flex gap-2 items-center  justify-end  w-full ">
                <img src={Heart} alt="" className="w-[16.07px] h-[15px]" />
                <p className="">Stash It</p>
              </div>
            </div>
            {/* <div className="w-full flex justify-between  mb-[10px]   pl-[24px] lg:pl-[54px] xl:pl-[200px] pr-[24px] lg:pr-[54px] xl:pr-[150px]">
              <div className="flex gap-2 items-center w-full ml-6 lg:ml-4 xl:ml-10">
                <MarketPlaceEditDropDown editAction={editAction} />
              </div>
              <div className="flex gap-2 items-center justify-end mr-8 lg:mr-4 xl:mr-[70px] w-full ">
                <img src={Heart} alt="" className="w-[16.07px] h-[15px]" />
                <p className="">Stash It</p>
              </div>
            </div> */}
            <div className=" mx-auto xs:mx-0 xs:grid xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4  mb-[45px]  gap-4 lg:gap-5 xl:gap-8 justify-between  pl-[24px] md:pr-[50px] md:pl-[50px] lg:pl-[50px] xl:pl-[70px] pr-[24px] lg:pr-[114px] xl:pr-[150px] ">
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
