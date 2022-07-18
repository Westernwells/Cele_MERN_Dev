import React, { useState, useEffect } from "react";
import LayoutForm from "../components/layout/LayoutForm";
import { useNavigate } from "react-router-dom";
import Autocomplete from "react-autocomplete";
import type * as CSS from "csstype";
interface ITagBox {
  text: string;
  select: (text: string) => void;
}
interface IOptionFiled {
  value: string;
  label: string;
  genderNeutrality: boolean;
}
const Who: React.FC = () => {
  const [state, setState] = useState({
    who: "Type in to search the option",
    month: "",
    day: "",
    year: "",
    gender: "",
  });
  const [disbleGender, setDisableGender] = useState(true);
  useEffect(() => {
    if (state.who) {
      let who = WhoOption.find((item) => item.value === state.who);
      let Disable = who?.genderNeutrality === true ? false : true;
      if (Disable) {
        setDisableGender(true);
        setState({ ...state, gender: "" });
      } else {
        setState({ ...state, gender: "" });
        setDisableGender(false);
      }
    }
  }, [state.who]);

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
  const WhoOption: Array<IOptionFiled> = [
    // {
    //   value: "",
    //   label: "Type in to search the option",
    //   genderNeutrality: false,
    // },
    { value: "Son", label: "Son", genderNeutrality: false },
    { value: "Mother", label: "Mother", genderNeutrality: false },
    { value: "Wife", label: "Wife", genderNeutrality: false },
    { value: "Daughter", label: "Daughter", genderNeutrality: false },
    { value: "Father", label: "Father", genderNeutrality: false },
    { value: "Brother", label: "Brother", genderNeutrality: false },
    { value: "Sister", label: "Sister", genderNeutrality: false },
    { value: "Friend", label: "Friend", genderNeutrality: true },
    { value: "Husband", label: "Husband", genderNeutrality: false },
    { value: "Niece", label: "Niece", genderNeutrality: false },
    { value: "Coworker", label: "Coworker", genderNeutrality: true },
    { value: "Uncle", label: "Uncle", genderNeutrality: false },
    { value: "Cousin", label: "Cousin", genderNeutrality: true },
    {
      value: "Boss/Supervisor",
      label: "Boss/Supervisor",
      genderNeutrality: true,
    },
    { value: "Nephew", label: "Nephew", genderNeutrality: false },
    {
      value: "In-law(Parents)",
      label: "In-law(Parents)",
      genderNeutrality: true,
    },
    { value: "Aunt", label: "Aunt", genderNeutrality: false },
    {
      value: "Direct Report/Employee",
      label: "Direct Report/Employee",
      genderNeutrality: true,
    },
    { value: "Client", label: "Client", genderNeutrality: true },
    { value: "Grandchild", label: "Grandchild", genderNeutrality: true },
    { value: "In-law(Other)", label: "In-law(Other)", genderNeutrality: true },
    {
      value: "Teacher, Coach, Tutor, Religious Leader, etc.",
      label: "Teacher, Coach, Tutor, Religious Leader, etc.",
      genderNeutrality: true,
    },
    { value: "Girlfriend", label: "Girlfriend", genderNeutrality: false },
    { value: "Grandparents", label: "Grandparents", genderNeutrality: true },
    { value: "Boyfriend", label: "Boyfriend", genderNeutrality: false },
    {
      value: "Other",
      label: "Other",
      genderNeutrality: true,
    },
  ];
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
          <div className="px-[26px] md:px-[52px] w-full">
            {/* row 1 */}
            {/* <div className="md:grid md:grid-cols-12 w-full mb-10 gap-6 items-end">
              <div className="md:col-start-1 md:col-end-6 w-full">
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
                    {WhoOption.map((item, index) => (
                      <option value={item.value} key={index.toString()}>
                        {item.value}
                      </option>
                    ))}
                    <option value="Father">Father</option>
                    <option value="Mother">Mother</option>
                    <option value="Partner">Partner</option>
                  </select>
                </div>
              </div>
              <div className="md:col-start-6 md:col-end-11 mt-2 md:mt-0">
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
            </div> */}
            {/* Test with autocomplter */}
            <div className="md:grid md:grid-cols-12 w-full mb-10 gap-6 items-end">
              <div className="md:col-start-1 md:col-end-6 w-full">
                <p className="text-[25px] leading-[29px] font-semibold">
                  This gift is for whom?
                </p>
                <div className="w-full mt-3 z-50">
                  {/* <Autocomplete
                    className="w-full focus:ring-white focus:border-b-2 focus:border-b-primary border-b-2 shadow-sm  sm:text-sm border-0 border-b-primary"
                    items={[...WhoOption]}
                    shouldItemRender={(item: IOptionFiled, value: string) =>
                      item.value.toLowerCase().indexOf(value.toLowerCase()) > -1
                    }
                    style={{
                      width: "1000px",
                    }}
                    inputProps={{
                      style: {
                        width: "100%",
                        padding: "12px",
                        zIndex: "10000",
                      },
                    }}
                    wrapperStyle={{
                      backgroundColor: "red",
                      width: "100%",
                      borderWidth: "0",
                      borderBottomWidth: "2px",
                      borderColor: "green",
                      boxShadow: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
                      zIndex: "10000",
                    }}
                    menuStyle={{
                      zIndex: "100000",
                      borderRadius: "3px",
                      boxShadow: "0 2px 12px rgba(0, 0, 0, 0.1)",
                      background: "rgba(255, 255, 255, 0.9)",
                      padding: "2px 0",
                      fontSize: "90%",
                      position: "fixed",
                      overflow: "auto",
                      maxHeight: "50%",
                      backgroundColor: "white",
                    }}
                    getItemValue={(item: IOptionFiled) => item.value}
                    renderItem={(
                      item: IOptionFiled,
                      highlighted: boolean,
                      styles: CSS.Properties
                    ) => (
                      <div
                        className="w-full"
                        key={item.value}
                        style={{
                          ...styles,
                          width: "100%",
                          padding: "12px",
                          zIndex: "10000",
                          borderWidth: "0px",
                          border: "0px transparent solid",
                        }}
                      >
                        {item.label}
                      </div>
                    )}
                    value={state.who}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setState({ ...state, who: e.target.value })
                    }
                    onSelect={(value: string) =>
                      setState({ ...state, who: value })
                    }
                  /> */}

                  <select
                    id="who"
                    name="who"
                    value={state.who}
                    onChange={onChange}
                    autoComplete="who"
                    className="w-full focus:ring-white focus:border-b-2 focus:border-b-primary border-b-2 shadow-sm  sm:text-sm border-0 border-b-primary"
                  >
                    <option value={""}>Type in to search the option</option>
                    {WhoOption.map((item, index) => (
                      <option value={item.value} key={index.toString()}>
                        {item.value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="md:col-start-6 md:col-end-11 mt-2 md:mt-0">
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
            <div className="md:grid md:grid-cols-12 w-full mb-10">
              <div className="md:col-start-1 md:col-end-6 w-full">
                <p className="text-[25px] leading-[29px] font-semibold">
                  Birthday:
                </p>
                <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
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
                  <div className="w-full mt-3 md:col-span-2">
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
              {/* <div className="col-start-6 col-end-11"></div> */}
            </div>
            {/* row 3 */}
            <div className="grid grid-cols-12 w-full mb-10">
              <div className="col-start-1 col-end-6 w-full">
                {/* <p className="text-[25px] leading-[29px] font-semibold">
                  Gender?
                </p> */}
                <div className="w-full mt-3">
                  <select
                    disabled={disbleGender}
                    id="gender"
                    name="gender"
                    value={state.gender}
                    onChange={onChange}
                    autoComplete="country-name"
                    className="w-full focus:ring-white focus:border-b-2 focus:border-b-primary border-b-2 shadow-sm  sm:text-sm border-0 border-b-primary z-0"
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
        </div>
        {/* next area */}
        <div
          className=" flex justify-end absolute bottom-0 w-full md:mb-[92px] "
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
