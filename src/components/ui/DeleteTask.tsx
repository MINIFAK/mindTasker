"use client"

import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/shadcn/alert-dialog";

interface DeleteTaskProps{
  open: boolean;
  onOpenChange: (open: boolean) => void
  deleteTask: () => void;
  title: string;
  description?: string;
  placeholder?: string
}
export function DeleteTask({title,description,placeholder, open, onOpenChange,deleteTask}: DeleteTaskProps){
  return(
     <AlertDialog open={open} onOpenChange={onOpenChange}>
     <AlertDialogContent>
       <AlertDialogHeader>
         <AlertDialogTitle>{title}</AlertDialogTitle>
         <AlertDialogDescription>{description}</AlertDialogDescription>
       </AlertDialogHeader>
       <AlertDialogFooter>
         <AlertDialogCancel>Cancelar</AlertDialogCancel>
         <AlertDialogAction onClick={()=> deleteTask()}>Deletar</AlertDialogAction>
       </AlertDialogFooter>
     </AlertDialogContent>
   </AlertDialog>
  )
}