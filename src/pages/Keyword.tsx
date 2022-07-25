import React, { useState } from "react";
import LayoutForm from "../components/layout/LayoutForm";
import { Range, getTrackBackground } from "react-range";
import Headphone from "../Assets/noun-book-1005293 1.svg";
import { BookSvg } from "../Svgs/index";
import { useNavigate } from "react-router-dom";
import { classNames } from "../utils";
import { useAppState } from "../context/AppStateContext";
interface ITagBox {
  text: string;
  select: (text: string) => void;
  onItemClick: (index: number) => void;
  addItem: (text: string, index?: number) => void;
  index: number;
  activeIndex: number;
}
const Items = [
  ["Book", "Headphones", "Video Game"],
  ["Watch", "Phone", "Movie"],
  ["Shoe", "Cloth", "Perfumes"],
  ["Groceries", "Jewelries", "Creame"],
  ["Make Up", "Food", "Undies"],
];
const Keyword: React.FC = () => {
  let navigate = useNavigate();
  const { state, setState } = useAppState();

  const [count, setCount] = useState<number>(0);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [selectedItems, setSelecedItems] = useState<string[]>([]);
  const [itemToAdd, setItemToAdd] = useState<string>("");

  const onItemClick = (index: number) => {
    setActiveIndex(index);
    if (count < 4) {
      setCount(count + 1);
      setSelecedItems([...selectedItems, itemToAdd]);
      setActiveIndex(-1);
      setItemToAdd("");
    } else {
      window.alert([...selectedItems, itemToAdd]);
      setState({
        ...state,
        formState: {
          ...state.formState,
          keywords: [...selectedItems, itemToAdd],
        },
      });

      navigate("/occasion", { replace: false });
    }
  };
  const addItem = (item: string, index?: number) => {
    if (count < 4) {
      // setItemToAdd(item);
      setSelecedItems([...selectedItems, item]);
      setCount(count + 1);
    } else {
      // setItemToAdd(item);
      setSelecedItems([...selectedItems, item]);
      setState({
        ...state,
        formState: {
          ...state.formState,
          keywords: [...selectedItems, item],
        },
      });
      window.alert([...selectedItems, item]);

      navigate("/occasion", { replace: false });
    }
  };
  return (
    <div>
      <LayoutForm>
        {/* Skip area */}
        <div className="flex  justify-end absolute w-full mt-12">
          <div
            className="group w-[117px] pb-1 border-b-2 border-b-black hover:border-b-primary cursor-pointer"
            onClick={() => {
              navigate("/occasion", { replace: false });
            }}
          >
            <p className="text-[20px] leading-[23px] font-normal group-hover:text-primary">
              Skip
            </p>
          </div>
        </div>
        {/* main */}
        <div className="min-h-[calc(100vh-200px)] flex flex-col justify-center">
          {/* Content area */}
          <div className="px-[52px] w-full">
            {/* row 1 */}
            <div className="md:grid md:grid-cols-12 w-full mb-10 gap-6">
              <div className="md:col-start-1 md:col-end-6 w-full">
                <p className="text-[25px] leading-[29px] font-semibold">
                  Which item would be <br />
                  the best gift for your mom?
                </p>
                <div className="w-full mt-8  relative"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:flex gap-[44px] md:gap-[88px] mb-5">
              {Items[count].map((text, index) => (
                <ItemBox
                  key={index.toString()}
                  text={text}
                  select={() => {}}
                  onItemClick={onItemClick}
                  index={index}
                  activeIndex={activeIndex}
                  addItem={addItem}
                />
              ))}
              <ItemBox
                key={3}
                text={"None of This"}
                select={() => {}}
                onItemClick={onItemClick}
                index={3}
                activeIndex={activeIndex}
                addItem={addItem}
              />
            </div>
          </div>
          {/* next area */}
        </div>
        {/* <div className=" flex justify-end absolute bottom-0 w-full  md:mb-[92px]">
          <button
            className="bg-primary w-[50%] py-4 pl-16  hover:bg-green-600"
            disabled={activeIndex === -1 ? true : false}
            onClick={() => {
              if (count < 4) {
                setCount(count + 1);
                setSelecedItems([...selectedItems, itemToAdd]);
                setActiveIndex(-1);
                setItemToAdd("");
              } else {
                window.alert([...selectedItems, itemToAdd]);
                setState({
                  ...state,
                  formState: {
                    ...state.formState,
                    keywords: [...selectedItems, itemToAdd],
                  },
                });

                navigate("/occasion", { replace: false });
              }
            }}
          >
            <p className="text-white font-semibold text-[25px] leading-[29px]">
              Next Step
            </p>
          </button>
        </div> */}
      </LayoutForm>
    </div>
  );
};
export default Keyword;

const ItemBox = ({
  text,
  select,
  onItemClick,
  index,
  activeIndex,
  addItem,
}: ITagBox) => {
  const [active, setActive] = useState<boolean>(false);
  return (
    <div
      className={classNames(
        activeIndex === index ? "bg-red-500" : "",
        "group md:h-[120px] md:w-[124px] md:h-[150px] md:w-[154px] px-[13px] py-[10px] border-l-2 border-b-2 border-l-primary border-b-primary pb-5 hover:bg-primary hover:rounded-lg"
      )}
      onClick={(e) => {
        addItem(text, index);
        // onItemClick(index);
        setActive(true);
        // select(text);
      }}
    >
      <p className="text-[20px] leading-[23px] font-normal text-black mb-10 group-hover:text-white">
        {text}
      </p>
      <img src={Headphone} alt="" className="group-hover:stroke-white" />
    </div>
  );
};
