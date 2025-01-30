import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Avatar } from "@/components/ui/avatar"

export default function ReplyAnalysis({ data }) {
  const replyCounts = data.messages.reduce((acc, message) => {
    if (message.reply_to_message_id && message.from) {
      const replier = message.from
      if (!acc[replier]) {
        acc[replier] = {
          total: 0,
          text: 0,
          sticker: 0,
          photo: 0,
          video: 0,
          voice: 0,
          video_message: 0,
          animation: 0,
          file: 0,
        }
      }
      acc[replier].total++
      if (message.text) acc[replier].text++
      if (message.media_type === "sticker") acc[replier].sticker++
      if (message.photo) acc[replier].photo++
      if (message.video) acc[replier].video++
      if (message.voice) acc[replier].voice++
      if (message.video_message) acc[replier].video_message++
      if (message.animation) acc[replier].animation++
      if (message.file && !message.media_type) acc[replier].file++
    }
    return acc
  }, {})

  const chartData = Object.entries(replyCounts)
    .sort((a, b) => b[1].total - a[1].total)
    .slice(0, 10)
    .map(([name, counts]) => ({ name, ...counts }))

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF"
    let color = "#"
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)]
    }
    return color
  }

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
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-4">Top Repliers</h3>
          <ul className="space-y-2">
            {chartData.map((replier, index) => (
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
                      )
                    }
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

