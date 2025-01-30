import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import Logo from "@/components/Logo"
import { Github, Linkedin } from "lucide-react"

export default function Header() {
  return (
    <header className="bg-background border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <Logo />
          <span className="text-2xl font-bold text-primary">TeleInsight</span>
        </Link>
        <nav className="flex items-center space-x-4">
          <Link href="/" className="text-foreground hover:text-primary">
            Home
          </Link>
          <Link href="/analyze" className="text-foreground hover:text-primary">
            Analyze
          </Link>
          <Link href="/about" className="text-foreground hover:text-primary">
            About
          </Link>
          <Link href="/privacy" className="text-foreground hover:text-primary">
            Privacy
          </Link>
          <a
            href="https://github.com/esubaalew"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary"
          >
            <Github size={20} />
          </a>
          <a
            href="https://linkedin.com/in/esubaalew"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground hover:text-primary"
          >
            <Linkedin size={20} />
          </a>
          <ThemeToggle />
          <Button asChild>
            <Link href="/analyze">Start Analysis</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

