import { InputHTMLAttributes, forwardRef } from "react";

type InputProps = {
  label?: string; 
  error?: string;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", ...props }, ref) => {
    return (
      <div className={`flex flex-col ${className}`}>
        <input
          ref={ref}
          className={`border rounded-lg font-inter p-2 font-medium focus:outline-none  ${
            error ? "border-red-500" : "focus:ring-2 focus:ring-primary-500 border-neutral-400"
          }`}
          {...props}
        />
        {error && <span className="px-1.5 font-inter font-semibold text-sm text-red-500">{error}</span>}
      </div>
    );
  }
);

export default Input;
