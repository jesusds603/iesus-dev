import { useMenu } from "@/hooks/useMenu";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import { menuItems } from "./menu-items";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  const { isMenuOpen } = useMenu();
  const { myTheme } = useTheme();
  const { myLanguage } = useLanguage();

  const isDark = myTheme === "dark";

  return (
    <div
      className={`
        fixed top-[60px] left-0 h-[calc(100vh-60px)] w-[280px] 
        transition-transform duration-300 flex flex-col justify-between z-40
        ${isMenuOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      {/* Fondo futurista */}
      <div className="absolute inset-0 overflow-hidden rounded-r-3xl">
        <div
          className={`absolute inset-0 w-full h-full ${
            isDark
              ? "bg-gradient-to-br from-gray-900 via-purple-900/20 to-cyan-900/10"
              : "bg-gradient-to-br from-white via-blue-50/40 to-purple-50/30"
          }`}
        ></div>

        <div className={`absolute inset-0 w-full h-full bg-noise ${isDark ? "opacity-[0.02]" : "opacity-[0.01]"}`}></div>
        <div className={`absolute inset-0 w-full h-full ${isDark ? "bg-grid-sidebar-dark" : "bg-grid-sidebar-light"}`}></div>

        <div
          className={`absolute inset-0 rounded-r-3xl border-r ${
            isDark
              ? "border-cyan-500/30 shadow-glow-sidebar"
              : "border-blue-500/20 shadow-glow-sidebar-light"
          }`}
        ></div>
      </div>

      {/* Encabezado de la sidebar */}
      <div className="relative p-6 border-b border-white/10">
        <h2 className={`text-lg font-bold ${
          isDark 
            ? "text-transparent bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text" 
            : "text-transparent bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text"
        }`}>
          {myLanguage === "eng" ? "Navigation" : "Navegación"}
        </h2>
        <div className={`w-12 h-0.5 mt-2 ${
          isDark 
            ? "bg-gradient-to-r from-cyan-400 to-purple-400" 
            : "bg-gradient-to-r from-blue-400 to-purple-400"
        }`}></div>
      </div>

      {/* Menu de navegación */}
      <nav className="relative flex-1 overflow-y-auto custom-scrollbar">
        <div className="p-4 space-y-1">
          {menuItems.map((item, index) => (
            <SidebarItem
              key={item.link}
              item={item}
              myLanguage={myLanguage}
              myTheme={myTheme}
              index={index}
            />
          ))}
        </div>
      </nav>

      {/* Footer de la sidebar */}
      <div className="relative p-4 border-t border-white/10">
        <div className={`text-center text-sm ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}>
          {myLanguage === "eng" ? "Future Navigation" : "Navegación Futurista"}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;