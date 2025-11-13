import ProjectNode, { Project } from "./ProjectNode";

// Define interfaces for the category and project data

interface Category {
  labelEn: string;
  labelEs: string;
  submenus: Project[];
}

interface CategoryNodeProps {
  category: Category;
  myLanguage: string;
  myTheme: string;
}

const CategoryNode: React.FC<CategoryNodeProps> = ({ 
  category, 
  myLanguage, 
  myTheme 
}) => {
  const isDark = myTheme === "dark";
  const hasSubmenus = category.submenus && category.submenus.length > 0;

  return (
    <div className="text-center">
      {/* Nodo de categoría */}
      <div className={`p-4 rounded-xl border ${
        isDark 
          ? "border-purple-500/30 bg-gray-800/30" 
          : "border-purple-500/20 bg-white/30"
      }`}>
        <div className={`text-lg font-semibold mb-2 ${
          isDark ? "text-purple-400" : "text-purple-600"
        }`}>
          {myLanguage === "eng" ? category.labelEn : category.labelEs}
        </div>
        
        {/* Línea vertical debajo de la categoría */}
        {hasSubmenus && (
          <div className="flex justify-center mt-3">
            <div className={`w-1 h-4 ${
              isDark ? "bg-purple-500/30" : "bg-purple-500/30"
            }`}></div>
          </div>
        )}
      </div>

      {/* Líneas horizontales a los proyectos */}
      {hasSubmenus && (
        <div className="mt-4 space-y-3">
          {category.submenus.map((project: Project, projectIndex: number) => (
            <ProjectNode 
              key={project.name}
              project={project}
              myLanguage={myLanguage}
              myTheme={myTheme}
              projectIndex={projectIndex}
              totalProjects={category.submenus.length}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryNode;