const SkillCategory: React.FC<{ 
  title: string; 
  skills: string[]; 
  color: "cyan" | "purple" | "pink" | "green" | "blue" | "yellow"; 
  isDark: boolean; 
}> = ({ title, skills, color, isDark }) => {
  const colorClasses = {
    cyan: isDark ? "border-cyan-500/30 bg-cyan-500/10" : "border-cyan-500/20 bg-cyan-500/5",
    purple: isDark ? "border-purple-500/30 bg-purple-500/10" : "border-purple-500/20 bg-purple-500/5",
    pink: isDark ? "border-pink-500/30 bg-pink-500/10" : "border-pink-500/20 bg-pink-500/5", 
    green: isDark ? "border-green-500/30 bg-green-500/10" : "border-green-500/20 bg-green-500/5",
    blue: isDark ? "border-blue-500/30 bg-blue-500/10" : "border-blue-500/20 bg-blue-500/5",
    yellow: isDark ? "border-yellow-500/30 bg-yellow-500/10" : "border-yellow-500/20 bg-yellow-500/5"
  };

  const textColors = {
    cyan: isDark ? "text-cyan-400" : "text-cyan-600",
    purple: isDark ? "text-purple-400" : "text-purple-600", 
    pink: isDark ? "text-pink-400" : "text-pink-600",
    green: isDark ? "text-green-400" : "text-green-600",
    blue: isDark ? "text-blue-400" : "text-blue-600",
    yellow: isDark ? "text-yellow-400" : "text-yellow-600"
  };

  return (
    <div className={`p-6 rounded-2xl border backdrop-blur-sm ${colorClasses[color]}`}>
      <h3 className={`text-lg font-bold mb-4 ${textColors[color]}`}>
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill, index) => (
          <span
            key={index}
            className={`px-3 py-2 rounded-lg text-sm font-medium backdrop-blur-sm border ${
              isDark 
                ? "bg-black/20 border-white/10 text-gray-200" 
                : "bg-white/50 border-gray-200 text-gray-700"
            } transform transition-all duration-300 hover:scale-105`}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
};

export default SkillCategory