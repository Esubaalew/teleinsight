import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { Avatar } from "@/components/ui/avatar";

// Define interfaces for type safety
interface ChatMessage {
  forwarded_from?: string;
  from?: string;
}

interface ForwardedMessagesProps {
  data: {
    messages: ChatMessage[];
  };
}

interface ChartDataItem {
  name: string;
  count: number;
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"] as const;

export default function ForwardedMessages({ data }: ForwardedMessagesProps) {
 
  const forwardedMessages = data.messages.filter(
    (message) => message.forwarded_from && message.from
  );

  
  const forwarderCounts = forwardedMessages.reduce((acc: Record<string, number>, message) => {
    const forwarder = message.from!; // Non-null assertion since we filtered messages with `from`
    acc[forwarder] = (acc[forwarder] || 0) + 1;
    return acc;
  }, {});

  
  const chartData: ChartDataItem[] = Object.entries(forwarderCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5) // Limit to top 5 for the pie chart
    .map(([name, count]) => ({ name, count }));

  
  const allForwarders: ChartDataItem[] = Object.entries(forwarderCounts)
    .sort((a, b) => b[1] - a[1]) // Sort by count descending
    .map(([name, count]) => ({ name, count }));


  const getRandomColor = (): string => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Forwarded Messages Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          This chart shows the distribution of forwarded messages by user. It helps identify which users are sharing
          the most content from other sources.
        </p>
        <p className="mb-4">Total forwarded messages: {forwardedMessages.length}</p>
        {/* Pie Chart */}
        <div className="mb-6 h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                label={({ name, percent }: { name: string; percent: number }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
        {/* Full List of Forwarders */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-4">All Forwarders</h3>
          <div className="max-h-[400px] overflow-y-auto border rounded-lg p-2">
            <ul className="space-y-2">
              {allForwarders.map((forwarder, index) => (
                <li key={index} className="flex items-center bg-secondary rounded-lg p-2 md:p-3">
                  <Avatar
                    className="w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-4"
                    style={{ backgroundColor: getRandomColor() }}
                  >
                    {forwarder.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <span className="font-medium truncate flex-grow">{forwarder.name}</span>
                  <span className="ml-2 whitespace-nowrap">{forwarder.count} forwarded messages</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}