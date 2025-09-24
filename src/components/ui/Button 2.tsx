"use client";
import { MouseEvent, PropsWithChildren } from "react";
import styles from "./css/Button.module.css";

const Button = ({ children }: PropsWithChildren) => {
  function handleMouseMove(e: MouseEvent<HTMLButtonElement>) {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--reflextX", `${(e.clientX - rect.left) * 0.7}px`);
  }

  return (
    <button
      type="button"
      className={styles.button}
      onMouseMove={handleMouseMove}
    >
      {children}
    </button>
  );
};

export default Button;
