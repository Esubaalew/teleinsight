"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Upload, Loader, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
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
import Manygils from "@/components/manygils"
import PrintPreview from "@/components/PrintPreview"

export default function AnalyzePage() {
  // State for JSON data, loading state, and error messages
  const [jsonData, setJsonData] = useState<JsonData | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false)

  // Define the interfaces for your data
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

  // Handle file upload and parse JSON
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0]
    if (file) {
      setIsLoading(true)
      setError(null) // Reset any previous errors
      const reader = new FileReader()
      reader.onload = (e: ProgressEvent<FileReader>): void => {
        try {
          const fileContents = e.target?.result as string
          const parsedJson = JSON.parse(fileContents)

          // Validate that the JSON has a 'messages' field that is an array
          if (!parsedJson.messages || !Array.isArray(parsedJson.messages)) {
            throw new Error(
              "Your JSON data is invalid. Please ensure you export chats (private chat with any user, including bots, group chat, and channel chat) correctly."
            )
          }
          setJsonData(parsedJson)
        } catch (error: any) {
          console.error("Error parsing JSON:", error)
          // Provide a friendly message for non-technical users.
          setError(
            "We couldn't read your file. Please ensure you're uploading the correct JSON file that contains your exported Telegram chat data. Make sure you export chats (private chat with any user, including bots, group chat, and channel chat) correctly."
          )
          setJsonData(null)
        } finally {
          setIsLoading(false)
        }
      }
      reader.readAsText(file)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Manygils />
      <div className="flex items-center justify-center mb-8">
        <h1 className="text-3xl font-bold text-center">Analyze Your Telegram Chat</h1>
        {jsonData && (
          <Button variant="ghost" size="icon" onClick={() => setIsPrintPreviewOpen(true)} className="ml-4">
            <Printer className="h-6 w-6" />
          </Button>
        )}
      </div>
      <div className="mb-8 flex flex-col items-center">
        <label htmlFor="file-upload" className="cursor-pointer w-full max-w-md">
          <div className="border-2 border-dashed border-primary rounded-lg p-8 text-center hover:bg-secondary transition duration-300">
            <Upload size={48} className="mx-auto text-primary mb-4" />
            <p className="text-lg font-semibold text-primary">Upload your Telegram chat JSON file</p>
            <p className="text-sm text-muted-foreground mt-2">
              Click to browse or drag and drop your file here
            </p>
          </div>
          <Input id="file-upload" type="file" onChange={handleFileUpload} accept=".json" className="hidden" />
        </label>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex justify-center items-center">
          <Loader className="animate-spin text-primary mr-2" />
          <p className="text-primary">Processing your chat data...</p>
        </div>
      )}

      {/* Display error message if JSON parsing fails or validation fails */}
      {error && (
        <div className="text-center text-red-500 mb-4">
          <p>Error: {error}</p>
        </div>
      )}

      {/* Render analysis components if JSON data is valid and there's no error */}
      {jsonData && !isLoading && !error && (
        <>
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
          <PrintPreview data={jsonData} open={isPrintPreviewOpen} onOpenChange={setIsPrintPreviewOpen} />
        </>
      )}
    </div>
  )
}
