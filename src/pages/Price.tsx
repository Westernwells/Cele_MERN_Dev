import React, { useEffect, useState } from "react";
import LayoutForm from "../components/layout/LayoutForm";
import { Range, getTrackBackground } from "react-range";
import { useNavigate } from "react-router-dom";
import { useAppState } from "../context/AppStateContext";
import { MyDialog } from "../components/modal";

const STEP = 5;
const MIN = 5;
const MAX = 1000;
const Price: React.FC<{ rtl: boolean }> = ({ rtl }) => {
  let navigate = useNavigate();
  const { state, setState } = useAppState();
  useEffect(() => {
    setValues([...state.formState.range]);
  }, [state.formState.range]);

  const [values, setValues] = React.useState([5, 1000]);
  let [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <LayoutForm>
        {/* Skip area */}
        <div className="flex  justify-end absolute w-full mt-12">
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
        <div className="min-h-[calc(100vh-300px)] md:min-h-[calc(100vh-200px)] flex flex-col justify-center">
          {/* Content area */}
          <div className="px-4 md:px-[52px] w-full">
            {/* row 1 */}
            <div className="md:grid md:grid-cols-12 w-full mb-10 gap-6 ">
              <div className="md:col-start-1 md:col-end-8 w-full">
                <p className="text-[25px] leading-[29px] font-semibold">
                  What is the ideal price range?
                </p>
                <div className="w-full mt-8  relative h-[50px] px-6 md:px-0">
                  <Range
                    values={values}
                    step={STEP}
                    min={MIN}
                    max={MAX}
                    rtl={rtl}
                    onChange={(values) => {
                      setValues(values);
                      setState({
                        ...state,
                        formState: {
                          ...state.formState,
                          range: values,
                        },
                      });
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
                    <div className="flex items-center">
                      <p className="text-[20px] leading-[23px] font-normal">
                        $
                      </p>
                      <input
                        onChange={(e) => {
                          setValues([Number(e.target.value), values[1]]);
                        }}
                        value={values[0].toFixed(0)}
                        placeholder={"5"}
                        className="w-16 h-6 border-primary border-2 px-1 py-4 text-lg text-center focus:ring-primary focus:outline-primary ml-2"
                      />
                    </div>
                    {/* <p className="text-[20px] leading-[23px] font-normal">
                      {`$ ${values[0].toFixed(1)} - $ ${values[1].toFixed(1)}`}
                    </p> */}
                    <div className="flex items-center">
                      <p className="text-[20px] leading-[23px] font-normal">
                        $
                      </p>
                      <input
                        onChange={(e) => {
                          setValues([values[0], Number(e.target.value)]);
                        }}
                        value={values[1].toFixed(0)}
                        placeholder={"1000"}
                        className="w-16 h-6 border-primary border-2 px-1 py-4 text-lg text-center focus:ring-primary focus:outline-primary ml-2"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-start-6 col-end-11"></div>
            </div>
          </div>
          {/* next area */}
        </div>
        <div
          className=" flex justify-end absolute bottom-0 w-full md:mb-[92px] "
          onClick={() => {
            setIsOpen(true);
            // navigate("/", { replace: false });
          }}
        >
          <div className="bg-primary w-[85%] md:w-[50%] py-4 pl-16 cursor-pointer hover:bg-green-600">
            <p className="text-white font-semibold text-[25px] leading-[29px]">
              Show Me Great Gifts
            </p>
          </div>
        </div>
      </LayoutForm>
      <MyDialog isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
};
export default Price;
