import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Avatar } from "@/components/ui/avatar";

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

interface TopSendersProps {
  data: {
    messages: Message[];
  };
}

export default function TopSenders({ data }: TopSendersProps) {
  
  const senderCounts = data.messages.reduce((acc, message) => {
    const sender = message.from;
    if (sender) {
      acc[sender] = (acc[sender] || 0) + 1;
    }
    return acc;
  }, {});

  
  const topSenders = Object.entries(senderCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }));

  
  const allSenders = Object.entries(senderCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([name, count]) => ({ name, count }));

 
  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Step 5: Classify message types for each sender
  const getMessageTypeCounts = (sender: string) => {
    const counts = {
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
      if (message.from === sender) {
        if (message.text && message.text !== "") counts.text++;
        if (message.photo) counts.photo++;
        if (message.file) {
          const mediaType = message.media_type;
          const mimeType = (message.mime_type || "").toLowerCase();
          switch (mediaType) {
            case "sticker":
              counts.sticker++;
              break;
            case "voice_message":
              counts.voice++;
              break;
            case "audio_file":
              counts.audio++;
              break;
            case "animation":
              counts.gif++;
              break;
            case "video":
            case "video_file":
              counts.video++;
              break;
            case "video_message":
              counts.videoMessage++;
              break;
            default:
              if (mimeType.startsWith("audio/")) {
                counts.audio++;
              } else if (mimeType.startsWith("video/")) {
                counts.video++;
              } else if (mimeType.startsWith("image/")) {
                counts.photo++;
              } else if (mimeType.startsWith("application/") || mimeType.startsWith("text/")) {
                counts.document++;
              }
              break;
          }
        }
      }
    });
    return counts;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top 10 Senders</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          This chart shows the top 10 most active users in the chat, based on the number of messages they've sent. It
          helps identify the most engaged participants in the conversation.
        </p>
        {/* Bar Chart */}
        <div className="mb-6 h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topSenders} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
              <Tooltip formatter={(value) => `${value} messages`} />
              <Legend />
              <Bar dataKey="count" fill="#4CAF50" /> {/* Changed bar color to green */}
            </BarChart>
          </ResponsiveContainer>
        </div>
        {/* Top Senders List */}
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-4">All Senders List</h3>
          <div className="max-h-[400px] overflow-y-auto border rounded-lg p-2">
            <ul className="space-y-2 md:space-y-4">
              {allSenders.map((sender, index) => {
                const messageTypeCounts = getMessageTypeCounts(sender.name);
                return (
                  <li key={index} className="bg-secondary rounded-lg p-2 md:p-3 text-sm md:text-base">
                    <div className="flex items-center mb-2">
                      <Avatar
                        className="w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-4"
                        style={{ backgroundColor: getRandomColor() }}
                      >
                        {sender.name.charAt(0).toUpperCase()}
                      </Avatar>
                      <span className="font-medium truncate flex-grow">{sender.name}</span>
                      <span className="ml-2 whitespace-nowrap">{sender.count} messages</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      {Object.entries(messageTypeCounts).map(([type, count]) => (
                        <div key={type} className="flex justify-between">
                          <span className="capitalize">{type}:</span>
                          <span>{count}</span>
                        </div>
                      ))}
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}