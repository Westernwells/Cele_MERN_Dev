import React from "react";
import { useMatch, useResolvedPath, useLocation } from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import { classNames } from "../../utils";

// const isActive =()=>[
//   if(){}
// ]
export default function FormNav() {
  let location = useLocation();
  const Menus = [
    { name: "Who", step: "/" },
    {
      name:
        location.pathname === "/keyword" ||
        location.pathname === "/occasion" ||
        location.pathname === "/price"
          ? "Keyword"
          : "",
      step: "/keyword",
    },
    {
      name:
        location.pathname === "/occasion" || location.pathname === "/price"
          ? "Occasion"
          : "",
      step: "/occasion",
    },
    { name: location.pathname === "/price" ? "Budget" : "", step: "/price" },
  ];

  return (
    <div className=" w-full px-[54px] my-4">
      <div className="ml-[164px] flex justify-start gap-6 relative">
        {Menus.map((item, index) => (
          <NavItem
            text={item.name}
            to={item.step}
            key={index.toString()}
            sNo={index}
            isActive={false}
          />
        ))}
      </div>
    </div>
  );
}

interface INavItem {
  sNo: number;
  text?: string;
  isActive: boolean;
}
const NavItem = ({
  sNo,
  text,
  isActive,
  children,
  to,
  ...props
}: INavItem & LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <div
      className={classNames(
        match ? "border-b-green-500" : "border-b-black",
        "w-[154px] border-b-2 pb-3 flex gap-5 relative items-center text-[#050505]"
      )}
    >
      <div className={classNames(match ? "block  active-bg" : "hidden")}></div>
      <p className="z-10 font-normal text-[30px] leading-[35px]">{sNo + 1}.</p>
      <p
        className={classNames(
          match ? "font-medium" : "font-normal",
          "z-10 text-[20px] leading-[23px]"
        )}
      >
        {text}
      </p>
    </div>
  );
};
