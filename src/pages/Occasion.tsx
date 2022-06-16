import React, { useState } from "react";
import LayoutForm from "../components/layout/LayoutForm";
import { useNavigate } from "react-router-dom";

interface ITagBox {
  text: string;
  select: (text: string) => void;
}
const Occasions = ["Birthday", "Mother's Day", "Anniversary"];
const Occasion: React.FC = () => {
  let navigate = useNavigate();
  const [state, setState] = useState({
    occasion: "",
  });
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const setOccasion = (e: string) => {
    setState({ ...state, occasion: e });
  };
  return (
    <div>
      <LayoutForm>
        {/* Skip area */}
        <div className="flex  justify-end absolute w-full">
          <div
            className="group w-[117px] pb-1 border-b-2 border-b-black hover:border-b-primary cursor-pointer"
            onClick={() => {
              navigate("/price", { replace: false });
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
            <div className="grid grid-cols-12 w-full mb-10 gap-6 items-end">
              <div className="col-start-1 col-end-6 w-full">
                <p className="text-[25px] leading-[29px] font-semibold">
                  What is the special occasion?
                </p>
                <div className="w-full mt-3">
                  <select
                    id="occasion"
                    name="occasion"
                    value={state.occasion}
                    onChange={onChange}
                    autoComplete="country-name"
                    className="w-full focus:ring-white focus:border-b-2 focus:border-b-primary border-b-2 shadow-sm  sm:text-sm border-0 border-b-primary"
                  >
                    <option>Type in to search the occasion</option>
                    {Occasions.map((item, index) => (
                      <option key={index.toString()} value={item}>
                        {item}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="col-start-6 col-end-11"></div>
            </div>
            {/* row 2 */}
            <div className="grid grid-cols-12 w-full mb-10">
              <div className="col-start-1 col-end-6 w-full">
                <div className="flex gap-9">
                  {Occasions.map((text, index) => (
                    <TagBox
                      key={index.toString()}
                      text={text}
                      select={setOccasion}
                    />
                  ))}
                </div>
              </div>
              <div className="col-start-6 col-end-11"></div>
            </div>
          </div>
          {/* next area */}
          <div
            className=" flex justify-end absolute bottom-0 w-full mb-[92px] "
            onClick={() => {
              window.alert(JSON.stringify(state));

              navigate("/price", { replace: false });
            }}
          >
            <div className="bg-primary w-[50%] py-4 pl-16 cursor-pointer hover:bg-green-600">
              <p className="text-white font-semibold text-[25px] leading-[29px]">
                Next Step
              </p>
            </div>
          </div>
        </div>
      </LayoutForm>
    </div>
  );
};
export default Occasion;

const TagBox = ({ text, select }: ITagBox) => {
  return (
    <div
      className="bg-primary h-[45px] min-w-[138px] px-[13px] py-[10px] group hover:cursor-pointer hover:bg-green-700"
      onClick={(e) => select(text)}
    >
      <p className="text-[20px] leading-[23px] font-normal text-white group-hover:font-medium">
        {text}
      </p>
    </div>
  );
};
