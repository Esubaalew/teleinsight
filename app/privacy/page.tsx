import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - TeleInsight",
  description: "Read our privacy policy to understand how TeleInsight handles your data during Telegram chat analysis.",
}

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <p className="mb-4">
        At TeleInsight, we take your privacy seriously. This privacy policy explains how we handle your data when you
        use our Telegram chat analysis tool.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Data Processing</h2>
      <p className="mb-4">
        TeleInsight does not store or process any of the JSON data you upload for analysis. All processing is done
        client-side in your browser, and we do not have access to your chat data.
      </p>
      <h2 className="text-2xl font-semibold mb-2">No Database Collection</h2>
      <p className="mb-4">
        We do not collect or store any of your data in a database. The JSON file you upload is only used temporarily for
        analysis and is not saved or transmitted to our servers.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Open Source</h2>
      <p className="mb-4">
        Our code is open source and available for anyone to review. You can check our{" "}
        <a href="https://github.com/esubaalew/teleinsight" className="text-blue-600 hover:underline">
          GitHub repository
        </a>{" "}
        to see how we handle data processing.
      </p>
      <h2 className="text-2xl font-semibold mb-2">User Responsibility</h2>
      <p className="mb-4">
        By using TeleInsight, you acknowledge that you are responsible for the data you upload and analyze. We are not
        accountable for any sensitive information you may choose to process using our tool.
      </p>
      <h2 className="text-2xl font-semibold mb-2">Changes to This Policy</h2>
      <p className="mb-4">
        We may update this privacy policy from time to time. We will notify you of any changes by posting the new
        privacy policy on this page.
      </p>
      <p>If you have any questions about this privacy policy, please contact us at privacy@teleinsight.com.</p>
    </div>
  )
}

