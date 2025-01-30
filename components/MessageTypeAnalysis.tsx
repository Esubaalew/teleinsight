import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"

export default function MessageTypeAnalysis({ data }) {
  const messageTypes = {
    text: 0,
    sticker: 0,
    file: 0,
    photo: 0,
    video: 0,
    voice: 0,
    videoMessage: 0,
    gif: 0,
  }

  data.messages.forEach((message) => {
    if (message.text) messageTypes.text++
    if (message.sticker) messageTypes.sticker++
    if (message.file) messageTypes.file++
    if (message.photo) messageTypes.photo++
    if (message.video) messageTypes.video++
    if (message.voice) messageTypes.voice++
    if (message.video_message) messageTypes.videoMessage++
    if (message.animation) messageTypes.gif++
  })

  const chartData = Object.entries(messageTypes)
    .map(([name, value]) => ({ name, value }))
    .filter((item) => item.value > 0)

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d", "#ffc658", "#8dd1e1"]

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
                outerRadius={150}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
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
  )
}

