import React from "react";
import {
  useMatch,
  useResolvedPath,
  useLocation,
  useNavigate,
} from "react-router-dom";
import type { LinkProps } from "react-router-dom";
import { classNames } from "../../utils";
import { useAppState } from "../../context/AppStateContext";

export default function FormNav() {
  const { state } = useAppState();

  let location = useLocation();
  const Menus = [
    { name: state?.formState.who ? state?.formState.who : "Who", step: "/" },
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
          ? state?.formState.occasion
            ? state?.formState.occasion
            : "Occasion"
          : "",
      step: "/occasion",
    },
    { name: location.pathname === "/price" ? "Budget" : "", step: "/price" },
  ];

  return (
    <div className=" w-full px-4 md:px-[54px] my-4 mx-auto mt-12 mb-6 md:mb-0 md:mt-0">
      <div className="grid grid-cols-2 ml-[20px] md:ml-[164px] md:flex justify-start gap-6 relative">
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
  let navigate = useNavigate();

  return (
    <div
      className={classNames(
        match ? "border-b-green-500" : "border-b-black",
        "w-[154px] border-b-2 pb-3 flex gap-5 relative items-center text-[#050505]"
      )}
    >
      <p className="z-10 font-normal text-[30px] leading-[35px]">{sNo + 1}.</p>
      <div
        onClick={() => navigate(to, { replace: true })}
        className={classNames(
          match ? "font-medium" : "font-normal",
          "z-10 text-[20px] leading-[23px] no-underline cursor-pointer"
        )}
      >
        {text}
      </div>
    </div>
  );
};
