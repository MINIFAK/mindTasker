import React, { InputHTMLAttributes, useState } from "react";

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
    console.log(new Date());
    console.log(new Date().toDateString());

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
  // return (
  //   <div className="flex items-center border border-green-500 rounded-lg overflow-hidden w-40">
  //     <button
  //       className="bg-green-500 text-white w-10 h-10 flex items-center justify-center hover:bg-green-600 focus:outline-none"
  //       onClick={decrement}
  //     >
  //       −
  //     </button>
  //     <input
  //       value={value}
  //       onKeyDown={(e) => {
  //         console.log(e.key);
  //         if (e.key === "ArrowUp") return increment();
  //         if (e.key === "ArrowDown") return decrement();
  //       }}
  //       onChange={handleChange}
  //       className="w-full text-center border-0 outline-none focus:ring-0 text-lg appearance-none"
  //     />
  //     <button
  //       className="bg-green-500 text-white w-10 h-10 flex items-center justify-center hover:bg-green-600 focus:outline-none"
  //       onClick={increment}
  //     >
  //       +
  //     </button>
  //   </div>
  // );
};

export default InputNumber;
