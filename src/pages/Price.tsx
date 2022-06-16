import React, { useState } from "react";
import LayoutForm from "../components/layout/LayoutForm";
import { Range, getTrackBackground } from "react-range";
import { useNavigate } from "react-router-dom";

interface ITagBox {
  text: string;
  select: (text: string) => void;
}
const STEP = 5;
const MIN = 5;
const MAX = 1000;
const Price: React.FC<{ rtl: boolean }> = ({ rtl }) => {
  let navigate = useNavigate();

  const [state, setState] = useState<any>({ values: [50] });
  const [values, setValues] = React.useState([5, 1000]);
  return (
    <div>
      <LayoutForm>
        {/* Skip area */}
        <div className="flex  justify-end absolute w-full">
          <div
            className="group w-[117px] pb-1 border-b-2 border-b-black hover:border-b-primary cursor-pointer"
            onClick={() => {
              navigate("/", { replace: false });
            }}
          >
            <p className="text-[20px] leading-[23px] font-normal group-hover:text-primary">
              Skip
            </p>
          </div>
        </div>
        {/* main area */}
        <div className="min-h-[calc(100vh-200px)] flex flex-col justify-center">
          {/* Content area */}
          <div className="px-[52px] w-full">
            {/* row 1 */}
            <div className="grid grid-cols-12 w-full mb-10 gap-6 items-end">
              <div className="col-start-1 col-end-6 w-full">
                <p className="text-[25px] leading-[29px] font-semibold">
                  What is the ideal price range?
                </p>
                <div className="w-full mt-8  relative h-[50px]">
                  <Range
                    values={values}
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    rtl={rtl}
                    onChange={(values) => {
                      setValues(values);
                    }}
                    renderTrack={({ props, children }) => (
                      <div
                        onMouseDown={props.onMouseDown}
                        onTouchStart={props.onTouchStart}
                        style={{
                          ...props.style,
                          height: "36px",
                          display: "flex",
                          width: "100%",
                        }}
                      >
                        <div
                          ref={props.ref}
                          style={{
                            height: "5px",
                            width: "100%",
                            borderRadius: "4px",
                            background: getTrackBackground({
                              values,
                              colors: ["#548BF4", "#52AA5E", "#548BF4"],
                              min: MIN,
                              max: MAX,
                              rtl,
                            }),
                            alignSelf: "center",
                          }}
                        >
                          {children}
                        </div>
                      </div>
                    )}
                    renderThumb={({ props, isDragged }) => (
                      <div
                        {...props}
                        style={{
                          ...props.style,
                          height: "42px",
                          width: "42px",
                          borderRadius: "50%",
                          backgroundColor: "#52AA5E",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          boxShadow: "0px 2px 6px #AAA",
                        }}
                      ></div>
                    )}
                  />
                  <div className="flex w-full justify-between">
                    <p className="text-[20px] leading-[23px] font-normal">$5</p>
                    <p className="text-[20px] leading-[23px] font-normal">
                      {`$ ${values[0].toFixed(1)} - $ ${values[1].toFixed(1)}`}
                    </p>
                    <p className="text-[20px] leading-[23px] font-normal">
                      $1000
                    </p>
                  </div>

                  {/* <output style={{ marginTop: "30px" }} id="output">
                    {values[0].toFixed(1)} - {values[1].toFixed(1)}
                  </output> */}
                </div>
              </div>
              <div className="col-start-6 col-end-11"></div>
            </div>
          </div>
          {/* next area */}
          <div
            className=" flex justify-end absolute bottom-0 w-full mb-[92px] "
            onClick={() => {
              window.alert(
                `$ ${values[0].toFixed(1)} - $ ${values[1].toFixed(1)}`
              );

              navigate("/", { replace: false });
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
export default Price;

const TagBox = ({ text, select }: ITagBox) => {
  return (
    <div
      className="bg-primary h-[45px] w-[138px] px-[13px] py-[10px]"
      onClick={(e) => select(text)}
    >
      <p className="text-[20px] leading-[23px] font-normal text-white">
        {text}
      </p>
    </div>
  );
};
