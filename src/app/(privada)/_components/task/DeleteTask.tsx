"use client"

import { Button } from "@/components/ui/Button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle} from "@/components/ui/shadcn/alert-dialog";

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
        <Button type="button" variant="text" onClick={()=> onOpenChange(false)}>Cancelar</Button>
        <Button type="button" onClick={()=> {onOpenChange(false); deleteTask()}}>Deletar</Button>
       </AlertDialogFooter>
     </AlertDialogContent>
   </AlertDialog>
  )
}