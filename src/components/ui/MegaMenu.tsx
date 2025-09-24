"use client";
import React from "react";

export interface MegaMenuLink {
  title: string;
  desc: string;
  href: string;
  icon?: React.ReactNode;
}

export interface MegaMenuColumn {
  heading: string;
  links: MegaMenuLink[];
}

interface MegaMenuProps {
  isOpen: boolean;
  columns: MegaMenuColumn[];
}

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, columns }) => {
  if (!isOpen) return null;
  return (
    <div
      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[920px] max-w-[92vw] rounded-2xl border border-zinc-700 bg-background shadow-2xl z-50"
      role="menu"
      aria-label="Services menu"
    >
      <div className="grid grid-cols-3 gap-8 p-6">
        {columns.map((col, ci) => (
          <div key={ci} className="flex flex-col gap-3">
            <h4 className="text-sm uppercase tracking-wide text-foreground/60">{col.heading}</h4>
            <ul className="flex flex-col">
              {col.links.map((link, li) => (
                <li key={li}>
                  <a
                    href={link.href}
                    className="flex gap-3 items-start rounded-lg px-3 py-3 hover:bg-zinc-800/50 transition"
                  >
                    <span className="mt-0.5 text-foreground/90">{link.icon}</span>
                    <span className="flex flex-col">
                      <span className="text-sm font-medium">{link.title}</span>
                      <span className="text-xs text-foreground/70 leading-snug">{link.desc}</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MegaMenu;


