import React from "react";
import SiteLogo from "../../Assets/LogoGroup.png";
export default function Navbar() {
  return (
    <div className="flex justify-between w-full px-[54px] border-b-2 border-b-green-500 py-[14px] relative">
      {/* left sside */}
      <div className="flex gap-6">
        <div className="absolute w-[164px] h-[113px]">
          <img src={SiteLogo} alt="" className="w-[164px] h-[113px]" />
        </div>
        <div className="ml-[164px]">
          <a
            href=""
            className="text-[16px] leading-[19px] font-semibold mr-[70px]"
          >
            About
          </a>
          <a href="" className="text-[16px] leading-[19px] font-semibold">
            FAQ
          </a>
        </div>
      </div>
      {/* right */}
      <div className="">
        <a href="" className="text-[16px] leading-[19px] font-semibold">
          Login/Signup
        </a>
      </div>
    </div>
  );
}
