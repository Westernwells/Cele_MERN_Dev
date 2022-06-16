import React, { useState } from "react";
import LayoutForm from "../components/layout/LayoutForm";
import { useNavigate } from "react-router-dom";

interface ITagBox {
  text: string;
  select: (text: string) => void;
}

const Who: React.FC = () => {
  const [state, setState] = useState({
    who: "",
    month: "",
    day: "",
    year: "",
    gender: "",
  });
  const Months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  const Whos = ["Father", "Mother", "Partner"];

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };
  const setWho = (e: string) => {
    setState({ ...state, who: e });
  };
  let navigate = useNavigate();
  return (
    <div>
      <LayoutForm>
        {/* Skip area */}
        <div className="flex  justify-end absolute w-full">
          <div
            className="group w-[117px] pb-1 border-b-2 border-b-black hover:border-b-primary cursor-pointer"
            onClick={() => {
              navigate("../keyword", { replace: false });
            }}
          >
            <p className="text-[20px] leading-[23px] font-normal group-hover:text-primary">
              Skip
            </p>
          </div>
        </div>
        <div className="min-h-[calc(100vh-200px)] flex flex-col justify-center">
          {/* Content area */}
          <div className="px-[52px] w-full">
            {/* row 1 */}
            <div className="grid grid-cols-12 w-full mb-10 gap-6 items-end">
              <div className="col-start-1 col-end-6 w-full">
                <p className="text-[25px] leading-[29px] font-semibold">
                  This gift is for whom?
                </p>
                <div className="w-full mt-3">
                  <select
                    id="who"
                    name="who"
                    value={state.who}
                    onChange={onChange}
                    autoComplete="who"
                    className="w-full focus:ring-white focus:border-b-2 focus:border-b-primary border-b-2 shadow-sm  sm:text-sm border-0 border-b-primary"
                  >
                    <option value={""}>Type in to search the option</option>
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Partner">Partner</option>
                  </select>
                </div>
              </div>
              <div className="col-start-6 col-end-11">
                <div className="flex gap-9">
                  {Whos.map((text, index) => (
                    <TagBox
                      key={index.toString()}
                      text={text}
                      select={setWho}
                    />
                  ))}
                </div>
              </div>
            </div>
            {/* row 2 */}
            <div className="grid grid-cols-12 w-full mb-10">
              <div className="col-start-1 col-end-6 w-full">
                <p className="text-[25px] leading-[29px] font-semibold">
                  Birthday:
                </p>
                <div className="grid grid-cols-4 gap-3">
                  {/* month */}
                  <div className="w-full mt-3">
                    <select
                      id="month"
                      name="month"
                      value={state.month}
                      onChange={onChange}
                      autoComplete="country-name"
                      className="w-full focus:ring-white focus:border-b-2 focus:border-b-primary border-b-2 shadow-sm  sm:text-sm border-0 border-b-primary"
                    >
                      <option>Month</option>

                      {Months.map((item, index) => (
                        <option key={index.toString()}>{item}</option>
                      ))}
                    </select>
                  </div>
                  {/* day */}
                  <div className="w-full mt-3">
                    <select
                      id="day"
                      name="day"
                      value={state.day}
                      onChange={onChange}
                      autoComplete="country-name"
                      className="w-full focus:ring-white focus:border-b-2 focus:border-b-primary border-b-2 shadow-sm  sm:text-sm border-0 border-b-primary"
                    >
                      <option>Day</option>

                      {new Array(31).fill("1").map((item, index) => (
                        <option key={index.toString()}>{index + 1}</option>
                      ))}
                    </select>
                  </div>
                  {/* day */}
                  <div className="w-full mt-3 col-span-2">
                    <select
                      id="year"
                      name="year"
                      value={state.year}
                      onChange={onChange}
                      autoComplete="country-name"
                      className="w-full focus:ring-white focus:border-b-2 focus:border-b-primary border-b-2 shadow-sm  sm:text-sm border-0 border-b-primary"
                    >
                      <option>Year</option>

                      {new Array(123).fill("1").map((item, index) => (
                        <option key={index.toString()}>{index + 1900}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-start-6 col-end-11"></div>
            </div>
            {/* row 3 */}
            <div className="grid grid-cols-12 w-full mb-10">
              <div className="col-start-1 col-end-6 w-full">
                {/* <p className="text-[25px] leading-[29px] font-semibold">
                  Gender?
                </p> */}
                <div className="w-full mt-3">
                  <select
                    id="gender"
                    name="gender"
                    value={state.gender}
                    onChange={onChange}
                    autoComplete="country-name"
                    className="w-full focus:ring-white focus:border-b-2 focus:border-b-primary border-b-2 shadow-sm  sm:text-sm border-0 border-b-primary"
                  >
                    <option>Gender</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Non Binary</option>
                  </select>
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

              navigate("../keyword", { replace: false });
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
export default Who;

const TagBox = ({ text, select }: ITagBox) => {
  return (
    <div
      className="bg-primary h-[45px] w-[138px] px-[13px] py-[10px] group hover:cursor-pointer"
      onClick={(e) => {
        select(text);
        e.preventDefault();
      }}
    >
      <p className="text-[20px] leading-[23px] font-normal text-white group-hover:font-medium">
        {text}
      </p>
    </div>
  );
};
