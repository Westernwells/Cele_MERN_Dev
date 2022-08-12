import React from "react";
import SiteLogo from "../../Assets/LogoGroup.png";
export default function Navbar() {
  return (
    <div className="flex justify-between w-full px-[28px] md:px-[54px] border-b-2 border-b-green-500 py-[14px] relative gap-4 md:gap-0 items-center">
      {/* left sside */}
      <div className="flex gap-6">
        <div className="absolute w-[144px] h-[93px] md:w-[164px] md:h-[113px]">
          <img
            src={SiteLogo}
            alt=""
            className="w-[144px] h-[93px]  md:w-[164px] md:h-[113px]"
          />
        </div>
        <div className="flex gap-6 md:block ml-[124px] md:ml-[164px] items-center">
          <a
            href=""
            className="text-[12px] leading-[15px] md:text-[16px] md:leading-[19px] font-semibold   md:mr-[70px]"
          >
            About
          </a>
          <a
            href=""
            className="text-[12px] leading-[15px] md:text-[16px] md:leading-[19px] font-semibold"
          >
            FAQ
          </a>
        </div>
      </div>
      {/* right */}
      <div className="">
        <a
          href=""
          className="text-[12px] leading-[15px] md:text-[16px] md:leading-[19px] font-semibold"
        >
          Login/Signup
        </a>
      </div>
    </div>
  );
}
