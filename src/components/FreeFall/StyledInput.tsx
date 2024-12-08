interface StyledInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: React.ReactNode;
}

export const StyledInput: React.FC<StyledInputProps> = ({
  label,
  ...props
}) => {
  return (
    <div className="flex flex-row items-center mt-1 w-full">
      <label className="text-teal-200 font-semibold mr-2">{label}:</label>
      <input
        {...props}
        className="p-1 rounded-lg bg-gray-700 text-white border border-teal-200 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent w-[50px]"
      />
    </div>
  );
};
