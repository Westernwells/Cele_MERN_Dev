import React from "react";
type MarketPlaceErrorBoxPropType = {
  onSubmit: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};
export default function MarketPlaceErrorBox({
  onSubmit,
  onChange,
  value,
}: MarketPlaceErrorBoxPropType) {
  return (
    <div className="font-raleway lg:grid lg:grid-cols-2 bg-primary pl-[35px] pt-[63.72px] pb-[81.76px] pr-[83.06px]">
      <div className="">
        <div className="h-0.5 bg-white w-[151.71px] mb-8"></div>
        <p className="text-[18px] lg:text-[20px] font-medium leading-[23.48px] lg:leading-[23.48px] w-full lg:w-[409px] text-white">
          We are so sorry!
          <br />
          Our system is not providing the best gift options for you and we want
          to recaliber
          <br />
          <br /> However, we are dedicated to finding you to right gift.
          <br />
          <br /> Please enter your email and we will notify you of personalized
          gift recommendations once our system is back up and working.
        </p>
      </div>
      <div className="flex flex-col justify-center mt-6 lg:mt-0">
        <input
          value={value}
          type="text"
          className="border-0 border-b-white bg-primary border-b-2 w-[250px] text-white placeholder:text-white"
          placeholder="Email"
          onKeyDown={onSubmit}
          onChange={onChange}
        />
        <p className="text-base font-light leading-[18.78px] w-[295.75px] text-white mt-[13.68px]">
          We will send you a list of recommendations within 48 hours
        </p>
      </div>
    </div>
  );
}
