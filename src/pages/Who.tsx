import React, { useState, useEffect } from "react";
import LayoutForm from "../components/layout/LayoutForm";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";
import Select from "react-select";
export type OptionsType<OptionType> = OptionType[];

export type ValueType<OptionType> =
  | OptionType
  | OptionsType<OptionType>
  | null
  | undefined;

interface ITagBox {
  text: string;
  select: (text: string) => void;
}
interface IOptionFiled {
  value: string;
  label: string;
  genderNeutrality: boolean;
  gender?: string;
}
interface IOptionFiled {
  value: string;
  label: string;
  // genderNeutrality: boolean;
}
const Who: React.FC = () => {
  const { state, setState } = useAppState();

  const [disbleGender, setDisableGender] = useState(true);
  const [newState, setNewState] = useState<IOptionFiled | null>(null);

  useEffect(() => {
    if (state.formState.who) {
      let who = WhoOption.find(
        (item) => item.value === state.formState.who
      ) || { value: "", label: "", genderNeutrality: true };
      setNewState({
        value: who?.value,
        genderNeutrality: who?.genderNeutrality,
        label: who?.label,
      });
      let Disable = who?.genderNeutrality === true ? false : true;
      if (Disable) {
        setDisableGender(true);
        setState({
          ...state,
          formState: { ...state.formState, gender: who?.gender },
        });
      } else {
        setState({ ...state, formState: { ...state.formState, gender: "" } });
        setDisableGender(false);
      }
    }
  }, [state.formState.who]);

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
  const Whos = ["Father", "Mother", "Wife"];
  const WhoOption: Array<IOptionFiled> = [
    { value: "Son", label: "Son", genderNeutrality: false, gender: "Male" },
    {
      value: "Mother",
      label: "Mother",
      genderNeutrality: false,
      gender: "Female",
    },
    { value: "Wife", label: "Wife", genderNeutrality: false, gender: "Female" },
    {
      value: "Daughter",
      label: "Daughter",
      genderNeutrality: false,
      gender: "Female",
    },
    {
      value: "Father",
      label: "Father",
      genderNeutrality: false,
      gender: "Male",
    },
    {
      value: "Brother",
      label: "Brother",
      genderNeutrality: false,
      gender: "Male",
    },
    {
      value: "Sister",
      label: "Sister",
      genderNeutrality: false,
      gender: "Female",
    },
    { value: "Friend", label: "Friend", genderNeutrality: true },
    {
      value: "Husband",
      label: "Husband",
      genderNeutrality: false,
      gender: "Male",
    },
    {
      value: "Niece",
      label: "Niece",
      genderNeutrality: false,
      gender: "Female",
    },
    { value: "Coworker", label: "Coworker", genderNeutrality: true },
    { value: "Uncle", label: "Uncle", genderNeutrality: false, gender: "Male" },
    { value: "Cousin", label: "Cousin", genderNeutrality: true },
    {
      value: "Boss/Supervisor",
      label: "Boss/Supervisor",
      genderNeutrality: true,
    },
    {
      value: "Nephew",
      label: "Nephew",
      genderNeutrality: false,
      gender: "Male",
    },
    {
      value: "In-law(Parents)",
      label: "In-law(Parents)",
      genderNeutrality: true,
    },
    { value: "Aunt", label: "Aunt", genderNeutrality: false, gender: "Female" },
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
    {
      value: "Girlfriend",
      label: "Girlfriend",
      genderNeutrality: false,
      gender: "Female",
    },
    { value: "Grandparents", label: "Grandparents", genderNeutrality: true },
    {
      value: "Boyfriend",
      label: "Boyfriend",
      genderNeutrality: false,
      gender: "Male",
    },
    {
      value: "Other",
      label: "Other",
      genderNeutrality: true,
    },
  ];
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setState({
      ...state,
      formState: { ...state.formState, [e.target.name]: e.target.value },
    });
  };
  const setWho = (e: string) => {
    setState({ ...state, formState: { ...state.formState, who: e } });
  };
  let navigate = useNavigate();

  const handleChange = (option: ValueType<IOptionFiled>) => {
    setNewState(
      option
        ? {
            value: (option as IOptionFiled).value,
            label: (option as IOptionFiled).label,
            genderNeutrality: (option as IOptionFiled).genderNeutrality,
          }
        : null
    );
    setState({
      ...state,
      formState: {
        ...state.formState,
        who: (option as IOptionFiled).value,
      },
    });
  };
  const customStyles = {
    indicatorsContainer: (provided: any, state: any) => ({
      ...provided,
      display: "hidden",
    }),
    indicatorSeparator: (provided: any, state: any) => ({
      ...provided,
      display: "hidden",
    }),
  };
  return (
    <div>
      <LayoutForm>
        {/* Skip area */}
        <div className="flex  justify-end absolute w-full mt-12">
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

            {/* Test with autocomplter */}
            <div className="md:grid md:grid-cols-12 w-full mb-10 gap-6 items-end">
              <div className="md:col-start-1 md:col-end-6 w-full">
                <p className="text-[25px] leading-[29px] font-semibold">
                  Who are you buying for?
                </p>
                <div className="w-full mt-3 z-50">
                  <Select<IOptionFiled>
                    getOptionLabel={(option: IOptionFiled) => option.label}
                    getOptionValue={(option: IOptionFiled) => option.value}
                    value={newState}
                    styles={customStyles}
                    placeholder={"Type in to search the option"}
                    options={WhoOption}
                    onChange={handleChange}
                  />
                  {/* <select
                    id="who"
                    name="who"
                    value={state.formState.who}
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
                  </select> */}
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
                      value={state.formState.month}
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
                      value={state.formState.day}
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
                      value={state.formState.year}
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
                <div className="w-full mt-3">
                  <select
                    disabled={disbleGender}
                    id="gender"
                    name="gender"
                    value={state.formState.gender}
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
