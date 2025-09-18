import React, { PropsWithChildren } from "react";

const Title = ({ children }: PropsWithChildren) => {
  return (
    <h2 className="relative text-title/tight">
      {children}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent from-30% to-background pointer-events-none"></div>
    </h2>
  );
};

export default Title;
