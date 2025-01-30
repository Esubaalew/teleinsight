import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Avatar } from "@/components/ui/avatar"

export default function EditedMessages({ data }) {
  const editedCounts = data.messages.reduce((acc, message) => {
    if (message.edited && message.from) {
      // Check both fields
      const editor = message.from
      acc[editor] = (acc[editor] || 0) + 1
    }
    return acc
  }, {})

  const chartData = Object.entries(editedCounts)
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edited Messages Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          This chart displays the users who edit their messages most frequently. It can help identify users who often
          refine or correct their messages after sending.
        </p>
        <div className="mb-6 h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} tick={{ fontSize: 12 }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#ffc658" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-4">Top Message Editors</h3>
          <ul className="space-y-2">
            {chartData.map((editor, index) => (
              <li key={index} className="flex items-center bg-secondary rounded-lg p-2 md:p-3">
                <Avatar className="w-8 h-8 md:w-10 md:h-10 mr-2 md:mr-4" style={{ backgroundColor: getRandomColor() }}>
                  {editor.name.charAt(0).toUpperCase()}
                </Avatar>
                <span className="font-medium truncate flex-grow">{editor.name}</span>
                <span className="ml-2 whitespace-nowrap">{editor.count} edited messages</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

