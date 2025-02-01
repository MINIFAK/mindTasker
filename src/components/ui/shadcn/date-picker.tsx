"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange } from "react-day-picker"
import { ptBR } from 'date-fns/locale';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/shadcn/button"
import { Calendar, CalendarProps } from "@/components/ui/shadcn/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover"


type DatePickerProps = {
  className?: string
  date?: Date | DateRange | undefined
  dateFormat?: string
} & CalendarProps

export function DatePicker({
  className,
  date,
  dateFormat,
  ...props
}: DatePickerProps) {


  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal border-primary-200",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="text-primary-500" />
            {typeof date === "object" && date !== null && "from" in date && "to" in date && date.from && date.to && (
              <>
                {format(date.from, "dd")} - {format(date.to, "dd")}
              </>
            )}
            {date instanceof Date && format(date, dateFormat ?? "dd")}
            {!date && <span>Selecione a data</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            locale={ptBR}
            className="z-[50]"
            {...props}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
