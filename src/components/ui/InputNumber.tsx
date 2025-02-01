import React from "react";

type InputNumberProps = {
  value: number;
  setValue: React.Dispatch<React.SetStateAction<number>>;
  label?: string;
  max?: number;
  min?: number;
  className?: string;
  error?: string;
}

const InputNumber = ({ label, error, max, min, setValue, value, className }: InputNumberProps) => {
  const increment = () => setValue((prev) => Math.min(prev + 1, max ?? 100));
  const decrement = () => setValue((prev) => Math.max(prev - 1, min ?? 0));
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    if (!isNaN(newValue)) {
      setValue(Math.min(Math.max(newValue, 0), max ?? 100));
    }
  };
  return (
    <div className={`flex flex-col items-center ${className}`}>
      <p className="font-semibold font-inter text-lg">{label}</p>
      <input
        onKeyDown={(e) => {
          if (e.key === "ArrowUp") return increment();
          if (e.key === "ArrowDown") return decrement();
        }}
        value={value}
        onChange={handleChange}
        className={`border rounded-lg font-inter p-2 font-medium focus:outline-none w-12 h-10  ${error ? "border-red-500" : "focus:ring-2 focus:ring-primary-500 border-neutral-400 text-center"
          }`}
      />
      {error && <span className="px-1.5 font-inter font-semibold text-sm text-red-500">{error}</span>}
    </div>
  )
};

export default InputNumber;
