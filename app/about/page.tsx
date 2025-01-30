import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About TeleInsight - Powerful Telegram Chat Analyzer",
  description:
    "Learn about TeleInsight, a powerful tool for analyzing Telegram chat data. Discover insights about your conversations and user engagement.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">About TeleInsight</h1>
      <p className="mb-4">
        TeleInsight is a powerful web application designed to analyze Telegram chat data. Our tool provides valuable
        insights into your conversations, helping you understand user engagement, message patterns, and more.
      </p>
      <p className="mb-4">
        With TeleInsight, you can upload your Telegram chat export file and get detailed analytics about:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Top senders and their message type breakdown</li>
        <li>Reply analysis</li>
        <li>Message type distribution</li>
        <li>Activity patterns over time</li>
        <li>And much more!</li>
      </ul>
      <p>
        TeleInsight is created by Esubalew Chekol, a passionate developer dedicated to creating useful tools for the
        community. For more information or to connect, visit my{" "}
        <a href="https://github.com/esubaalew" className="text-blue-600 hover:underline">
          GitHub
        </a>{" "}
        or{" "}
        <a href="https://linkedin.com/in/esubaalew" className="text-blue-600 hover:underline">
          LinkedIn
        </a>{" "}
        profiles.
      </p>
    </div>
  )
}

