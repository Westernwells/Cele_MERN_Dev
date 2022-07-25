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
      disabled:
        location.pathname === "/keyword" ||
        location.pathname === "/occasion" ||
        location.pathname === "/price"
          ? false
          : true,
    },
    {
      name:
        location.pathname === "/occasion" || location.pathname === "/price"
          ? state?.formState.occasion
            ? state?.formState.occasion
            : "Occasion"
          : "",
      step: "/occasion",
      disabled:
        location.pathname === "/occasion" || location.pathname === "/price"
          ? false
          : true,
    },
    {
      name: location.pathname === "/price" ? "Budget" : "",
      step: "/price",
      disabled: location.pathname === "/price" ? false : true,
    },
  ];
  const MenusV2 = [
    {
      name: state?.formState.who ? state?.formState.who : "Who",
      step: "/",
      disabled: false,
    },
    {
      name: "Keyword",
      step: "/keyword",
      disabled:
        location.pathname === "/keyword" ||
        location.pathname === "/occasion" ||
        location.pathname === "/price"
          ? false
          : true,
    },
    {
      name: state?.formState.occasion ? state?.formState.occasion : "Occasion",
      step: "/occasion",
      disabled:
        location.pathname === "/occasion" || location.pathname === "/price"
          ? false
          : true,
    },
    {
      name: "Budget",
      step: "/price",
      disabled: location.pathname === "/price" ? false : true,
    },
  ];
  return (
    <div className=" w-full px-4 md:px-[54px] my-4 mx-auto mt-12 mb-6 md:mb-0 md:mt-0">
      <div className="grid grid-cols-2 ml-[20px] md:ml-[164px] md:flex justify-start gap-6 relative">
        {MenusV2.map((item, index) => (
          <NavItem
            text={item.name}
            to={item.step}
            key={index.toString()}
            sNo={index}
            isActive={false}
            disabled={item.disabled}
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
  disabled: boolean;
}
const NavItem = ({
  sNo,
  text,
  isActive,
  children,
  to,
  disabled,
  ...props
}: INavItem & LinkProps) => {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });
  let navigate = useNavigate();

  return (
    <div
      className={classNames(
        match ? "border-b-green-500" : "border-b-black",
        "w-[154px] md:w-[250px] border-b-2 pb-3 flex gap-5 relative items-center text-[#050505]"
      )}
    >
      <p className="z-10 font-normal text-[30px] leading-[35px]">{sNo + 1}.</p>
      <div
        role={"button"}
        aria-disabled={disabled}
        onClick={() => {
          if (!disabled) {
            navigate(to, { replace: true });
          }
        }}
        className={classNames(
          match ? "font-medium text-black" : "font-normal text-gray-700",
          disabled ? "cursor-not-allowed" : "cursor-pointer",
          "z-10 text-[20px] leading-[23px] no-underline"
        )}
      >
        {text}
      </div>
    </div>
  );
};
