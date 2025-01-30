import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"

type MessageContent = string | { text: MessageContent } | MessageContent[]

interface ChatMessage {
  text: MessageContent
}

interface CommonWordsProps {
  data: {
    messages: ChatMessage[]
  }
}

const STOPWORDS = new Set([
  "a", "an", "the", "and", "or", "but", "if", "is", "are", "was", 
  "were", "be", "been", "being", "have", "has", "had", "do", "does", 
  "did", "will", "would", "should", "can", "could", "of", "at", "by", 
  "for", "with", "about", "to", "from", "in", "on", "that", "this", 
  "these", "those", "you", "me", "my", "your", "we", "our", "us", 
  "they", "their", "it", "its", "he", "she", "him", "her", "http", 
  "https", "com", "www", "rt", "like", "just", "so", "than", "then", 
  "when", "how", "what", "which", "who", "where", "why", "there", 
  "here", "chat", "telegram", "message", "messages", "media", "omitted", 
  "missed", "call", "video", "audio", "not", "no", "yes", "okay", "ok", 
  "hey", "hi", "hello", "oh", "uh", "um", "ah", "ha", "lol", "haha", 
  "please", "maybe", "actually", "really", "very", "too", "much", "many", 
  "some", "any", "up", "down", "out", "off", "over", "under", "again", 
  "further", "said", "say", "says", "more", "most", "such", "only", "into", 
  "through", "during", "before", "after", "above", "below", "between", 
  "both", "each", "few", "same", "see", "saw", "get", "got", "im", "dont", 
  "dont", "thats", "theyre", "youre", "arent", "isnt", "wont", "cant", "shouldnt"
]) as Set<string>

const extractText = (content: MessageContent): string => {
  if (typeof content === "string") return content
  if (Array.isArray(content)) {
    return content.map((item) => {
      if (typeof item === "object" && item !== null && "text" in item) {
        return extractText(item.text)
      }
      return extractText(item)
    }).join(" ")
  }
  if (typeof content === "object" && content !== null && "text" in content) {
    return extractText(content.text)
  }
  return ""
}

export default function CommonWords({ data }: CommonWordsProps) {
  const [showFilterCriteria, setShowFilterCriteria] = useState(false)

  const wordCounts = data.messages.reduce((acc: Record<string, number>, message) => {
    const rawText = extractText(message.text)
    const cleanedText = rawText
      .toLowerCase()
      .replace(/[^\w\s]|_/g, "")
      .replace(/\s+/g, " ")

    const words = cleanedText.split(/\s+/).filter((word) => 
      word.length > 3 && !STOPWORDS.has(word) && !/\d/.test(word)
    )

    words.forEach((word) => {
      acc[word] = (acc[word] || 0) + 1
    })

    return acc
  }, {})

  // Sort descending and take top 20
  const chartData = Object.entries(wordCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .map(([word, count]) => ({ word, count }))
    .reverse()

  return (
    <Card>
      <CardHeader>
        <CardTitle>Most Common Meaningful Words</CardTitle>
        <CardDescription>
          This chart shows the 20 most significant words, excluding common stopwords, short words, and numeric content.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button variant="outline" className="mb-4" onClick={() => setShowFilterCriteria(!showFilterCriteria)}>
          {showFilterCriteria ? (
            <>
              <EyeOff className="h-4 w-4 mr-2" /> Hide filtering criteria
            </>
          ) : (
            <>
              <Eye className="h-4 w-4 mr-2" /> Show filtering criteria
            </>
          )}
        </Button>

        {showFilterCriteria && (
          <div className="p-4 bg-muted rounded-md mb-4">
            <h4 className="font-semibold mb-2">Word Filtering Criteria:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>Words shorter than 4 characters are removed</li>
              <li>Common stopwords are excluded (e.g., "the", "and", "or", etc.)</li>
              <li>Words containing numbers are removed</li>
              <li>All words are converted to lowercase for counting</li>
            </ul>
            <h4 className="font-semibold mt-4 mb-2">Sample of excluded stopwords:</h4>
            <p className="text-sm text-muted-foreground">{Array.from(STOPWORDS).slice(0, 20).join(", ")}...</p>
          </div>
        )}

        <div className="mb-6 h-[300px] md:h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} layout="vertical" margin={{ left: 120, right: 20 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                type="number"
                label={{
                  value: "Word Count",
                  position: "bottom",
                  offset: 0,
                }}
              />
              <YAxis dataKey="word" type="category" tick={{ fontSize: 12 }} width={200} />
              <Tooltip formatter={(value: number) => [value, "Occurrences"]} labelStyle={{ fontWeight: "bold" }} />
              <Bar dataKey="count" fill="#8884d8" name="Word Frequency" maxBarSize={40} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 className="text-lg md:text-xl font-semibold mb-4">Top 20 Words</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {chartData.map((item) => (
              <li
                key={item.word}
                className="flex items-center justify-between bg-muted/50 p-2 rounded hover:bg-muted transition-colors"
              >
                <span className="font-medium truncate">{item.word}</span>
                <span className="text-muted-foreground ml-2">{item.count}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}