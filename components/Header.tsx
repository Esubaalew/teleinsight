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
       
          <ThemeToggle />
          <Button asChild>
            <Link href="/analyze">Start Analysis</Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

