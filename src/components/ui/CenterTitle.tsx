import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren & React.ComponentProps<"h2">;

const CenterTitle = ({ children, ...props }: Props) => {
  return (
    <div className="relative text-3xl sm:text-title">
      <div
        className="absolute left-0 top-1/2 -translate-y-1/2 bg-radial from-transparent 
          to-background w-full h-[calc(100%+30px)] from-10%  to-90%"
      ></div>
      <h2 {...props}>{children}</h2>
    </div>
  );
};

export default CenterTitle;
