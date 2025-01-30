import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ChatInfo({ data }) {
  const messageTypes = {
    text: 0,
    sticker: 0,
    photo: 0,
    video: 0,
    voice: 0,
    video_message: 0,
    animation: 0,
    file: 0,
  }

  data.messages.forEach((message) => {
    if (message.text) messageTypes.text++
    if (message.media_type === "sticker") messageTypes.sticker++
    if (message.photo) messageTypes.photo++
    if (message.video) messageTypes.video++
    if (message.voice) messageTypes.voice++
    if (message.video_message) messageTypes.video_message++
    if (message.animation) messageTypes.animation++
    if (message.file && !message.media_type) messageTypes.file++
  })

  const chatInfo = {
    name: data.name || "Unknown",
    type: data.type || "Unknown",
    id: data.id || "Unknown",
    messagesCount: data.messages?.length || 0,
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Chat Information</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">
          This section provides an overview of the analyzed Telegram chat, including its name, type, unique identifier,
          the total number of messages, and a breakdown of message types.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-secondary p-4 rounded-lg">
            <p className="font-semibold mb-1">Name:</p>
            <p>{chatInfo.name}</p>
          </div>
          <div className="bg-secondary p-4 rounded-lg">
            <p className="font-semibold mb-1">Type:</p>
            <p>{chatInfo.type}</p>
          </div>
          <div className="bg-secondary p-4 rounded-lg">
            <p className="font-semibold mb-1">ID:</p>
            <p>{chatInfo.id}</p>
          </div>
          <div className="bg-secondary p-4 rounded-lg">
            <p className="font-semibold mb-1">Total Messages:</p>
            <p>{chatInfo.messagesCount}</p>
          </div>
        </div>
        <h3 className="text-lg font-semibold mt-6 mb-2">Message Type Breakdown:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {Object.entries(messageTypes).map(([type, count]) => (
            <div key={type} className="bg-secondary p-4 rounded-lg">
              <p className="font-semibold mb-1 capitalize">{type}:</p>
              <p>{count}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

