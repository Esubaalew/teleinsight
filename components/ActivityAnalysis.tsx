import React, { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

interface Message {
  date: string;
  [key: string]: string | number | boolean;
}

interface ActivityData {
  date: string;
  count: number;
}

interface ActivityAnalysisProps {
  data: {
    messages: Message[];
  };
}

export default function ActivityAnalysis({ data }: ActivityAnalysisProps) {
  const activityByMonth = useMemo(() => {
    return data.messages.reduce((acc, message) => {
      const date = new Date(message.date);
      const monthYear = format(date, "yyyy-MM");
      acc[monthYear] = (acc[monthYear] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }, [data.messages]);

  const chartData = useMemo(() => {
    return Object.entries(activityByMonth)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [activityByMonth]);

  const [listSortOption, setListSortOption] = useState("date-asc");

  const sortOptions = [
    { label: "Date (Ascending)", value: "date-asc" },
    { label: "Date (Descending)", value: "date-desc" },
    { label: "Messages (Ascending)", value: "count-asc" },
    { label: "Messages (Descending)", value: "count-desc" },
  ];

  const sortData = (data: ActivityData[], option: string): ActivityData[] => {
    switch (option) {
      case "date-asc":
        return [...data].sort((a, b) => a.date.localeCompare(b.date));
      case "date-desc":
        return [...data].sort((a, b) => b.date.localeCompare(a.date));
      case "count-asc":
        return [...data].sort((a, b) => a.count - b.count);
      case "count-desc":
        return [...data].sort((a, b) => b.count - a.count);
      default:
        return data;
    }
  };

  const sortedActivityData = sortData(chartData, listSortOption);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          This chart displays the chat activity over time, showing the number of messages sent each month. It helps
          identify trends and periods of high or low activity in the conversation.
        </p>
        <div className="mb-6 h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip
                content={({ payload }) => {
                  if (!payload || payload.length === 0) return null;
                  const data = payload[0].payload;
                  return (
                    <div className="bg-white p-2 rounded shadow">
                      <p>{data.date}</p>
                      <p>{data.count} messages</p>
                    </div>
                  );
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg md:text-xl font-semibold">Monthly Activity</h3>
          <DropdownMenu>
            <DropdownMenuTrigger className="btn" aria-label="Sort options">
              {sortOptions.find(option => option.value === listSortOption)?.label}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {sortOptions.map(option => (
                <DropdownMenuItem key={option.value} onClick={() => setListSortOption(option.value)}>
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="max-h-[300px] sm:max-h-[400px] overflow-y-auto border rounded-lg p-2">
          <ul className="space-y-2">
            {sortedActivityData.map((item) => (
              <li key={item.date} className="flex items-center justify-between bg-secondary rounded-lg p-2 md:p-3">
                <span className="font-medium">{item.date}</span>
                <span>{item.count} messages</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}