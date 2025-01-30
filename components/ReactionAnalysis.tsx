import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

export default function ReactionAnalysis({ data }) {
  const reactionCounts = {}

  data.messages.forEach((message) => {
    if (message.reactions) {
      message.reactions.forEach((reaction) => {
        const emoji = reaction.emoji
        reactionCounts[emoji] = (reactionCounts[emoji] || 0) + reaction.count
      })
    }
  })

  const chartData = Object.entries(reactionCounts)
    .map(([emoji, count]) => ({ emoji, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Reaction Analysis</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          This chart displays the most popular reactions in the chat. It helps understand the emotional responses and
          engagement of participants.
        </p>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="emoji" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Top Reactions:</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
            {chartData.map(({ emoji, count }) => (
              <li key={emoji} className="bg-secondary p-2 rounded-lg flex justify-between items-center">
                <span className="text-2xl">{emoji}</span>
                <span>{count}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

