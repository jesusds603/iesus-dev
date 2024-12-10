import React, { useState, useEffect } from "react";
import Link from "next/link";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import SidebarLink from "./SidebarLink";

interface SidebarSubItemProps {
  item: {
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
  };
  myLanguage: string;
  myTheme: string;
}

const SidebarSubItem: React.FC<SidebarSubItemProps> = ({
  item,
  myLanguage,
  myTheme,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(window.location.pathname === item.link);
  }, []);

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
        className={`flex items-center py-2 px-4 cursor-pointer ${themeClasses} ${activeClasses}`}
      >
        <Link href={item.link} passHref className="flex items-center w-full">
          <item.icon className="text-base" />
          <span className="mx-2 flex-1">{label}</span>
        </Link>
        {item.submenus &&
          item.submenus.length > 0 &&
          (isExpanded ? (
            <IoIosArrowDown className="text-xl" onClick={toggleExpansion} />
          ) : (
            <IoIosArrowForward className="text-xl" onClick={toggleExpansion} />
          ))}
      </div>
      {isExpanded && item.submenus && item.submenus.length > 0 && (
        <nav className="ml-2 border-l-2 pl-2 rainbow-border">
          {item.submenus.map((submenu) => (
            <SidebarLink
              key={submenu.link}
              href={submenu.link}
              icon={submenu.icon}
              labelEn={submenu.labelEn}
              labelEs={submenu.labelEs}
            />
          ))}
        </nav>
      )}
    </>
  );
};

export default SidebarSubItem;
