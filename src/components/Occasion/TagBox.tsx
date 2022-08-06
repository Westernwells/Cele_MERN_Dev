import React from "react";

interface ITagBox {
  text: string;
  select: (text: string) => void;
  color?: string;
  bgColor?: string;
}

export const TagBox = ({
  text,
  select,
  color = "white",
  bgColor = "#52AA5E",
}: ITagBox) => {
  return (
    <div
      style={{ backgroundColor: bgColor }}
      className="bg-primary min-h-[45px] min-w-[138px] px-[13px] py-[10px] group hover:cursor-pointer hover:bg-green-700 my-2"
      onClick={(e) => select(text)}
    >
      <p
        style={{ color: color }}
        className="text-[20px] leading-[23px] font-normal text-white group-hover:font-medium"
      >
        {text}
      </p>
    </div>
  );
};
