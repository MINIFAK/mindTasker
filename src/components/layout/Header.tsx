import Image from "next/image"
import Clock from "../ui/Clock"

export const Header = () => { 
  return(
    <header className="p-7 flex justify-between">
      <Image 
       src="/MindTaskerLight.svg" 
       alt="Logo do MindTasker" 
       width={230}              
       height={44}             
       priority    
      /> 
      <div className="flex gap-12 items-center justify-center">
        <Clock/>
        <div className="w-12 h-12 bg-primary-950 rounded-full"></div>
      </div>
    </header>
  )
}