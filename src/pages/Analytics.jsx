import * as React from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "../components/ui/chart";

export const description = "An interactive bar chart";

const chartData = [
  { date: "2024-04-01", votes: 12 },
  { date: "2024-04-02", votes: 42 },
  { date: "2024-04-03", votes: 432 },
  { date: "2024-04-04", votes: 32 },
  { date: "2024-04-05", votes: 432 },
  { date: "2024-04-06", votes: 102 },
  { date: "2024-04-07", votes: 1000 },
  { date: "2024-04-08", votes: 43 },
  { date: "2024-04-09", votes: 2 },
  { date: "2024-04-01", votes: 12 },
  { date: "2024-04-02", votes: 42 },
  { date: "2024-04-03", votes: 432 },
  { date: "2024-04-04", votes: 32 },
  { date: "2024-04-05", votes: 432 },
  { date: "2024-04-06", votes: 102 },
  { date: "2024-04-07", votes: 1000 },
  { date: "2024-04-08", votes: 43 },
  { date: "2024-04-09", votes: 2 },
  { date: "2024-04-01", votes: 12 },
  { date: "2024-04-02", votes: 42 },
  { date: "2024-04-03", votes: 432 },
  { date: "2024-04-04", votes: 32 },
  { date: "2024-04-05", votes: 432 },
  { date: "2024-04-06", votes: 102 },
  { date: "2024-04-07", votes: 1000 },
  { date: "2024-04-08", votes: 43 },
  { date: "2024-04-09", votes: 2 },
];

const chartConfig = {
  votes: {
    label: "Votes",
    color: "blue",
  },
};

export function Analytics() {
  const totalVotes = React.useMemo(
    () => ({
      votes: chartData.reduce((acc, curr) => acc + curr.votes, 0),
    }),
    [],
  );

  //TODO: fetch the votes data for this distributor

  const [activeChart, setActiveChart] = React.useState("votes");

  return (
    <Card>
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Analytics</CardTitle>
          <CardDescription>
            Showing total voters for the latest posts
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <BarChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="views"
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                />
              }
            />
            <Bar dataKey={activeChart} fill="cyan" />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
