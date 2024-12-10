import { useMenu } from "@/hooks/useMenu";
import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import { menuItems } from "./menu-items";
import SidebarItem from "./SidebarItem";

function Sidebar() {
  const { isMenuOpen } = useMenu();
  const { myTheme } = useTheme();
  const { myLanguage } = useLanguage();

  const textClasses = myTheme === "dark" ? "text-white" : "text-black";

  // Definir colores de fondo y gradientes según el tema
  const backgroundFromColor = myTheme === "dark" ? "from-black" : "from-white";

  return (
    <div
      className={`fixed top-[48px] left-0 h-[calc(100vh-48px)] w-[240px]  ${textClasses} transition-transform duration-300 flex flex-col justify-between ${
        isMenuOpen ? "translate-x-0" : "-translate-x-full"
      } z-30`}
    >
      {/* Capas de fondo principal con colores condicionados */}
      <div
        className={`absolute inset-0 w-full h-full bg-gradient-to-b ${backgroundFromColor} to-transparent  opacity-100`}
      ></div>
      <div
        className={`absolute inset-0 w-full h-full bg-gradient-to-br ${
          myTheme === "dark" ? "from-violet-700" : "from-emerald-300"
        } to-teal-400 opacity-20 `}
      ></div>
      <div
        className={`absolute inset-0 w-full h-full bg-gradient-to-bl ${
          myTheme === "dark" ? "from-teal-500" : "from-teal-300"
        } to-purple-700 opacity-10 `}
      ></div>

      {/* Menu de navegación */}
      <nav className="relative flex flex-col justify-between max-h-[calc(100vh-48px-64px-48px-40px)] mt-0 overflow-y-auto">
        {menuItems.map((item) => (
          <SidebarItem
            key={item.link}
            item={item}
            myLanguage={myLanguage}
            myTheme={myTheme}
          />
        ))}
      </nav>
    </div>
  );
}

export default Sidebar;
