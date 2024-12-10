import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import SidebarSubItem from "./SidebarSubItem";

interface SidebarItemProps {
  item: {
    name: string;
    link: string;
    icon: React.ElementType;
    labelEn: string;
    labelEs: string;
    submenus: Array<{
      name: string;
      link: string;
      icon: React.ElementType;
      labelEn: string;
      labelEs: string;
      submenus?: Array<{
        name: string;
        link: string;
        icon: React.ElementType;
        labelEn: string;
        labelEs: string;
      }>;
    }>;
  };
  myLanguage: string;
  myTheme: string;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  item,
  myLanguage,
  myTheme,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(window.location.pathname === item.link);
  }, [item.link]);

  const themeClasses =
    myTheme === "dark"
      ? "text-white hover:bg-gray-600 hover:text-green-400"
      : "text-black hover:bg-gray-200 hover:text-green-600";

  const activeClasses = isActive ? "bg-green-500" : "";

  const label = myLanguage === "eng" ? item.labelEn : item.labelEs;

  const toggleExpansion = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div
        className={`flex items-center py-3 px-4 cursor-pointer ${themeClasses} ${activeClasses}`}
      >
        <Link href={item.link} passHref className="flex items-center w-full">
          <item.icon className="text-2xl" />
          <span className="mx-4 flex-1">{label}</span>
        </Link>
        {item.submenus.length > 0 &&
          (isExpanded ? (
            <IoIosArrowDown className="text-xl" onClick={toggleExpansion} />
          ) : (
            <IoIosArrowForward className="text-xl" onClick={toggleExpansion} />
          ))}
      </div>
      {isExpanded && item.submenus.length > 0 && (
        <nav className="ml-4 border-l-4 pl-2 rainbow-border">
          {item.submenus.map((submenu) => (
            <SidebarSubItem
              key={submenu.link}
              item={submenu}
              myLanguage={myLanguage}
              myTheme={myTheme}
            />
          ))}
        </nav>
      )}
    </>
  );
};

export default SidebarItem;
