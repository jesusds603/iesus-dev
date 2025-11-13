import CategoryNode from "./CategoryNode";
import { Project } from "./ProjectNode";

// Define interface for the main projects data
interface ProjectsData {
  labelEn: string;
  labelEs: string;
  submenus: Category[];
}

interface Category {
  name: string;
  labelEn: string;
  labelEs: string;
  submenus: Project[];
}

interface ProjectTreeProps {
  projects: ProjectsData;
  myLanguage: string;
  myTheme: string;
}

const ProjectTree: React.FC<ProjectTreeProps> = ({ 
  projects, 
  myLanguage, 
  myTheme 
}) => {
  if (!projects) return null;

  const isDark = myTheme === "dark";

  return (
    <div className="w-full max-w-4xl">
      {/* Nodo raíz - Projects */}
      <div className={`text-center mb-8 p-6 rounded-2xl border-2 ${
        isDark 
          ? "border-cyan-500/30 bg-gray-800/50" 
          : "border-blue-500/30 bg-white/50"
      }`}>
        <div className={`text-2xl font-bold mb-2 ${
          isDark ? "text-cyan-400" : "text-blue-600"
        }`}>
          {myLanguage === "eng" ? projects.labelEn : projects.labelEs}
        </div>
        <div className={`text-sm ${
          isDark ? "text-gray-400" : "text-gray-600"
        }`}>
          {myLanguage === "eng" ? "Main Categories" : "Categorías Principales"}
        </div>
      </div>

      {/* Línea vertical desde el nodo raíz */}
      <div className="flex justify-center mb-8">
        <div className={`w-1 h-8 ${
          isDark ? "bg-cyan-500/30" : "bg-blue-500/30"
        }`}></div>
      </div>

      {/* Categorías principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {projects.submenus.map((category: Category) => (
          <CategoryNode 
            key={category.name}
            category={category}
            myLanguage={myLanguage}
            myTheme={myTheme}
          />
        ))}
      </div>
    </div>
  );
};

export default ProjectTree;