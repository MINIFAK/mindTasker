"use client"

import { Bar, BarChart, CartesianGrid, LabelList, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/shadcn/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/shadcn/chart"

import { useState } from "react"
import { Project } from "@/shader/entities/projects"
import { convertMinutesToHours } from "@/util/convertDate"
import { DatePicker } from "@/components/ui/shadcn/date-picker"
import { DateRange } from "react-day-picker"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/shadcn/select"

const chartConfig = {
  total: {
    label: "Minutos",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig

const monthOfYear = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]

export function Chart({ currentProject }: { currentProject: Project }) {
  const [moment, setMoment] = useState<"month" | "year">("month")

  const chartData = currentProject[moment].map((value, index) => ({
    day: `${index + 1}`,
    total: value
  }))

  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
    to: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
  });

  const [chart, setChart] = useState<"bar" | "line">("bar")

  const handleSelectDate = (date: DateRange | undefined) => {
    if (!date) return
    if (!date.to && date.from) {
      date.to = new Date(date.from.getTime());
      date.to.setDate(date.from.getDate() + 1);
    }
    setDate(date);
  };

  return (
    <>
      <Card className="w-[1024px] max-h-screen">
        <CardHeader>
          <CardTitle className="font-poppins flex justify-between">{currentProject.name}<span className="font-medium">{monthOfYear[new Date().getMonth()]}</span></CardTitle>
          <CardDescription>
            <div className="flex justify-between">
              <div className="flex gap-3 sm:gap-6">
                <DatePicker
                  date={date} selected={date}
                  onSelect={handleSelectDate}
                  mode="range"
                  showOutsideDays={false}

                />
                <Select value={moment} onValueChange={(value: "month" | "year") => setMoment(value)}>
                  <SelectTrigger className="w-20 sm:w-[180px]">
                    <SelectValue placeholder="Momento do Gráfico" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Mês</SelectItem>
                    <SelectItem value="year">Ano</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={chart} onValueChange={(value: "bar" | "line") => setChart(value)}>
                  <SelectTrigger className="w-20 sm:w-[180px]">
                    <SelectValue placeholder="Tipo do Gráfico" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bar">Barra</SelectItem>
                    <SelectItem value="line">Linha</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {currentProject && <p className="font-inter font-semibold text-neutral-600  w-20 sm:w-full text-end">{convertMinutesToHours(chartData.reduce((total, item) => total + item.total, 0))}</p>}
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          {chart === "bar" && (
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={moment === "month" ? chartData?.slice((date?.from?.getDate() ?? 1) - 1, (date?.to?.getDate() ?? 31)) : chartData}
                margin={{
                  top: 20,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  interval={"equidistantPreserveStart"}
                />
                <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                <Bar dataKey="total" fill="var(--color-total)" radius={8}>
                  <LabelList position="top" offset={12} className="fill-foreground" fontSize={12} />
                </Bar>
              </BarChart>
            </ChartContainer>
          )}
          {chart === "line" && (
            <ChartContainer config={chartConfig}>
              <LineChart
                accessibilityLayer
                data={moment === "month" ? chartData?.slice((date?.from?.getDate() ?? 1) - 1, (date?.to?.getDate() ?? 31)) : chartData}
                margin={{
                  top: 12,
                  left: 12,
                  right: 12,
                }}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  interval={"equidistantPreserveStart"}
                  tick={{ fontSize: 10 }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Line
                  dataKey="total"
                  type="natural"
                  stroke="var(--color-total)"
                  strokeWidth={2}
                  dot={{
                    fill: "var(--color-total)",
                  }}
                  activeDot={{
                    r: 6,
                  }}
                >
                  <LabelList
                    position="top"
                    offset={12}
                    className="fill-foreground"
                    fontSize={12}
                  />
                </Line>
              </LineChart>
            </ChartContainer>
          )}
        </CardContent>
      </Card >
    </>
  )
}
