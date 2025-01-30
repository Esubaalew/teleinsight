import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Avatar } from "@/components/ui/avatar";

// Define interfaces for type safety
interface ChatMessage {
  forwarded_from?: string;
}

interface ForwardSourcesProps {
  data: {
    messages: ChatMessage[];
  };
}

interface ChartDataItem {
  name: string;
  count: number;
}

export default function ForwardSources({ data }: ForwardSourcesProps) {
  
  const forwardSourceCounts = data.messages.reduce((acc: Record<string, number>, message) => {
    if (message.forwarded_from) {
      acc[message.forwarded_from] = (acc[message.forwarded_from] || 0) + 1;
    }
    return acc;
  }, {});

  
  const chartData: ChartDataItem[] = Object.entries(forwardSourceCounts)
    .sort((a, b) => b[1] - a[1]) 
    .slice(0, 10) 
    .map(([name, count]) => ({ name, count }));

  
  const allForwardSources: ChartDataItem[] = Object.entries(forwardSourceCounts)
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
        <CardTitle>Forward Sources Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          This chart displays the top sources of forwarded messages in the chat. It helps identify which accounts or
          channels are the most frequent origins of shared content, providing insights into the external information
          flow within the group.
        </p>
        {/* Bar Chart */}
        <div className="mb-6 h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Full List of Forward Sources */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-4">All Forward Sources</h3>
          <div className="max-h-[400px] overflow-y-auto border rounded-lg p-2">
            <ul className="space-y-2">
              {allForwardSources.map((source, index) => (
                <li key={index} className="flex items-center bg-secondary rounded-lg p-2 md:p-3">
                  <Avatar
                    className="w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-4"
                    style={{ backgroundColor: getRandomColor() }}
                  >
                    {source.name.charAt(0).toUpperCase()}
                  </Avatar>
                  <span className="font-medium truncate flex-grow">{source.name}</span>
                  <span className="ml-2 whitespace-nowrap">{source.count} forwards</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}