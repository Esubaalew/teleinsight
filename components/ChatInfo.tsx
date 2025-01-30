import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Message {
  text?: string;
  sticker?: any;
  photo?: any;
  file?: string;
  media_type?: string;
  mime_type?: string;
  animation?: any;
  video_message?: any;
  voice?: any;
  video?: any;
  [key: string]: any;
}

interface ChatData {
  name?: string;
  type?: string;
  id?: string;
  messages: Message[];
}

interface ChatInfoProps {
  data: ChatData;
}

export default function ChatInfo({ data }: ChatInfoProps) {
  const messageTypes: Record<string, number> = {
    text: 0,
    sticker: 0,
    photo: 0,
    video: 0,
    voice: 0,
    audio: 0,
    document: 0,
    animation: 0,
    video_message: 0,
  };

  data.messages.forEach((message) => {
    if (message.text && message.text !== "") messageTypes.text++;
    if (message.photo) messageTypes.photo++;
    if (message.voice) messageTypes.voice++;
    if (message.video) messageTypes.video++;
    if (message.video_message) messageTypes.video_message++;
    if (message.animation) messageTypes.animation++;

    if (message.file) {
      const mediaType = message.media_type;
      const mimeType = (message.mime_type || "").toLowerCase();

      switch (mediaType) {
        case "sticker":
          messageTypes.sticker++;
          break;
        case "voice_message":
          messageTypes.voice++;
          break;
        case "audio_file":
          messageTypes.audio++;
          break;
        case "animation":
          messageTypes.animation++;
          break;
        case "video":
        case "video_file":
          messageTypes.video++;
          break;
        case "video_message":
          messageTypes.video_message++;
          break;
        default:
          if (mimeType.startsWith("audio/")) {
            messageTypes.audio++;
          } else if (mimeType.startsWith("video/")) {
            messageTypes.video++;
          } else if (mimeType.startsWith("image/")) {
            messageTypes.photo++;
          } else if (mimeType.startsWith("application/") || mimeType.startsWith("text/")) {
            messageTypes.document++;
          } else {
            messageTypes.file++;
          }
          break;
      }
    }
  });

  const chatInfo = {
    name: data.name || "Unknown",
    type: data.type || "Unknown",
    id: data.id || "Unknown",
    messagesCount: data.messages?.length || 0,
  };

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
        <p className="mb-4">
          <strong>What is a file?</strong> In this context, a file refers to any media or document shared in the chat, including images,
          videos, audio recordings, documents (PDFs, Word files), and other file types. The system identifies files
          based on their media type and MIME type to categorize them as text, audio, video, documents, or generic files.
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
  );
}