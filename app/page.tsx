import Link from "next/link"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "TeleInsight - Powerful Telegram Chat Analyzer",
  description:
    "Analyze your Telegram chats with TeleInsight. Get insights on user engagement, message patterns, and more. Start your free analysis today!",
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6">Welcome to TeleInsight</h1>
        <p className="text-xl mb-8">
          Unlock powerful insights from your Telegram chats. Visualize trends, identify top contributors, and explore
          message patterns with our advanced analysis tools.
        </p>
        <Button asChild size="lg">
          <Link href="/analyze">Start Analyzing</Link>
        </Button>
      </div>
      <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <FeatureCard
          title="Message Analysis"
          description="Analyze message patterns and trends in your chats. Understand the flow of conversation and peak activity times."
        />
        <FeatureCard
          title="User Insights"
          description="Identify top contributors and user engagement. Get detailed breakdowns of message types for each user."
        />
        <FeatureCard
          title="Visual Analytics"
          description="View data through interactive charts and graphs. Easily comprehend complex chat data with our intuitive visualizations."
        />
      </div>
    </div>
  )
}

function FeatureCard({ title, description }) {
  return (
    <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  )
}

