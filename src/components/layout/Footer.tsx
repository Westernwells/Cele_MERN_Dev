import React from "react";
import facebookImg from "../../Assets/Facebook.png";
import instagramImg from "../../Assets/Instagram.png";
import twitterImg from "../../Assets/Twitter.png";
import loveimg from "../../Assets/love.png";
import celeStar from "../../Assets/CeleStar.png";
export default function Footer() {
  return (
    <div className="bg-primary  font-raleway pt-[92px] pl-[60px] pr-[60px] md:pl-[131px] md:pr-[122px] pb-[81px]">
      <div className="sm:flex justify-between mb-[90px]">
        <div className="">
          <a href="" className="mb-8 block text-white">
            About
          </a>
          <a href="" className="mb-8 block text-white">
            How Cele works
          </a>
          <a href="" className="mb-8 block text-white">
            Mission
          </a>
          <a href="" className="mb-8 block text-white">
            FAQ
          </a>
        </div>
        <div className="flex gap-[17px]">
          <img src={twitterImg} alt="" className="h-[33px] w-[33px]" />
          <img src={facebookImg} alt="" className="h-[33px] w-[33px]" />
          <img src={instagramImg} alt="" className="h-[33px] w-[33px]" />
        </div>
      </div>
      <hr className="h-0.5 bg-white mb-[30px]" />
      <div className="md:flex justify-between">
        <div className="text-white">
          <p className="">Contact：@cele-app.com</p>
          <p className="">Tele：123-456-7890</p>
          <p className="">
            Cele ® <br /> Copyright © 2022{" "}
          </p>
        </div>
        <div className="mt-[40px]">
          <span className="relative ">
            <p className="font-semibold text-[60px] leading-[70.44px] text-white">
              Cele
            </p>
            <img
              src={celeStar}
              alt=""
              className="absolute -top-6 mr-4 right-0 h-9 w-9"
            />
          </span>
          <p className="font-inter text-white font-medium text-[20px] leading-[24.2px]">
            <span className="flex items-center">
              Send lo<img src={loveimg} className="mt-1 "></img> e, Your way
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

const LoveIcon = () => {
  return <></>;
};
