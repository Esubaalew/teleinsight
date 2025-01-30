import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Avatar } from "@/components/ui/avatar"

export default function TopSenders({ data }) {
  const senderCounts = data.messages.reduce((acc, message) => {
    const sender = message.from
    if (sender) {
      acc[sender] = (acc[sender] || 0) + 1
    }
    return acc
  }, {})

  const topSenders = Object.entries(senderCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([name, count]) => ({ name, count }))

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

  const messageTypes = ["text", "sticker", "photo", "video", "voice", "video_message", "animation", "file"]

  const getMessageTypeCounts = (sender) => {
    return data.messages.reduce((acc, message) => {
      if (message.from === sender) {
        if (message.text) acc.text = (acc.text || 0) + 1
        if (message.media_type === "sticker") acc.sticker = (acc.sticker || 0) + 1
        if (message.photo) acc.photo = (acc.photo || 0) + 1
        if (message.video) acc.video = (acc.video || 0) + 1
        if (message.voice) acc.voice = (acc.voice || 0) + 1
        if (message.video_message) acc.video_message = (acc.video_message || 0) + 1
        if (message.animation) acc.animation = (acc.animation || 0) + 1
        if (message.file && !message.media_type) acc.file = (acc.file || 0) + 1
      }
      return acc
    }, {})
  }

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
        <div className="mb-6 h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topSenders} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="var(--primary)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-4">Top Senders List</h3>
          <ul className="space-y-2 md:space-y-4">
            {topSenders.map((sender, index) => (
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
                  {messageTypes.map((type) => {
                    const count = getMessageTypeCounts(sender.name)[type] || 0
                    return (
                      <div key={type} className="flex justify-between">
                        <span className="capitalize">{type}:</span>
                        <span>{count}</span>
                      </div>
                    )
                  })}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

