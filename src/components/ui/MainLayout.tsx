import React, { PropsWithChildren } from "react";

type Props = PropsWithChildren & React.ComponentProps<"div">;

const MainLayout = ({ children, ...props }: Props) => {
  return (
    <div {...props}>
      <div className="relative z-10 flex flex-col mb-40 sm:mb-60 gap-40 sm:gap-80 w-main m-auto">
        {children}
      </div>
    </div>
  );
};

export default MainLayout;
