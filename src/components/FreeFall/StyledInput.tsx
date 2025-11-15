interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
}

export const StyledInput: React.FC<StyledInputProps> = ({
  label,
  ...props
}) => {
  return (
    <div className="flex flex-col space-y-1">
      <label className="text-cyan-300 font-medium text-xs">{label}</label>
      <input
        {...props}
        className="p-2 text-sm rounded-lg bg-gray-700 text-white border border-cyan-500/30 focus:outline-none focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all duration-200"
      />
    </div>
  );
};