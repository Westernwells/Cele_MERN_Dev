import React from "react";
import FormNav from "./FormNav";
import Navbar from "./Navbar";

interface Layout {
  item?: string;
}
const LayoutForm = ({ children }: React.PropsWithChildren) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <FormNav />
      <div className="flex-1 h-full relative w-full">{children}</div>
    </div>
  );
};
export default LayoutForm;
