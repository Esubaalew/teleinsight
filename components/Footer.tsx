import Link from "next/link";
import { Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-secondary text-foreground">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between items-center">
          {/* Left Section */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">TeleInsight</h2>
            <p className="text-muted-foreground">
              Unlock the power of your Telegram chats with our advanced analysis tools.
            </p>
          </div>

          {/* Middle Section */}
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/analyze" className="text-muted-foreground hover:text-foreground">
                  Analyze
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  About
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-foreground">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/3">
            <h3 className="text-lg font-semibold mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a
                href="https://github.com/esubaalew"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github size={24} />
              </a>
              <a
                href="https://twitter.com/esubaalew"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-border text-center text-muted-foreground">
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
  );
}