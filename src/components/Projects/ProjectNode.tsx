import Link from "next/link";
import { IconType } from "react-icons";

// Define interfaces for the project data
export interface Project {
  name: string;
  labelEn: string;
  labelEs: string;
  descriptionEn?: string;
  descriptionEs?: string;
  url?: string;
  link: string;
  icon: IconType;
  technologies?: string[];
  submenus?: Project[];
}

interface ProjectNodeProps {
  project: Project;
  myLanguage: string;
  myTheme: string;
  projectIndex: number;
  totalProjects: number;
}

const ProjectNode: React.FC<ProjectNodeProps> = ({ 
  project, 
  myLanguage, 
  myTheme, 
  projectIndex, 
  totalProjects 
}) => {
  const isDark = myTheme === "dark";
  const isNavigable = project.link !== "#" && (!project.submenus || project.submenus.length === 0);

  const nodeContent = (
    <div className={`p-3 rounded-lg border transition-all duration-300 ${
      isNavigable 
        ? `cursor-pointer transform hover:scale-105 ${
            isDark 
              ? "border-pink-500/40 bg-gray-800/40 hover:bg-pink-500/10 hover:shadow-glow-pink" 
              : "border-pink-500/30 bg-white/50 hover:bg-pink-500/5 hover:shadow-lg"
          }`
        : `cursor-default ${
            isDark 
              ? "border-gray-600 bg-gray-800/20" 
              : "border-gray-300 bg-white/30"
          }`
    }`}>
      <div className="flex items-center justify-center space-x-2">
        <div className={`p-1 rounded ${
          isDark ? "bg-black/20" : "bg-white/50"
        }`}>
          <project.icon className={`text-sm ${
            isDark ? "text-pink-400" : "text-pink-500"
          }`} />
        </div>
        <span className={`text-sm font-medium ${
          isDark ? "text-gray-200" : "text-gray-700"
        }`}>
          {myLanguage === "eng" ? project.labelEn : project.labelEs}
        </span>
      </div>
    </div>
  );

  return (
    <div className="relative">
      {/* Línea conectadora */}
      {projectIndex < totalProjects - 1 && (
        <div className={`absolute top-1/2 left-1/2 w-8 h-1 ${
          isDark ? "bg-purple-500/20" : "bg-purple-500/10"
        }`} style={{ transform: 'translate(50%, -50%)' }}></div>
      )}
      
      {/* Contenido del nodo */}
      {isNavigable ? (
        <Link href={project.link}>
          {nodeContent}
        </Link>
      ) : (
        nodeContent
      )}
    </div>
  );
};

export default ProjectNode;