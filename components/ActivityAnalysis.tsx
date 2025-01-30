import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function ActivityAnalysis({ data }) {
  const activityByMonth = data.messages.reduce((acc, message) => {
    const date = new Date(message.date)
    const monthYear = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`
    acc[monthYear] = (acc[monthYear] || 0) + 1
    return acc
  }, {})

  const chartData = Object.entries(activityByMonth)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date))

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
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-4">Monthly Activity</h3>
          <ul className="space-y-2">
            {chartData.map((item, index) => (
              <li key={index} className="flex items-center justify-between bg-secondary rounded-lg p-2 md:p-3">
                <span className="font-medium">{item.date}</span>
                <span>{item.count} messages</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

