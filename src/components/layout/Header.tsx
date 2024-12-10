import Image from "next/image";
import Clock from "../ui/Clock";

export const Header = () => {
  return (
    <header className="p-2 sm:p-6 flex justify-between">
      <div className="relative w-48 sm:w-60 h-11">
        <Image
          src="/MindTaskerLight.svg"
          alt="Logo do MindTasker"
          priority
          fill
        />
      </div>
      <div className="flex gap-4 sm:gap-12 items-center justify-center">
        <Clock />
        <div className="w-12 h-12 bg-primary-950 rounded-full"></div>
      </div>
    </header>
  );
};
