import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";

const SidebarLink = ({
  href,
  icon: Icon,
  labelEn,
  labelEs,
}: {
  href: string;
  icon: React.ElementType;
  labelEn: string;
  labelEs: string;
}) => {
  const { myTheme } = useTheme();
  const { isLanguageEng } = useLanguage();
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(window.location.pathname === href);
  }, []);

  const themeClasses =
    myTheme === "dark"
      ? "text-white hover:bg-gray-600 hover:text-green-400"
      : "text-black hover:bg-gray-200 hover:text-green-600";

  const activeClasses = isActive ? "bg-green-500" : "";

  const label = isLanguageEng ? labelEn : labelEs;

  return (
    <Link
      href={href}
      passHref
      className={`flex items-center py-2 px-4 ${themeClasses} ${activeClasses}`}
    >
      <Icon className="text-base" />
      <span className="mx-2">{label}</span>
    </Link>
  );
};

export default SidebarLink;
