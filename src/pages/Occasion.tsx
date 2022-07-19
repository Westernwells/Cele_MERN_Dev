import React, { useState } from "react";
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
  // genderNeutrality: boolean;
}
const Occasions = ["Birthday", "Mother's Day", "Anniversary"];
const Occassions = [
  // { value: "", label: "" },

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
const Occasion: React.FC = () => {
  let navigate = useNavigate();
  const [state, setState] = useState({
    occasion: "Type in to search the occasion",
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
            <div className="md:grid md:grid-cols-12 w-full mb-10 gap-6 items-end">
              <div className="md:col-start-1 md:col-end-6 w-full">
                <p className="text-[25px] leading-[29px] font-semibold">
                  What is the special occasion?
                </p>
                <div className="w-full mt-3">
                  {/* <select
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
                  </select> */}
                  <Autocomplete
                    className="w-full focus:ring-white focus:border-b-2 focus:border-b-primary border-b-2 shadow-sm  sm:text-sm border-0 border-b-primary"
                    items={[...Occassions]}
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
                    value={state.occasion}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setState({ ...state, occasion: e.target.value })
                    }
                    onSelect={(value: string) =>
                      setState({ ...state, occasion: value })
                    }
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
              {/* <div className="col-start-6 col-end-11"></div> */}
            </div>
          </div>
        </div>
        {/* next area */}
        <div
          className=" flex justify-end absolute bottom-0 w-full md:mb-[92px] "
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
