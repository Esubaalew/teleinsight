"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Upload, Loader } from "lucide-react"
import ChatInfo from "@/components/ChatInfo"
import TopSenders from "@/components/TopSenders"
import ActivityAnalysis from "@/components/ActivityAnalysis"
import ForwardedMessages from "@/components/ForwardedMessages"
import ForwardSources from "@/components/ForwardSources"
import ReplyAnalysis from "@/components/ReplyAnalysis"
import EditedMessages from "@/components/EditedMessages"
import CommonWords from "@/components/CommonWords"
import MessageTypeAnalysis from "@/components/MessageTypeAnalysis"
import ReactionAnalysis from "@/components/ReactionAnalysis"

export default function AnalyzePage() {
  const [jsonData, setJsonData] = useState<JsonData | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  interface Message {
    id: string
    text: string
    date: string
    from_id?: string
    to_id?: string
    reply_to_message_id?: number
    forwarded_from?: string
    edited?: boolean
    reactions?: Reaction[]
    // Add other properties as needed
  }

  interface JsonData {
    name?: string
    type?: string
    id?: string
    messages: Message[]
  }

  interface Reaction {
    emoji: string
    type: string
    count: number
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0]
    if (file) {
      setIsLoading(true)
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>): void => {
        try {
          const json: JsonData = JSON.parse(e.target?.result as string)
          setJsonData(json)
        } catch (error) {
          console.error("Error parsing JSON:", error)
        } finally {
          setIsLoading(false)
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Analyze Your Telegram Chat</h1>
      <div className="mb-8 flex flex-col items-center">
        <label htmlFor="file-upload" className="cursor-pointer w-full max-w-md">
          <div className="border-2 border-dashed border-primary rounded-lg p-8 text-center hover:bg-secondary transition duration-300">
            <Upload size={48} className="mx-auto text-primary mb-4" />
            <p className="text-lg font-semibold text-primary">Upload your Telegram chat JSON file</p>
            <p className="text-sm text-muted-foreground mt-2">Click to browse or drag and drop your file here</p>
          </div>
          <Input id="file-upload" type="file" onChange={handleFileUpload} accept=".json" className="hidden" />
        </label>
      </div>
      {isLoading && (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin text-primary mr-2" />
          <p className="text-primary">Processing your chat data...</p>
        </div>
      )}
      {jsonData && !isLoading && (
        <div className="space-y-8">
          <ChatInfo data={jsonData} />
          <MessageTypeAnalysis data={jsonData} />
          <ReactionAnalysis data={jsonData} />
          <TopSenders data={jsonData} />
          <ActivityAnalysis data={jsonData} />
          <ForwardedMessages data={jsonData} />
          <ForwardSources data={jsonData} />
          <ReplyAnalysis data={jsonData} />
          <EditedMessages data={jsonData} />
          <CommonWords data={jsonData} />
        </div>
      )}
    </div>
  )
}

