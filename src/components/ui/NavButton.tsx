import { GoArrowUpRight } from "react-icons/go";
import styles from "./css/NavButton.module.css";

const NavButton = () => {
  return (
    <button
      type="button"
      className={`border border-foreground/40 font-medium bg-background/20 backdrop-blur-xl cursor-pointer p-1 h-12 rounded-full ${styles.button} hover:scale-105 duration-300 text-sm font-extralight`}
    >
      <div className="relative pl-5 pr-18 flex items-center  h-full">
        Start Your project
        <div
          className={`bg-foreground max-w-14 h-full rounded-full text-background flex 
        items-center justify-center ${styles.iconBox}`}
        >
          <GoArrowUpRight className={`size-7 ${styles.icon}`} />
        </div>
      </div>
    </button>
  );
};

export default NavButton;
