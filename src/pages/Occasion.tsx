import React, { SetStateAction, useEffect, useState } from "react";
import LayoutForm from "../components/layout/LayoutForm";
import { useNavigate } from "react-router-dom";
import Select, { GroupBase } from "react-select";
import { useAppState } from "../context/AppStateContext";
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
  // genderNeutrality: boolean;
}
const Occasions = ["Birthday", "Mother's Day", "Anniversary"];
interface GroupBaseX<Option> {
  readonly options: readonly (string | GroupBase<string>)[];
  readonly label?: string;
}
type Mapped<T> = {
  readonly [K in keyof T]: string | GroupBase<string>;
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
const OValue: IOptionFiled[] = [
  { value: "Birthday", label: "Birthday" },
  { value: "Christmas", label: "Christmas" },
  { value: "Anniversary", label: "Anniversary" },
  { value: "Mother’s Day", label: "Mother’s Day" },
  { value: "Father’s Day", label: "Father’s Day" },
  { value: "Valentine’s Day", label: "Valentine’s Day" },
  { value: "Hanukkah", label: "Hanukkah" },
  { value: "Bar/Bat Mitzvah", label: "Bar/Bat Mitzvah" },
  { value: "Wedding", label: "Wedding" },
  { value: "Baby Shower", label: "Baby Shower" },
  { value: "Engagement", label: "Engagement" },
  { value: "Housewarming", label: "Housewarming" },
  { value: "Losar", label: "Losar" },
  { value: "Vesak", label: "Vesak" },
  { value: "Dewali", label: "Dewali" },
  { value: "Rakhi", label: "Rakhi" },
  { value: "Corporate Occasion", label: "Corporate Occasion" },
  { value: "Eid al-Fitr", label: "Eid al-Fitr" },
  { value: "Eid al-Adha", label: "Eid al-Adha" },
  { value: "Quinceanera", label: "Quinceanera" },
  { value: "Baisakhi", label: "Baisakhi" },
  { value: "Guru Nanak Jayanti", label: "Guru Nanak Jayanti" },
  { value: "Spring Festival", label: "Spring Festival" },
  { value: "Autumn Festival", label: "Autumn Festival" },
  { value: "Other", label: "Other" },
].sort(function (a, b) {
  if (a.value > b.value) {
    return 1;
  }
  if (b.value > a.value) {
    return -1;
  }
  return 0;
});
const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];
const Occasion: React.FC = () => {
  let navigate = useNavigate();
  const { state: formState, setState: setFormState } = useAppState();
  useEffect(() => {
    setNewState(
      formState.formState.occasion
        ? {
            value: formState.formState.occasion,
            label: formState.formState.occasion,
          }
        : null
    );
  }, [formState.formState.occasion]);
  const [state, setState] = useState<{ occasion: string } | null>({
    occasion: "Type in to search the occasion",
  });
  const [newState, setNewState] = useState<IOptionFiled | null>(null);
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setState({ occasion: e.target.value });
  };

  const handleChange = (option: ValueType<IOptionFiled>) => {
    setNewState(
      option
        ? {
            value: (option as IOptionFiled).value,
            label: (option as IOptionFiled).label,
          }
        : null
    );
    setFormState({
      ...formState,
      formState: {
        ...formState.formState,
        occasion: (option as IOptionFiled).value,
      },
    });
  };
  const setOccasion = (e: string) => {
    setNewState({ value: e, label: e });
    setFormState({
      ...formState,
      formState: {
        ...formState.formState,
        occasion: e,
      },
    });
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
            <div className="md:grid md:grid-cols-12 w-full mb-10 gap-6 items-end">
              <div className="md:col-start-1 md:col-end-6 w-full">
                <p className="text-[25px] leading-[29px] font-semibold">
                  What is the special occasion?
                </p>
                <div className="w-full mt-3">
                  <Select<IOptionFiled>
                    getOptionLabel={(option: IOptionFiled) => option.label}
                    getOptionValue={(option: IOptionFiled) => option.value}
                    value={newState}
                    styles={customStyles}
                    placeholder={"Type in to search the occasion"}
                    options={OValue}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-start-6 col-end-11"></div>
            </div>
            {/* row 2 */}
            <div className="md:grid md:grid-cols-12 w-full mb-10">
              <div className="md:col-start-1 md:col-end-6 w-full">
                <div className="sm:grid grid-cols-2 md:flex md:flex-wrap md:gap-9">
                  {Occasions.map((text, index) => (
                    <TagBox
                      key={index.toString()}
                      text={text}
                      select={setOccasion}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* next area */}
        <div
          className=" flex justify-end absolute bottom-0 w-full md:mb-[92px] "
          onClick={() => {
            window.alert(JSON.stringify(formState.formState));

            navigate("/price", { replace: false });
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
export default Occasion;

const TagBox = ({ text, select }: ITagBox) => {
  return (
    <div
      className="bg-primary min-h-[45px] min-w-[138px] px-[13px] py-[10px] group hover:cursor-pointer hover:bg-green-700 my-2"
      onClick={(e) => select(text)}
    >
      <p className="text-[20px] leading-[23px] font-normal text-white group-hover:font-medium">
        {text}
      </p>
    </div>
  );
};
