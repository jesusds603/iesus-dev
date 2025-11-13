const ContactItem: React.FC<{ icon: string; text: string; isDark: boolean }> = ({ 
  icon, 
  text, 
  isDark 
}) => (
  <div className="flex items-center space-x-3">
    <span className="text-xl">{icon}</span>
    <span className={isDark ? "text-gray-300" : "text-gray-700"}>
      {text}
    </span>
  </div>
);

export default ContactItem