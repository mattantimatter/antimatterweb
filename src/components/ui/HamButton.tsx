interface HamButtonProps {
  active: boolean;
}

type Props = HamButtonProps & React.ComponentProps<"div">;

const HamButton = ({ active, ...props }: Props) => {
  return (
    <div {...props} className="md:hidden">
      <div className="w-10 flex flex-col justify-center items-center gap-3 cursor-pointer md:hidden z-50">
        <span
          className={`w-full h-0.5 bg-foreground duration-300 ${
            active && "-rotate-45 translate-y-[7px]"
          }`}
        ></span>
        <span
          className={`w-full h-0.5 bg-foreground duration-300 ${
            active && "rotate-45 -translate-y-[7px]"
          }`}
        ></span>
      </div>
    </div>
  );
};

export default HamButton;
