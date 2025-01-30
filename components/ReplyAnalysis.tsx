import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Avatar } from "@/components/ui/avatar";

// Define interfaces for type safety
interface Message {
  text?: string;
  sticker?: any;
  photo?: any;
  file?: string;
  media_type?: string;
  mime_type?: string;
  animation?: any;
  video_message?: any;
  reply_to_message_id?: number;
  from?: string;
  [key: string]: any;
}

interface ReplyAnalysisProps {
  data: {
    messages: Message[];
  };
}

interface ReplierData {
  total: number;
  text: number;
  sticker: number;
  photo: number;
  video: number;
  voice: number;
  audio: number;
  document: number;
  gif: number;
  videoMessage: number;
}

export default function ReplyAnalysis({ data }: ReplyAnalysisProps) {
  
  const replyCounts = data.messages.reduce((acc, message) => {
    if (message.reply_to_message_id && message.from) {
      const replier = message.from;
     
      if (!acc[replier]) {
        acc[replier] = {
          total: 0,
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
      }
      // Increment total replies
      acc[replier].total++;
      // Classify message types
      if (message.text && message.text !== "") acc[replier].text++;
      if (message.photo) acc[replier].photo++;
      if (message.file) {
        const mediaType = message.media_type;
        const mimeType = (message.mime_type || "").toLowerCase();
        switch (mediaType) {
          case "sticker":
            acc[replier].sticker++;
            break;
          case "voice_message":
            acc[replier].voice++;
            break;
          case "audio_file":
            acc[replier].audio++;
            break;
          case "animation":
            acc[replier].gif++;
            break;
          case "video":
          case "video_file":
            acc[replier].video++;
            break;
          case "video_message":
            acc[replier].videoMessage++;
            break;
          default:
            if (mimeType.startsWith("audio/")) {
              acc[replier].audio++;
            } else if (mimeType.startsWith("video/")) {
              acc[replier].video++;
            } else if (mimeType.startsWith("image/")) {
              acc[replier].photo++;
            } else if (mimeType.startsWith("application/") || mimeType.startsWith("text/")) {
              acc[replier].document++;
            }
            break;
        }
      }
    }
    return acc;
  }, {} as Record<string, ReplierData>);

  // Step 2: Prepare chart data by sorting and slicing top 10 repliers
  const chartData = Object.entries(replyCounts)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 10) // Limit to top 10 for the chart
    .map(([name, counts]) => ({ name, ...counts }));

  // Step 3: Prepare full list of repliers (all users for the scrollable list)
  const allRepliers = Object.entries(replyCounts)
    .sort((a, b) => b[1].total - a[1].total) // Sort by total replies descending
    .map(([name, counts]) => ({ name, ...counts }));

  // Step 4: Generate random color for avatars
  const getRandomColor = () => {
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
        <CardTitle>Reply Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          This chart shows the users who reply the most in the chat. It helps identify the most responsive and engaged
          participants in the conversation.
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
              <Bar dataKey="total" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Full List of Repliers */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-4">All Repliers</h3>
          <div className="max-h-[400px] overflow-y-auto border rounded-lg p-2">
            <ul className="space-y-2">
              {allRepliers.map((replier, index) => (
                <li key={index} className="bg-secondary rounded-lg p-2 md:p-3">
                  <div className="flex items-center mb-2">
                    <Avatar
                      className="w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-4"
                      style={{ backgroundColor: getRandomColor() }}
                    >
                      {replier.name.charAt(0).toUpperCase()}
                    </Avatar>
                    <span className="font-medium truncate flex-grow">{replier.name}</span>
                    <span className="ml-2 whitespace-nowrap">{replier.total} replies</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {Object.entries(replier).map(([type, count]) => {
                      if (type !== "name" && type !== "total") {
                        return (
                          <div key={type} className="flex justify-between">
                            <span className="capitalize">{type}:</span>
                            <span>{count}</span>
                          </div>
                        );
                      }
                    })}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}