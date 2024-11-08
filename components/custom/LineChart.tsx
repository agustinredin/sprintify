"use client";
import {
  LineChart,
  AreaChart,
  Tooltip,
  ReferenceLine,
  Area,
  Line,
  YAxis,
  ResponsiveContainer,
} from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../ui/chart";
import { CartesianGrid, XAxis } from "recharts";

const data = [
  {
    name: " A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: " B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: " C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: " D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: " E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: " F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: " G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

export default function Linechart(props: any) {
  return (
    <div {...props}>
      <ChartContainer
      config={{}}>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 30, left: -10, bottom: 0 }}
        >
          <XAxis dataKey="name" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="pv" stroke="hsl(var(--accent))" strokeWidth={'5'} fill="transparent" />
        </AreaChart>
      </ChartContainer>
    </div>
  );
}
