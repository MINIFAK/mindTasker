"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"
import { DateRange, SelectRangeEventHandler } from "react-day-picker"
import { ptBR } from 'date-fns/locale';

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/shadcn/button"
import { Calendar } from "@/components/ui/shadcn/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/shadcn/popover"


interface DatePickerProps {
  className?: string
  date: DateRange | undefined
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
}

export function DatePicker({
  className,
  setDate,
  date
}: DatePickerProps) {

  const handleSelectDate = (date: DateRange | undefined) => {
    if (!date) return
    if (!date.to && date.from) {
      date.to = new Date(date.from.getTime());
      date.to.setDate(date.from.getDate() + 1);
    }
    setDate(date);
  };

  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal border-primary-300",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="text-primary-500" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "dd")} -{" "}
                  {format(date.to, "dd")}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Selecione a data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            locale={ptBR}
            initialFocus
            mode="range"
            selected={date}
            onSelect={handleSelectDate}
            showOutsideDays={false}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
