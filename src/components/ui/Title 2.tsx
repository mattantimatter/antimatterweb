import React from "react";

type Props = { children: React.ReactNode } & React.ComponentProps<"div">;

const Title = ({ children, ...props }: Props) => {
  return (
    <div className="flex">
      <h2 className="relative text-3xl sm:text-title/tight">
        <div {...props}>
          {children}
          <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent from-30% to-background pointer-events-none"></div>
        </div>
      </h2>
    </div>
  );
};

export default Title;
