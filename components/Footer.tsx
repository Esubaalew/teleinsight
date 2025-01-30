import Link from "next/link"
import { Github, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">TeleInsight</h2>
            <p className="text-gray-400">Unlock the power of your Telegram chats with our advanced analysis tools.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="https://telegram.esube.com.et/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="https://telegram.esube.com.et/analyze" className="text-gray-400 hover:text-white">
                  Analyze
                </Link>
              </li>
              <li>
                <Link href="https://telegram.esube.com.et/#" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="https://telegram.esube.com.et/#" className="text-gray-400 hover:text-white">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/esubaalew"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Github size={24} />
              </a>
              <a
                href="https://twitter.com/esubaalew"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-white"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>Made with ❤️ by Esubalew Chekol</p>
          <p className="mt-2">
            Inspired by the Telegram bot{" "}
            <a href="https://t.me/liyurobot" target="_blank" rel="noopener noreferrer" className="underline">
              @liyurobot
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}

