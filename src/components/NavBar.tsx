"use client";
import Image from "next/image";
import Link from "next/link";
// import React, { useEffect } from "react";
import NavButton from "./ui/NavButton";
import NavLinksBg from "./ui/NavLinksBg";
import { useLoading } from "@/store";
import { motion } from "motion/react";
import { usePathname } from "next/navigation";

const NavData = [
  { href: "/", text: "Home" },
  { href: "/case-study/clinixAI", text: "Work" },
  { href: "/", text: "Services" },
  // { href: "/", text: "Company" },
  { href: "/", text: "Contact" },
  // { href: "/", text: "Blog" },
];

const NavBar = () => {
  const finished = useLoading((s) => s.finished);
  const path = usePathname();

  // useEffect(() => {
  //   if (path !== "/") {
  //     // document.body.style.overflowY = "auto";
  //   }
  // }, []);

  if (path === "/") {
    if (!finished) return null;
  }
  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.8, ease: "anticipate" }}
      className="fixed top-0 z-50 py-5 left-0 w-full"
      id="header"
    >
      <div className="w-main mx-auto relative z-20 ">
        <div className="flex justify-between items-center">
          <Link href={"/"}>
            <Image
              src="/images/AnitimatterAI-Logo.png"
              width={152}
              height={20}
              alt="Antimatter AI Logo"
              priority
              loading="eager"
              className="w-32 lg:w-38 h-auto"
            />
          </Link>
          <nav className="hidden md:block">
            <ul className="flex text-sm" id="nav-links">
              {NavData.map((nav) => (
                <li key={nav.text}>
                  <Link href={nav.href} className="px-4 lg:px-7 py-1.5 flex">
                    {nav.text}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <NavButton className="hidden md:block" />
        </div>
      </div>
      <NavLinksBg />
    </motion.header>
  );
};

export default NavBar;
