import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";
import Select from "react-select";
import LayoutForm from "../components/layout/LayoutForm";
import { IOptionField, OccasionsWithDate, OptionFieldOptions } from "../Data";
import DatePicker from "react-datepicker";
import moment from "moment";
export type OptionsType<OptionType> = OptionType[];

export type ValueType<OptionType> =
  | OptionType
  | OptionsType<OptionType>
  | null
  | undefined;

const Occasions = ["Birthday", "Mother's Day", "Anniversary"];
const customStyles = {
  indicatorsContainer: (provided: any, state: any) => ({
    ...provided,
    display: "hidden",
  }),
  indicatorSeparator: (provided: any, state: any) => ({
    ...provided,
    display: "hidden",
  }),
  singleValue: (provided: any, state: any) => ({
    ...provided,
    color: "white",
  }),
  placeholder: (provided: any, state: any) => ({
    ...provided,
    color: "white",
  }),
  control: (provided: any, state: any) => ({
    ...provided,
    border: "solid 0 transparent",
    borderRadius: "0",
    borderBottom: "white solid 2px",
    backgroundColor: "transparent",
  }),
};
export type OccasionAndDate = {
  occasion: string;
  date: Date | null | undefined;
};
export default function SavedProfile() {
  let navigate = useNavigate();
  const [startDate, setStartDate] = useState(new Date());
  const { state: formState, setState: setFormState } = useAppState();
  const [otherOccasions, setOtherOccasions] = useState<OccasionAndDate[]>([
    { occasion: "Select Occasion", date: null },
  ]);
  useEffect(() => {
    setNewState(
      formState.formState.otherOccasion
        ? {
            value: formState.formState.otherOccasion,
            label: formState.formState.otherOccasion,
          }
        : null
    );
  }, [formState.formState.otherOccasion]);
  const [state, setState] = useState<{ otherOccasion: string } | null>({
    otherOccasion: "Type in to search the occasion",
  });
  const [newState, setNewState] = useState<IOptionField | null>(null);
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setState({ otherOccasion: e.target.value });
  };

  const setOccasion = (e: string) => {
    setNewState({ value: e, label: e });
    setFormState({
      ...formState,
      formState: {
        ...formState.formState,
        otherOccasion: e,
      },
    });
  };
  const onProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // setNewState({ value: e, label: e });
    setFormState({
      ...formState,
      formState: {
        ...formState.formState,
        profileName: e.target.value,
      },
    });
  };
  const saveProfile = () => {
    setFormState({
      ...formState,
      formState: {
        ...formState.formState,
        isProfileSaved: true,
      },
    });
  };
  // add mre occasion actions
  const handleChange = (option: ValueType<IOptionField>, index: number) => {
    // setNewState(
    //   option
    //     ? {
    //         value: (option as IOptionField).value,
    //         label: (option as IOptionField).label,
    //       }
    //     : null
    // );
    // setFormState({
    //   ...formState,
    //   formState: {
    //     ...formState.formState,
    //     otherOccasion: (option as IOptionField).value,
    //   },
    // });
    setSelectedOccasion((option as IOptionField).value, index);
    // setting the date
    let selOccasion = OccasionsWithDate.find(
      (item) => item.occasion === (option as IOptionField).value
    );
    if (
      selOccasion !== undefined &&
      typeof selOccasion?.dates !== "undefined" &&
      selOccasion.dates?.length > 0
    ) {
      setStartDate(dateSelected(selOccasion?.dates));
      setSelectedDate(dateSelected(selOccasion?.dates), index);
    } else {
      console.log("Occasion selected odes not have date");
      setSelectedDate(null, index);
    }
  };
  const dateSelected = (dates: Array<string>) => {
    let selectedDate: any = [];
    dates.forEach((date) => {
      const DateX = moment(date, "DD-MM-YYYY hh:mm:ss").format("X");
      const DateY = moment(Date.now()).format("X");

      console.log(DateX, DateY);
      if (DateX >= DateY) {
        const DateZ = moment(date, "DD-MM-YYYY hh:mm:ss").toISOString();
        selectedDate.push(new Date(DateZ));
      }
      // const NowDate = moment().format("X");
    });
    return selectedDate[0] ? selectedDate[0] : Date.now();
  };

  const addOccasionItem = () => {
    setFormState({
      ...formState,
      formState: {
        ...formState.formState,
        otherOccasions: [
          ...formState.formState.otherOccasions,
          { occasion: "Select Occasion", date: null },
        ],
      },
    });
  };

  const setSelectedDate = (date: Date | null | undefined, index: number) => {
    // let newModOccasions = otherOccasions;
    let newModOccasions = formState.formState.otherOccasions;

    newModOccasions[index].date = date;
    // setOtherOccasions([...newModOccasions]);
    setFormState({
      ...formState,
      formState: {
        ...formState.formState,
        otherOccasions: [...newModOccasions],
      },
    });
  };

  const setSelectedOccasion = (occasion: string, index: number) => {
    let newModOccasions = formState.formState.otherOccasions;
    newModOccasions[index].occasion = occasion;
    // setOtherOccasions([...newModOccasions]);

    setFormState({
      ...formState,
      formState: {
        ...formState.formState,
        otherOccasions: [...newModOccasions],
      },
    });
  };
  const ExampleCustomInput = React.forwardRef(
    ({ value, onClick }: any, ref: any) => (
      <div
        className="bg-transparent text-white h-8 -py-1 mt-2 w-[100px] border-b-2 border-b-white"
        onClick={onClick}
        ref={ref}
      >
        {value}
      </div>
    )
  );

  return (
    <div className="">
      <LayoutForm>
        <div className="min-h-[calc(100vh-250px)] md:min-h-[calc(100vh-200px)] flex items-center w-full font-raleway">
          <div className="ml-[28px] md:ml-[54px] bg-primary pl-[24px] md:pl-[89px] pt-[78px] pb-[48px] pr-[24px] md:pr-[29px] mt-[100px] mr-[28px] md:mr-0 w-full">
            <div className="lg:grid grid-cols-12 lg:gap-8">
              <div className="lg:col-start-1 lg:col-end-5">
                <p className="mb-[34px] md:mb-[68px] font-semibold text-[20px] leading-[23.48px] text-white w-[297px]">
                  Name this profile and add it to your Fam
                </p>
                <input
                  type="text"
                  className="min-w-[300px] border-0 border-b-2 border-b-white pb-2 bg-primary text-white placeholder:text-gray-200 outline-hidden ring-0 focus:border-b-white focus:outline-none"
                  placeholder="Type profile name here"
                  onChange={onProfileChange}
                  value={formState.formState.profileName}
                />
              </div>
              <div className="lg:col-start-5 lg:col-end-13 lg:mr-[123px] mt-16 lg:mt-0">
                <p className="mb-[34px] lg:mb-[68px] font-semibold text-[20px] leading-[23.48px] text-white w-full  lg:w-[209px]">
                  Add other occasions you may buy a gift for
                </p>
                <div className="w-full mt-3 flex items-end gap-2">
                  <div
                    className="h-[23px] lg:h-[46px] w-[23px] lg:w-[46px] rounded-full border-white border-2 flex justify-center items-center text-white"
                    onClick={addOccasionItem}
                  >
                    +
                  </div>
                  <div className="">
                    {formState.formState.otherOccasions &&
                      formState.formState.otherOccasions.map(
                        (item: OccasionAndDate, index: number) => (
                          <div
                            className="w-full grid grid-cols-3 gap-2 items-end h-12"
                            key={index}
                          >
                            <Select<IOptionField>
                              getOptionLabel={(option: IOptionField) =>
                                option.label
                              }
                              getOptionValue={(option: IOptionField) =>
                                option.value
                              }
                              value={
                                formState.formState.otherOccasions[index]
                                  .occasion
                                  ? {
                                      label:
                                        formState.formState.otherOccasions[
                                          index
                                        ].occasion,
                                      value:
                                        formState.formState.otherOccasions[
                                          index
                                        ].occasion,
                                    }
                                  : null
                              }
                              styles={customStyles}
                              placeholder={"Type in to search the occasion"}
                              options={OptionFieldOptions}
                              onChange={(option) => handleChange(option, index)}
                              className="col-start-1 col-end-3 w-full "
                            />
                            <DatePicker
                              className="col-start-3 col-end-4 w-full "
                              selected={
                                formState.formState.otherOccasions[index].date
                              }
                              onChange={(date: Date) => {
                                setSelectedDate(date, index);
                              }}
                              customInput={<ExampleCustomInput />}
                            />
                          </div>
                        )
                      )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center lg:justify-between mt-[75px] flex-col lg:flex-row gap-4">
              <button
                className="w-[312px] h-[42px] bg-white text-primary text-center order-1 lg:order-0 mx-auto lg:mx-0"
                onClick={() => {
                  saveProfile();
                  navigate("/rec", { replace: false });
                }}
              >
                See{" "}
                {formState.formState.who ? formState.formState.who : "Mother"}’s
                Gifts!
              </button>
              <button
                className="w-[312px] h-[42px] bg-white text-primary text-center order-0 lg:order-1 mx-auto lg:mx-0"
                onClick={() => navigate("/rec", { replace: false })}
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      </LayoutForm>
    </div>
  );
}
