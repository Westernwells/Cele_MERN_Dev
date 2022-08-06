import React from "react";
import FormNav from "./FormNav";
import Navbar from "./Navbar";

interface Layout {
  item?: string;
  withFormNav?: boolean;
}
const LayoutForm = ({
  children,
  withFormNav,
}: React.PropsWithChildren & Layout) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      {withFormNav && <FormNav />}
      <div className="flex-1 h-full relative w-full">{children}</div>
    </div>
  );
};
export default LayoutForm;
