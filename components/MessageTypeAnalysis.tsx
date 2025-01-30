import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface Message {
  text?: string;
  sticker?: any;
  photo?: any;
  file?: string;
  media_type?: string;
  mime_type?: string;
  animation?: any;
  video_message?: any;
  [key: string]: any;
}

interface MessageTypeAnalysisProps {
  data: {
    messages: Message[];
  };
}

export default function MessageTypeAnalysis({ data }: MessageTypeAnalysisProps) {
  const messageTypes = {
    text: 0,
    sticker: 0,
    photo: 0,
    video: 0,
    voice: 0,
    audio: 0,
    document: 0,
    gif: 0,
    videoMessage: 0,
  };

  data.messages.forEach((message) => {
    if (message.text && message.text !== "") messageTypes.text++;
    if (message.photo) messageTypes.photo++;

    if (message.file) {
      const mediaType = message.media_type;
      const mimeType = (message.mime_type || "").toLowerCase();

      switch (mediaType) {
        case "sticker":
          messageTypes.sticker++;
          break;
        case "voice_message":
          messageTypes.voice++;
          break;
        case "audio_file":
          messageTypes.audio++;
          break;
        case "animation":
          messageTypes.gif++;
          break;
        case "video":
        case "video_file":
          messageTypes.video++;
          break;
        case "video_message":
          messageTypes.videoMessage++;
          break;
        default:
          if (mimeType.startsWith("audio/")) {
            messageTypes.audio++;
          } else if (mimeType.startsWith("video/")) {
            messageTypes.video++;
          } else if (mimeType.startsWith("image/")) {
            messageTypes.photo++;
          } else if (mimeType.startsWith("application/") || mimeType.startsWith("text/")) {
            messageTypes.document++;
          }
          break;
      }
    }
  });

  const chartData = Object.entries(messageTypes)
    .map(([name, value]) => ({ name, value }))
    .filter((item) => item.value > 0);

  const COLORS = [
    "#0088FE", "#00C49F", "#FFBB28", "#FF8042",
    "#8884D8", "#82ca9d", "#ffc658", "#8dd1e1",
    "#a05195", "#d45087"
  ];

  // Custom label component to handle overlapping
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        fontSize={12}
      >
        {percent > 0.05 ? `${(percent * 100).toFixed(0)}%` : ''}
      </text>
    );
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Message Type Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          This chart shows the distribution of different message types in the chat. It helps visualize the variety of
          content shared among participants.
        </p>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                innerRadius={60}
                outerRadius={120}
                paddingAngle={2}
                dataKey="value"
                label={renderCustomizedLabel}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ background: 'hsl(var(--background))', border: 'none' }}
                itemStyle={{ color: 'hsl(var--foreground))' }}
                formatter={(value: number, name: string) => [
                  value,
                  `${name}: ${(value / data.messages.length * 100).toFixed(1)}%`
                ]}
              />
              <Legend 
                layout="vertical"
                verticalAlign="middle"
                align="right"
                wrapperStyle={{
                  paddingLeft: '20px',
                  overflowY: 'auto',
                  maxHeight: '300px'
                }}
                formatter={(value) => (
                  <span className="text-sm capitalize">{value}</span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Message Type Counts:</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(messageTypes).map(([type, count]) => (
              <li key={type} className="bg-secondary p-2 rounded-lg flex justify-between items-center">
                <span className="font-medium capitalize">{type}:</span>
                <span>{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}